const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/posts');
const AuthHelper = require('../helpers/authHelpers');

router.get('/posts', AuthHelper.verifyToken, PostCtrl.GetAllPosts);
router.get('/post/:id', AuthHelper.verifyToken, PostCtrl.GetPost);

router.post('/post/add-post', AuthHelper.verifyToken, PostCtrl.AddPost);
router.post('/post/add-like', AuthHelper.verifyToken, PostCtrl.AddLike);
router.post('/post/add-comment', AuthHelper.verifyToken, PostCtrl.AddComment);

module.exports = router;
