let pg = require('pg');

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || config.dataBase,
  });

module.exports = pool;  