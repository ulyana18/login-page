const env = require('dotenv').config();


const config = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.NAME_DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  accessToken: process.env.ACCESS_TOKEN,
};

module.exports = config;