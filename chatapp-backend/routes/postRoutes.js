const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts');

const authHelper = require('../helpers/authHelpers');


router.get('/posts', authHelper.verifyToken , postController.getPosts);
router.get('/post/:id', authHelper.verifyToken , postController.getSinglePost);
//// here we r added authentication
router.post('/post/add-post', authHelper.verifyToken , postController.AddPost);
router.post('/post/add-like', authHelper.verifyToken , postController.LikePost);
router.post('/post/add-comment', authHelper.verifyToken , postController.AddComment);


module.exports = router;