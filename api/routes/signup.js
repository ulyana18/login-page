const path = require('path')
const AuthService = path.resolve('/services/authservice');
const status = path.resolve('/additional-data/user-messages');

async function signup(req, res) {
    const { name, email, password } = req.body.user;

    try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.SignUp(name, email, password); 

        return res.send({ user, token }).status(status.successfull).end();
    } catch(e) {
        return res.send(status.error).status(status.signupError).end();
    }
}

module.exports = signup;
