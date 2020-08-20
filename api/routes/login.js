const path = require('path');

const AuthService = require(path.resolve('services/authservice.js'));
const { SUCCESSFULL, ERROR } = require(path.resolve('additional-data/app-status.js'));
const { LOGIN_ERROR } = require(path.resolve('additional-data/user-messages.js'));

// const AuthService = require('../services/authservice');   // for tests
// const { SUCCESSFULL, ERROR } = require(('../additional-data/app-status'));


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token, refreshToken } = await authServiceInstance.logIn(email, password); 

      return res.send({
        user,
        token,
        refreshToken
      }).status(SUCCESSFULL);

      // return res.status(SUCCESSFULL).json({  // for tests
      //   user,
      //   token,
      //   refreshToken
      // });
      
    } catch(e) {
      return res.send(LOGIN_ERROR).status(ERROR);
      // return res.status(ERROR).json({error: e});  // for tests
    }
}

module.exports = login;
