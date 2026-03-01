const jobs = require("../utils/jobs");

function matchJobs(userSkills) {

    let results = [];
    let totalMatch = 0;

    jobs.forEach(job => {

        const matched = job.skills.filter(skill =>
            userSkills.includes(skill)
        );

        const score = Math.round((matched.length / job.skills.length) * 100);

        totalMatch += score;

        results.push({
            jobTitle: job.title,
            domain: job.domain,
            matchScore: score,
            matchedSkills: matched,
            missingSkills: job.skills.filter(skill => !userSkills.includes(skill))
        });

    });

    const sortedJobs = results.sort((a,b)=> b.matchScore - a.matchScore);

    const resumeScore = Math.round(totalMatch / jobs.length);

    const bestMatch = sortedJobs[0];

    const bestDomain = bestMatch.domain;

    const suggestions = bestMatch.missingSkills.map(skill => 
        `Learn ${skill} to improve your ${bestMatch.jobTitle} match`
    );

    return {
        bestMatch,
        bestDomain,
        allMatches: sortedJobs.slice(0,3),
        resumeScore,
        suggestions
    };
}

module.exports = matchJobs;