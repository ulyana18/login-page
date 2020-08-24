const express = require('express');
const path = require('path');

const login = require('routes/login');
const signup = require('routes/signup');
const paths = require('routes/paths');
const token = require('routes/paths');
const tokenChecker = require('middleware/tokenChecker');

const router = express.Router();

router.post(paths.signup, signup);
router.post(paths.login, login);
router.post(paths.token, token);

router.use(tokenChecker);

router.post(paths.tokenCheck, (req, res) => {
    console.log('access token is in use now');
});


module.exports = router;
