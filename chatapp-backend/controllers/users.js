const User = require('./../models/userModels')
const httpStatus = require('http-status-codes')

module.exports = {
    async GetAllUsers(req, res){
        await User.find({})
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .then(results => {
                res.status(httpStatus.OK).json({
                    message:'All Users',
                    results
                })
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message:'Error Occured',
                    
                })
            })
    },
    async GetUser(req, res){
        await User.findOne({_id: req.params.id})
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .then(results => {
                res.status(httpStatus.OK).json({
                    message:'user by id',
                    results
                })
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message:'Error Occured',
                    
                })
            })
    },
    async GetByUsername(req, res){
        await User.findOne({username: req.params.username})
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .then(results => {
                res.status(httpStatus.OK).json({
                    message:'user by Username',
                    results
                })
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message:'Error Occured',
                    
                })
            })
    },
}