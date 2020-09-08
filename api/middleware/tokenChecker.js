const path = require('path');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { TOKEN_ERROR } = require('../messages/userMessages');
const AuthService = require('../services/authService');
const { SUCCESSFULL, ERROR } = require('../messages/consts');


function tokenChecker(req,res,next) {
  const token = req.body.user.accessToken || req.query.token || req.headers['x-access-token'];
  const { name, email, refreshToken } = req.body.user;
  
  if (token) {
    jwt.verify(token, config.accessToken, async function(err, decoded) {
      if (err) {
        try {
          const accessToken = await AuthService.checkToken(refreshToken, name, email);
            
          return res.status(SUCCESSFULL).send({ "accessToken": accessToken });

        } catch(err) {
          return res.status(ERROR).send({"error": true, "message": 'Unauthorized access.' });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(ERROR).send({
      "error": true,
      "message": TOKEN_ERROR,
    });
  }
}


module.exports = tokenChecker;
