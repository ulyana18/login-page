const path = require('path');
const jwt = require('jsonwebtoken');

const config = require('config');
const TOKEN_ERROR = require('messages/userMessages');
const ERROR = require('messages/consts');


module.exports = (req,res,next) => {
  const token = req.body.user.accessToken || req.query.token || req.headers['x-access-token'];
  
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
