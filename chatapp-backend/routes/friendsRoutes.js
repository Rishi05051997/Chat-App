// const express = require('express');


// const router = express.Router();

// const friendCtrl = require('../controllers/friends');
// const authHelpers = require('../helpers/authHelpers');

// router.post('/follow-user', authHelpers.verifyToken, friendCtrl.FollowUser)
// router.post('/unfollow-user', authHelpers.verifyToken, friendCtrl.unFollowUser)

// module.exports = router;

const express = require('express');

const router = express.Router();

const FriendCtrl = require('../controllers/friends');
const authHelpers = require('../helpers/authHelpers');

router.post('/follow-user', authHelpers.verifyToken, FriendCtrl.FollowUser);
router.post('/unfollow-user', authHelpers.verifyToken, FriendCtrl.UnFollowUser);
router.post('/mark/:id', authHelpers.verifyToken, FriendCtrl.MarkNotification);
router.post(
  '/mark-all',
  authHelpers.verifyToken,
  FriendCtrl.MarkAllNotifications
);

module.exports = router;