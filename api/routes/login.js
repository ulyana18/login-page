const path = require('path');

const AuthService = require('services/authService');
const { SUCCESSFULL, ERROR } = require('messages/consts');
const { LOGIN_ERROR } = require('messages/userMessages');


async function login(req, res) {
  const { email, password } = req.body.user;
  try {
    const { user, token, refreshToken } = await AuthService.logIn(email, password); 


    return res.status(SUCCESSFULL).send({
      user,
      email,
      token,
      refreshToken
    });
    
  } catch(e) {
    return res.send({error: LOGIN_ERROR}).status(ERROR);
  }
}

module.exports = login;
