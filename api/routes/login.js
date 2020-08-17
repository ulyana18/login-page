const path = require('path')
const AuthService = path.resolve('/services/authservice');
const status = path.resolve('/additional-data/user-messages');


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.LogIn(email, password); 

      return res.send({ user, token }).status(status.successfull).end();
    } catch(e) {
      return res.send(status.loginError).status(status.error).end();
    }
}

module.exports = login;
