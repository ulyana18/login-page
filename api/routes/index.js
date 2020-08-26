const express = require('express');
const path = require('path');

const login = require(path.resolve('routes/login.js'));
const signup = require(path.resolve('routes/signup.js'));
const paths = require(path.resolve('routes/paths'));
const tokenChecker = require(path.resolve('middleware/tokenChecker.js'));

const router = express.Router();

router.post(paths.signup, signup);
router.post(paths.login, login);


router.use(tokenChecker);

router.post(paths.tokenCheck, (req, res) => {
    console.log('access token is in use now');
});


module.exports = router;
