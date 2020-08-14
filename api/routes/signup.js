const AuthService = require('../services/authservice');
const successfull = 200;
const error = 401;

async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.SignUp(name, email, password); 

        return res.send({ user, token }).status(successfull).end();
    } catch(e) {
        return res.send('error').status(error).end();
    }
}

module.exports = signup;