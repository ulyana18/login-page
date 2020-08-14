const express = require('express');
const login = require('./login');
const signup = require('./signup');

const router = express.Router();

const path = {
    signup: '/user/signup',
    login: '/user/login'
};

router.post(path.signup, signup);
router.post(path.login, login);


module.exports = router;