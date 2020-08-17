const { Pool } = require('pg');
const config = require('../config');
// const { user, host, database, password, port } = config;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: true,
  // user,
  // host,
  // database,
  // password,
  // port,
});

// const pool = new Pool({
//   user = process.env.USER_DB,
//   host = process.env.HOST_DB,
//   database = process.env.NAME_DB,
//   password = process.env.PASSWORD_DB,
//   port = process.env.PORT_DB,
// });

module.exports = pool;
