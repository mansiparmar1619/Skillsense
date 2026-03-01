const skillMap = require("./skillMap");

function recommendSkills(missingSkills) {

  let recommendations = [];

  missingSkills.forEach(skill => {
    if (skillMap[skill]) {
      recommendations.push(...skillMap[skill]);
    }
  });

  return [...new Set(recommendations)];
}

module.exports = recommendSkills;