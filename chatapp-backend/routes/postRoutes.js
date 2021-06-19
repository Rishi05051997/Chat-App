const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts');

const authHelper = require('../helpers/authHelpers');


router.get('/posts', authHelper.verifyToken , postController.getPosts);
//// here we r added authentication
router.post('/post/add-post', authHelper.verifyToken , postController.AddPost);
router.post('/post/add-like', authHelper.verifyToken , postController.LikePost)


module.exports = router;