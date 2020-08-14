const Pool = require('pg').Pool;
const config = require('../config');
const { user, host, database, password, port } = config;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

module.exports = pool;
