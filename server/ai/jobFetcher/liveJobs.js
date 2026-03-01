const axios = require("axios");

async function fetchInternshalaJobs(role) {

    const formattedRole = role.toLowerCase().replace(/\s+/g, "-");

    const url = `https://internshala.com/api/internships?keyword=${formattedRole}`;

    try {

        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });
        console.log("Internshala API response:", data);

        let jobs = [];

        const internships = data?.internships_meta;

        if(!internships) return [];

        Object.values(internships).forEach(job => {

            jobs.push({
                title: job.profile_name,
                platform: "Internshala",
                applyLink: `https://internshala.com/internship/detail/${job.slug}`
            });

        });

        return jobs;

    } catch (err) {
        console.log("Internshala API fetch error:", err.message);
        return [];
    }
}

module.exports = fetchInternshalaJobs;