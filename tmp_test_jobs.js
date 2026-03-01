const fetchJobs = require("./server/ai/jobFetcher/multiPlatformJobs");

async function test() {
  const jobs = await fetchJobs("frontend");
  console.log(JSON.stringify(jobs, null, 2));
}

test();
