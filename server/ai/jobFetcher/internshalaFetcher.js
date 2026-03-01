const axios = require("axios");
const cheerio = require("cheerio");
const pool = require("../database/db");
const getEmbedding = require("../embedding/embedder");


// 🧠 Skill Extractor
function extractSkills(text) {

  const skillList =[
  "Python","SQL","Machine Learning","Data Analysis","Excel",
  "Artificial Intelligence","Deep Learning","NLP",
  "AWS","Docker","JavaScript","React","Node",
  "Power BI","Tableau","Pandas","NumPy",
  "SEO","Digital Marketing","Content Writing",
  "Data Visualization","Statistics",
  "Prompt Engineering","Automation",
  "ChatGPT","API Integration",
  "Content Strategy","AI Tools",
  "Workflow Design","Business Intelligence"
];

  let foundSkills = [];

  skillList.forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, "i");
    if (regex.test(text)) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
}


// 🌐 Fetch Internshala Jobs
async function fetchInternshalaJobs() {

  try {

    const url = "https://internshala.com/jobs/data-science-jobs/";
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const jobList = $(".individual_internship");

    for (let i = 0; i < jobList.length; i++) {

      try {

        const el = jobList[i];

        const title = $(el).find("h3").text().trim();
        const description = $(el).text().trim();

        if (!title || !description) continue;

        const extractedSkills = extractSkills(description);

        console.log("Processing:", title);

        const embedding = await getEmbedding(description);

        const query = `
          INSERT INTO jobs (title, description, skills, source, embedding)
          VALUES ($1, $2, $3, $4, $5)
        `;

        await pool.query(query, [
          title,
          description,
          JSON.stringify(extractedSkills),
          "Internshala",
          JSON.stringify(embedding)
        ]);

        console.log("Saved:", title);

      } catch (err) {
        console.log("Skipped one job due to error");
      }
    }

    console.log("Jobs Stored with Embeddings");

  } catch (err) {
    console.error("Error fetching jobs:", err);
  }
}

module.exports = fetchInternshalaJobs;