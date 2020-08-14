const AuthService = require('../services/authservice');
const successfull = 200;
const error = 401;

async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.LogIn(email, password); 

      return res.send({ user, token }).status(successfull).end();
    } catch(e) {
      return res.send('error').status(error).end();
    }
}

module.exports = login;
