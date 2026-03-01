const pool = require("../database/db");

async function getCachedJobs(role){
    const result = await pool.query(
        "SELECT jobs FROM job_cache WHERE role = $1",
        [role]
    );

    return result.rows[0]?.jobs || null;
}

async function storeJobs(role, jobs){
    await pool.query(
        `INSERT INTO job_cache (role, jobs)
         VALUES ($1, $2)
         ON CONFLICT (role)
         DO UPDATE SET jobs = $2`,
        [role, JSON.stringify(jobs)]
    );
}

module.exports = { getCachedJobs, storeJobs };