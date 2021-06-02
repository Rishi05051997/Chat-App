const Joi = require('joi');
const httpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/userModels')
const Helpers = require('../helpers/helpers');
const dbConfig = require('../config/secret');

module.exports = {
    async CreateUser(req, res){
        // console.log(req.body);
        //// creating validation object here using Joi lab
        const Schema = Joi.object().keys({
            username: Joi.string()
                .min(5)
                .max(10)
                .required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        });

        const { error, value } = Schema.validate(req.body);
        console.log(value);
        if(error && error.details){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: error.details
            })
        }
        /// here checking email is already exist into db or not
        const userEmail = await user.findOne({email: Helpers.lowercase(req.body.email)});
        if(userEmail) {
            return res
                .status(httpStatus.CONFLICT)
                .json({message: 'Email already Exist'});
        }
        /// here checking username is already exist into db or not
        const username = await user.findOne({username: Helpers.firstLetterUppercase(req.body.username)});
        if(username) {
            return res
                .status(httpStatus.CONFLICT)
                .json({message: 'Username already Exist'});
        }
        //// here converting user password into bcrypted format by using bcryptJs lab
        return bcrypt.hash(value.password, 5, (err, hash)=> {
            if(err){
                return res
                .status(httpStatus.BAD_REQUEST)
                .json({message: 'Error in hashing password'});
            }
            const body = {
                username: Helpers.firstLetterUppercase(value.username),
                email: Helpers.lowercase(value.email),
                password: hash
            }
            //// if all things are ok i.e.., username & email are not already exist in db then now we ready to create the new user
            user.create(body).then((user)=> {
                //// here creating json web token by jsonwebtoken lab 
                const token = jwt.sign({data: user}, dbConfig.secret, {
                    expiresIn: 1200
                });
                //// here saving token to cookie
                res.cookie('auth', token);
                res.status(httpStatus.CREATED).json({
                    message: 'User Created Succesfully',
                    user,
                    token
                })
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Error Occured'
                });
            })
        })
    }
};