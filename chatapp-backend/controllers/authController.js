//// Here Joi lab is used for validation
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
        // console.log(value);
        if(error && error.details){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: error.details
            })
        }
        /// here checking email is already exist in db or not
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
                    expiresIn: "1h"
                });
                //// here saving token to cookie for authenticating or validating user
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
    },

    async loginUser(req, res) {
        //// here placing check that usernmae & password are mandotory
        if(!(req.body.username || req.body.password)){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: 'No Empty fileds allowed'})
        }
        ///// here finding usernmae inside databse
        await user.findOne({username: Helpers.firstLetterUppercase(req.body.username)}).then(user => {
            //// here if usernmae is not inside db then returning
            if(!user){
                return res.status(httpStatus.NOT_FOUND).json({message: 'username is not found'});
            }
            //// here comparing password wheather  password for that perticular user which is inside database and password which are entered by user are equal or not by using bcrypt.compare(userEnteredPassword, PasswordInDatabase) method
            return bcrypt.compare(req.body.password, user.password).then((results)=> {
                //// if both passwords are incorrect then returning error
                if(!results){
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: 'Passoword is incorrect'})
                }
                //// here creating token for authenticaton
                const token =  jwt.sign({data: user}, dbConfig.secret, {
                    expiresIn: "1h"
                });
                /// here saving token in cookie
                res.cookie('auth', token);
                //// if all things are ok then sending data i.e.., login success
                return res.status(httpStatus.OK).json({
                    message: 'Login Successful',
                    user,
                    token
                })
            })
        }).catch( err => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Error Occured + ${err}`})
        })
    }
};