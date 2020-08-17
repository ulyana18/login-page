const Pool = require('pg').Pool;
const config = require('../config');
const { user, host, database, password, port } = config;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
},{
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false
});

// const pool = new Pool({
//   user = process.env.USER_DB,
//   host = process.env.HOST_DB,
//   database = process.env.NAME_DB,
//   password = process.env.PASSWORD_DB,
//   port = process.env.PORT_DB,
// });

module.exports = pool;
