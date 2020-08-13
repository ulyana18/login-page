var AuthService = require('../services/authservice');

module.exports = (app) => {

  app.post('/user/signup', async (req, res) => {
    const name = req.body.user.name;
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.SignUp(name, email, password); 

      return res.send({ user, token }).status(200).end();
    } catch(e) {
      return res.send('error').status(401).end();
    }
  })

  app.post('/user/login', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.LogIn(email, password); 

      return res.send({ user, token }).status(200).end();
    } catch(e) {
      return res.send('error').status(402).end();
    }
  })

};
