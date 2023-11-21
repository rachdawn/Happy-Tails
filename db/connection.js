// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};


const db = new Pool(dbParams);
// console.log("db params djhad", dbParams);

try {
  db.connect();
} catch (e) {
  console.log(e);
}


module.exports = db;
