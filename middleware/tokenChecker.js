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
            
          return res.json({ "accessToken": accessToken }).status(SUCCESSFULL);

        } catch(err) {
          return res.json({"error": true, "message": 'Unauthorized access.' }).status(ERROR);
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.send({
      "error": true,
      "message": TOKEN_ERROR,
    }).status(ERROR);
  }
}

module.exports = tokenChecker;