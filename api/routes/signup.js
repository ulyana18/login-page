const path = require('path')
// const AuthService = path.resolve('services/authservice');
const AuthService = require('../services/authservice');
const { SUCCESSFULL, ERROR } = require('../additional-data/app-status');
const { SIGNUP_ERROR } = require('../additional-data/user-messages');


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token, refreshToken } = await authServiceInstance.signUp(name, email, password);

        // return res.send({ user, token, refreshToken }).status(SUCCESSFULL).end();
        return res.status(200).json({
            user,
            token,
            refreshToken
        });

    } catch(e) {
        return res.status(400).json({error: e});
    }
}

module.exports = signup;
