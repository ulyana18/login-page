const path = require('path');

const AuthService = require('services/authService');
const { SUCCESSFULL, ERROR } = require('messages/consts');
const { TOKEN_ERROR } = require('messages/userMessages');


async function token(req, res) {
    let { refreshToken, name, email } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { accessToken } = await authServiceInstance.checkToken(refreshToken, name, email); 


      return res.status(SUCCESSFULL).send({
        accessToken,
      });
      
    } catch(e) {
      return res.status(ERROR).send({error: TOKEN_ERROR});
    }
}

module.exports = token;
