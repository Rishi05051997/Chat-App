const express = require('express');


const router = express.Router();

const friendCtrl = require('../controllers/friends');
const authHelpers = require('../helpers/authHelpers');

router.post('/follow-user', authHelpers.verifyToken, friendCtrl.FollowUser)

module.exports = router