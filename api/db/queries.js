const Pool = require('pg').Pool;
const path = require('path')
const config = path.resolve('config');
const { user, host, database, password, port } = config;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

module.exports = pool;
