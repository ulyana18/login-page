const path = require('path')
const AuthService = path.resolve('services/authservice');
const status = path.resolve('additional-data/user-messages');
const { SUCCESSFULL, ERROR } = path.resolve('additional-data/app-status');
const { LOGINERROR } = path.resolve('additional-data/user-messages');


async function login(req, res) {
    const { email, password } = req.body.user;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.logIn(email, password); 

      return res.send({ user, token }).status(SUCCESSFULL);
    } catch(e) {
      return res.send(LOGINERROR).status(ERROR);
    }
}

module.exports = login;
