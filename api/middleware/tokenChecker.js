const path = require('path');
const jwt = require('jsonwebtoken');

const config = require(path.resolve('config.js'));
const { TOKEN_ERROR } = require(path.resolve('messages/userMessages.js'));
const AuthService = require(path.resolve('services/authService.js'));
const { SUCCESSFULL, ERROR } = require(path.resolve('messages/consts.js'));


function tokenChecker(req,res,next) {
  const token = req.body.user.accessToken || req.query.token || req.headers['x-access-token'];
  const { name, email, refreshToken } = req.body.user;
  
  if (token) {

    jwt.verify(token, config.accessToken, async function(err, decoded) {
      if (err) {
        try {
          const accessToken = await AuthService.checkToken(refreshToken, name, email);
            
          return res.status(SUCCESSFULL).json({ "accessToken": accessToken });

        } catch(err) {
          return res.status(ERROR).json({"error": true, "message": 'Unauthorized access.' });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(ERROR).json({
      "error": true,
      "message": TOKEN_ERROR,
    });
  }
}


module.exports = tokenChecker;
