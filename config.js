const env = require("dotenv").config();

// const getValue = (key) => {
//     if (key in env.parsed) {
//       return env.parsed[key];
//     }
//     return new Error();
// };

// const config = {
//   user: getValue('USER_DB'),
//   host: getValue('HOST_DB'),
//   database: getValue('NAME_DB'),
//   password: getValue('PASSWORD_DB'),
//   port: getValue('PORT_DB'),
//   accessToken: getValue('ACCESS_TOKEN'),
// };

const config = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.NAME_DB,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  accessToken: process.env.ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN,
  databaseUrl: process.env.DATABASE_URL,
};


module.exports = config;