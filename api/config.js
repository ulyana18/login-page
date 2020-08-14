const env = require("dotenv").config();

const getValue = (key) => {
    if (key in env.parsed) {
      return env.parsed[key];
    }
    return new Error();
};

const config = {
  user: getValue('USER_DB'),
  host: getValue('HOST_DB'),
  database: getValue('NAME_DB'),
  password: getValue('PASSWORD_DB'),
  port: getValue('PORT_DB'),
  accessToken: getValue("ACCESS_TOKEN"),
};

module.exports = config;