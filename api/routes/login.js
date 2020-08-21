const path = require('path');

const AuthService = require(path.resolve('services/authservice.js'));
const { SUCCESSFULL, ERROR } = require(path.resolve('messages/consts.js'));
const { LOGIN_ERROR } = require(path.resolve('messages/userMessages.js'));


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token, refreshToken } = await authServiceInstance.logIn(email, password); 


      return res.status(SUCCESSFULL).send({
        user,
        token,
        refreshToken
      });
      
    } catch(e) {
      return res.status(ERROR).send({error: LOGIN_ERROR});
    }
}

module.exports = login;
