const axios = require("axios");
const cheerio = require("cheerio");

async function fetchIndeedJobs(role){

    const formattedRole = role.replace(/\s+/g, "+");

    const url = `https://www.indeed.com/jobs?q=${formattedRole}&l=India`;

    try{

        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        let jobs = [];

        $(".job_seen_beacon").each((i, el)=>{

            const title = $(el).find("h2 span").text().trim();
            const link = "https://www.indeed.com" + $(el).find("a").attr("href");

            jobs.push({
                title,
                platform: "Indeed",
                applyLink: link
            });
        });

        return jobs;

    }
    catch(err){
        console.log("Indeed fetch error:", err.message);
        return [];
    }
}

module.exports = fetchIndeedJobs;