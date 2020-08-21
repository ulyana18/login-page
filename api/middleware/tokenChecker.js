const path = require('path');
const jwt = require('jsonwebtoken');

const config = require(path.resolve('config.js'));
const TOKEN_ERROR = require(path.resolve('messages/user-messages.js'));
const ERROR = require(path.resolve('messages/consts.js'));


module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  
  if (token) {

    jwt.verify(token, config.accessToken, function(err, decoded) {
        if (err) {
          return res.status(ERROR).json({"error": true, "message": 'Unauthorized access.' });
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
