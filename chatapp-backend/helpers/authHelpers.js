const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const dbConfig = require('../config/secret');

module.exports = 
{
    //// here verifytoken method is useful for authenticating a valid user
    verifyToken : (req, res, next) => {
        if(!req.headers.authorization){
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: 'No Authorization'
            });
        }
        //// here we are getting token which are saved in authController.js file on line No :- 63
        const token = req.cookies.auth || req.headers.authorization.split(' ')[1];
        // console.log(token);

        //// if token is noot there then showing error
        if (!token){
            return res.status(httpStatus.FORBIDDEN).json({
                message: 'No token provided'
            });
        }
        ///// here verifying token
        return jwt.verify(token, dbConfig.secret, (err, decoded)=> {
            if(err) {
                if(err.expiredAt < new Date()){
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                        messsage: 'Token has expired. Please login again', 
                        token: null
                    });
                }
                next();
            }
            /// if all things are ok then returning valid data which are save in authController.js file on line No :- 95
            req.user = decoded.data;
            next();
        })
    }
}