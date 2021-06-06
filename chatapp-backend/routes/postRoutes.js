const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts');

const authHelper = require('../helpers/authHelpers');

//// here we r added authentication
router.post('/post/add-post', authHelper.verifyToken ,postController.AddPost);


module.exports = router;