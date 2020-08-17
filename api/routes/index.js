const express = require('express');
const path = require('path');

const login = path.resolve('login');
const signup = path.resolve('signup');
const paths = path.resolve('paths');

const router = express.Router();

router.post(paths.signup, signup);
router.post(paths.login, login);


module.exports = router;
