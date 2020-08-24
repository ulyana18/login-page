const path = require('path');

const AuthService = require('services/authService');
const { SUCCESSFULL, ERROR } = require('messages/consts');
const { SIGNUP_ERROR } = require('messages/userMessages');


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token, refreshToken } = await authServiceInstance.signUp(name, email, password);

        return res.status(SUCCESSFULL).send({
            user,
            email,
            token,
            refreshToken
        });

    } catch(e) {
        return res.status(ERROR).json({error: SIGNUP_ERROR});
    }
}

module.exports = signup;
