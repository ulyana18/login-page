const express = require('express');
const path = require('path');

const login = require('./login');
const signup = require('./signup');
const paths = require('./paths');

const router = express.Router();

router.post(paths.signup, signup);
router.post(paths.login, login);


module.exports = router;
