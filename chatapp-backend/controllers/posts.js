//// Here Joi lab is used for validation
const Joi = require('joi');
const httpStatus = require('http-status-codes');
const Post = require('../models/postModels');
const User = require('../models/userModels');
const { post } = require('../routes/postRoutes');
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
    },
    async getPosts(req, res){
        try {
            const posts = await Post.find({})
            .populate('User')
            .sort({created: -1});

            return res.status(httpStatus.OK).json({
                message: 'All posts',
                posts
            })

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occured'
            })
        }
    },

    async LikePost(req, res){
        const postId = req.body._id;
        await Post.updateOne(
            {
                _id: postId,
                //// $ne is not equal operator available in MongoDB so that we can avoid the user can like post only once 
                "likes.username":
                {
                    $ne: req.body.username
                }
            },
            {
                $set:
                {
                    likes: 
                    {
                        username: req.user.username
                    }
                },
                $inc:
                {
                    totalLikes: 1
                },
            }
        )
        .then(()=> {
            res.status(httpStatus.OK).json({
                message:'You likes the post'
            });
        })
        .catch(err=> {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message:'Error Occured'
            });
        })

    }
}