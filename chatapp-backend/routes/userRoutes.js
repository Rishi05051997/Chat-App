const express = require('express');


const router = express.Router();

const UserCtrl = require('../controllers/users');
const authHelpers = require('../helpers/authHelpers');

router.get('/users', authHelpers.verifyToken, UserCtrl.GetAllUsers)
router.get('/user/:id', authHelpers.verifyToken, UserCtrl.GetUser)
router.get('/username/:username', authHelpers.verifyToken, UserCtrl.GetByUsername)



module.exports = router