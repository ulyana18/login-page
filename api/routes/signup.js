const path = require('path');

const AuthService = require(path.resolve('services/authservice.js'));
const { SUCCESSFULL, ERROR } = require(path.resolve('messages/consts.js'));
const { SIGNUP_ERROR } = require(path.resolve('messages/user-messages.js'));


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token, refreshToken } = await authServiceInstance.signUp(name, email, password);

        return res.status(SUCCESSFULL).send({
            user,
            token,
            refreshToken
        });

    } catch(e) {
        return res.status(ERROR).json({error: SIGNUP_ERROR});
    }
}

module.exports = signup;
