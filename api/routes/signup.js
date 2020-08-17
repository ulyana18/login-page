const path = require('path')
const AuthService = path.resolve('services/authservice');
const { SUCCESSFULL, ERROR } = path.resolve('additional-data/app-status');
const { SIGNUP_ERROR } = path.resolve('additional-data/user-messages');


async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.signUp(name, email, password); 

        return res.send({ user, token }).status(SUCCESSFULL);
    } catch(e) {
        return res.send(ERROR).status(SIGNUP_ERROR);
    }
}

module.exports = signup;
