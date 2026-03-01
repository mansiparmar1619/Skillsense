const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "career_ai",
  password: "root",
  port: 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.log("Connection Error", err));

module.exports = pool;