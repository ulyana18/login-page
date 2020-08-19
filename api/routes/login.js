const path = require('path')
const AuthService = path.resolve('services/authservice');
const { SUCCESSFULL, ERROR } = path.resolve('additional-data/app-status');
const { LOGIN_ERROR } = path.resolve('additional-data/user-messages');


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token, refreshToken } = await authServiceInstance.logIn(email, password); 

      return res.send({ user, token, rToken: refreshToken }).status(SUCCESSFULL).end();
    } catch(e) {
      return res.send(LOGIN_ERROR).status(ERROR);
    }
}

module.exports = login;
