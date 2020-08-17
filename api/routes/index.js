const express = require('express');
const path = require('path');

const login = require(__dirname + '/login');
const signup = require(__dirname + '/signup');
const paths = require(__dirname + '/paths');

const router = express.Router();

router.post(paths.signup, signup);
router.post(paths.login, login);


module.exports = router;
