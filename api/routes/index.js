const express = require('express');
const path = require('path');

const login = require('./login');
const signup = require('./signup');
const paths = require('./paths');
const tokenChecker = require('../middleware/tokenChecker');

const router = express.Router();

// router.post(paths.signup, signup);
router.post(paths.signup, signup);
router.post(paths.login, login);
router.use(tokenChecker);


module.exports = router;
