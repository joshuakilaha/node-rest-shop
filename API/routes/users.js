const express = require('express');
const router = express.Router();

const checkAuth = require('../Auth/check-auth');

const UserController = require('../contollers/user');

router.post('/signup',UserController.SignUp_User );

router.post('/login',UserController.Login_user );

router.delete('/:userId',checkAuth,UserController.Delete_user );

module.exports = router;