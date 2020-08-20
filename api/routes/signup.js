const path = require('path')
const AuthService = require(path.resolve('services/authservice.js'));
const { SUCCESSFULL, ERROR } = require(path.resolve('additional-data/app-status.js'));
const { SIGNUP_ERROR } = require(path.resolve('additional-data/user-messages.js'));

// const AuthService = require('../services/authservice');     // for tests
// const { SUCCESSFULL, ERROR } = require('../additional-data/app-status');
// const { SIGNUP_ERROR } = require('../additional-data/user-messages');


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token, refreshToken } = await authServiceInstance.signUp(name, email, password);

        return res.send({ user, token, refreshToken }).status(SUCCESSFULL);
        // return res.status(SUCCESSFULL).json({  // for tests
        //     user,
        //     token,
        //     refreshToken
        // });

    } catch(e) {
        return res.send(SIGNUP_ERROR).status(ERROR);

        // return res.status(ERROR).json({error: e});  // for tests
    }
}

module.exports = signup;
