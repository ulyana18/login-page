const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});

// const Pool = require('pg').Pool;
// const path = require('path')
// const config = require('../config');
// const { user, host, database, password, port } = config;

// const pool = new Pool({
//   user,
//   host,
//   database,
//   password,
//   port,
// });

// pool.connect();
// module.exports = pool;

client.connect();

module.exports = client;
