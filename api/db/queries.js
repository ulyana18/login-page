require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'ulyana',
  host: 'localhost',
  database: 'ulyana',
  password: '1234',
  port: 5432,
});

module.exports = pool;