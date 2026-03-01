const pool = require("../database/db");
const cosineSimilarity = require("./matcher");

async function matchResumeWithJobs() {

  console.log("Starting Matching...");

  const resumeResult = await pool.query("SELECT * FROM resumes ORDER BY id DESC LIMIT 1");
  const jobsResult = await pool.query("SELECT * FROM jobs");

  if (resumeResult.rows.length === 0) {
    console.log("No Resume Found");
    return;
  }

  // ✅ Use stored resume embedding
  const resumeVector = resumeResult.rows[0].embedding;

  console.log("Matching with jobs using stored embeddings...");

  const jobs = jobsResult.rows.slice(0, 10);

  let count = 1;
  let results = [];

  for (let job of jobs) {

    console.log("Processing Job:", count);

    // ✅ Use stored job embedding
    const jobVector = job.embedding;

    if (!jobVector) continue;

    const score = cosineSimilarity(resumeVector, jobVector);

    results.push({
      title: job.title,
      match: (score * 100).toFixed(2)
    });

    console.log(job.title, "Match:", (score * 100).toFixed(2) + "%");

    count++;
  }

  console.log("Matching Complete");

  return results;
}

module.exports = matchResumeWithJobs;