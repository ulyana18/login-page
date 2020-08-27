const path = require('path');

const AuthService = require(path.resolve('services/authService'));
const { SUCCESSFULL, ERROR } = require(path.resolve('messages/consts'));
const { SIGNUP_ERROR } = require(path.resolve('messages/userMessages'));


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const { user, token, refreshToken } = await AuthService.signUp(name, email, password);

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
