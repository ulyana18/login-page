const path = require('path')
const AuthService = require('../services/authservice');;
const { SUCCESSFULL, ERROR } = require('../additional-data/app-status');
const { LOGIN_ERROR } = require('../additional-data/user-messages');


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token, refreshToken } = await authServiceInstance.logIn(email, password); 

      return res.status(200).json({
        user,
        token,
        refreshToken
      });
      
    } catch(e) {
      return res.status(400).json({error: e});
    }
}

module.exports = login;
