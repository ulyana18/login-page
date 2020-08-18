const path = require('path');

const AuthService = require('../services/authservice');
const { SUCCESSFULL, ERROR } = require('../additional-data/app-status');
const { SIGNUP_ERROR } = require('../additional-data/user-messages');


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token, refreshToken } = await authServiceInstance.signUp(name, email, password);
        return res.send({ user, token, refreshToken }).status(SUCCESSFULL).end();
    } catch(e) {
        return res.send(SIGNUP_ERROR).status(ERROR).end();
    }
}

module.exports = signup;
