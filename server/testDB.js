const pool = require("./ai/database/db");

async function testDB() {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows);
}

testDB();