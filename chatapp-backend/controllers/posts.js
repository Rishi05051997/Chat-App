//// Here Joi lab is used for validation
const Joi = require('joi');
const httpStatus = require('http-status-codes');
const Post = require('../models/postModels');
const User = require('../models/userModels');
module.exports = 
{
    AddPost(req, res){
        const Schema = Joi.object().keys({
            post: Joi.string().required(),
            
        });
        const {error} = Schema.validate(req.body);
        if(error && error.details){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: error.details
            })
        }

        const body = {
            user: req.user._id,
            username : req.user.username,
            post: req.body.post,
            created: new Date()
        }

        Post.create(body).then( async (post) => {
            await User.updateOne(
                {
                    _id: req.user._id
                },
                {
                    $set : {
                        posts: {
                            postId: post._id,
                            post: req.body.post,
                            created: new Date()
                        }
                    }
                }
                )
            res.status(httpStatus.OK).json({
                message: 'Post Created',
                post
            });
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occured'
            });
        })
    }
}