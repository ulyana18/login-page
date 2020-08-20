const express = require('express');
const path = require('path');

const login = require(path.resolve('routes/login.js'));
const signup = require(path.resolve('routes/signup.js'));
const paths = require(path.resolve('routes/paths.js'));
const tokenChecker = require(path.resolve('middleware/tokenChecker.js'));

// const login = require('./login');    // for tests
// const signup = require('./signup');
// const paths = require('./paths');
// const tokenChecker = require('../middleware/tokenChecker');

const router = express.Router();

router.post(paths.signup, signup);
router.post(paths.login, login);
router.use(tokenChecker);


module.exports = router;
