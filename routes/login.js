const path = require('path');

const AuthService = require('../services/authservice');
const { SUCCESSFULL, ERROR } = require('../additional-data/app-status');
const { LOGIN_ERROR } = require('../additional-data/user-messages');


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.logIn(email, password); 

      return res.send({ user, token }).status(SUCCESSFULL).end();
    } catch(e) {
      return res.send(LOGIN_ERROR).status(ERROR).end();
    }
}

module.exports = login;
