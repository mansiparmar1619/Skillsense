const pool = require("../database/db");

async function detectSkillGap() {

  console.log("Checking Skill Gap...");

  const resume = await pool.query("SELECT * FROM resumes LIMIT 1");
  const jobs = await pool.query("SELECT * FROM jobs");

  if (resume.rows.length === 0) {
    console.log("No resume found");
    return;
  }

  const resumeSkills = JSON.parse(JSON.stringify(resume.rows[0].skills));

  for (let job of jobs.rows.slice(0,5)) {

    const jobSkills = JSON.parse(JSON.stringify(job.skills));

    const missing = jobSkills.filter(skill => !resumeSkills.includes(skill));
    const recommendSkills = require("./recommendSkills");

const recommended = recommendSkills(missing);

console.log("Recommended Skills:", recommended.length ? recommended : "None");

    console.log("For Role:", job.title);
    console.log("Missing Skills:", missing.length ? missing : "None");
    console.log("---------------------");
  }
}

module.exports = detectSkillGap;