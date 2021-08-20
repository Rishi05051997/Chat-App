const User = require('./../models/userModels')
const httpStatus = require('http-status-codes')

module.exports = {
    FollowUser(req, res){
        const followUser = async () => {
            await User.updateOne({
                _id: req.user._id,
                "following.userFollowed": { $ne: req.body.userFollowed}
            }, {
                $push : {
                    following: {
                        userFollowed : req.body.userFollowed
                    } 
                }
            }
            );
            await User.updateOne({
                _id: req.user.userFollowed,
                "following.follower": { $ne: req.body._id}
            }, {
                $push : {
                    followers: {
                        follower : req.body._id
                    } 
                }
            }
            );
        }


        followUser()
        .then(() => {
            res.status(httpStatus.OK).json({
                message: 'Following User Now'
            })
        })
        .catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occured'
            })
        })
    }
}