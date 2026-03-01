const axios = require("axios");

/**
 * Fetch real job listings from SerpAPI Google Jobs (LinkedIn, Indeed, Naukri, etc.)
 * Set SERPAPI_API_KEY in .env
 */
async function fetchGoogleJobs(role) {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    console.warn("SERPAPI_API_KEY not set in .env – using mock jobs");
    return [];
  }

  const query = encodeURIComponent(`${role} jobs`);
  const url = `https://serpapi.com/search.json?engine=google_jobs&q=${query}&location=India&api_key=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    const jobsData = data.jobs_results;
    const jobsArray = Array.isArray(jobsData) ? jobsData : (jobsData?.jobs || []);

    return jobsArray.map((job) => {
      const scheduleType = job.detected_extensions?.schedule_type || job.extensions?.find((e) =>
        /full[- ]?time|part[- ]?time|contract|internship/i.test(String(e))
      ) || "Full-time";
      const platform = (job.via || "Google").replace(/^via\s+/i, "").trim();

      return {
        title: job.title || "Job",
        company: job.company_name || job.company,
        location: job.location,
        type: scheduleType,
        platform: platform,
        applyLink: job.link || job.apply_link || job.related_links?.[0]?.link,
      };
    }).filter((j) => j.applyLink);
  } catch (err) {
    console.error("Google Jobs fetch error:", err.message);
    return [];
  }
}

module.exports = fetchGoogleJobs;