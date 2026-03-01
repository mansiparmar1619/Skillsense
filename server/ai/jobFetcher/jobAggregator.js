const fetchInternshalaJobs = require("./internshalaFetcher");

async function fetchAllJobs() {

  console.log("Fetching jobs...");

  await fetchInternshalaJobs();

  console.log("Done fetching jobs");
}

module.exports = fetchAllJobs;