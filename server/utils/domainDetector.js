const {
  getDomainSkillLists,
  domainLabels,
  domainToJobRole,
  getAllSkillsFlat,
  normalizeSkill
} = require("./domainSkills");

/**
 * Extract skills found in text using the full domain skill list.
 */
function extractSkillsFromText(text) {
  if (!text || typeof text !== "string") return [];
  const lower = text.toLowerCase();
  const allSkills = getAllSkillsFlat();
  const seen = new Set();
  const found = [];

  for (const { normalized, display } of allSkills) {
    if (seen.has(normalized)) continue;
    const escaped = normalized.replace(/[.+*?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp("\\b" + escaped.replace(/\s+/g, "\\s+") + "\\b", "i");
    // Also match base form (e.g. "React" for "React.js", "Node" for "Node.js")
    const baseForm = normalized.split(/[.\s]/)[0];
    const baseRegex = baseForm && baseForm.length > 1
      ? new RegExp("\\b" + baseForm.replace(/[.+*?^${}()|[\]\\]/g, "\\$&") + "\\b", "i")
      : null;

    if (regex.test(lower) || (baseRegex && baseRegex.test(lower))) {
      seen.add(normalized);
      found.push(display);
    }
  }

  return found;
}


/**
 * Suggest best domain from detected skills using weighted dominance.
 * If both FE and BE are present, it strongly favors Full Stack.
 */
function suggestDomainFromSkills(detectedSkills) {
  const normalizedDetected = new Set(
    detectedSkills.map((s) => normalizeSkill(s))
  );

  const domainLists = getDomainSkillLists();
  const domainKeys = Object.keys(domainLabels);

  // 🚀 Skill importance boost lists
  const backendBoost = [
    "django", "flask", "node.js", "express.js", "spring boot", "php", "asp.net"
  ];

  const frontendBoost = [
    "react.js", "angular", "vue.js", "tailwind", "material ui"
  ];

  const aiBoost = [
    "tensorflow", "pytorch", "machine learning", "deep learning"
  ];

  // Only boost Full Stack when resume has fullstack-specific skills (not just FE or BE)
  const fullStackBoost = [
    "mern stack", "mean stack", "rest apis", "graphql"
  ];

  let bestKey = null;
  let bestScore = -1;

  for (const key of domainKeys) {
    const list = domainLists[key];
    if (!list || list.length === 0) continue;

    let matchScore = 0;

    list.forEach(({ normalized }) => {
      if (normalizedDetected.has(normalized)) {
        matchScore += 1;

        // Domain-specific weighting (only for that domain's core skills)
        if (key === "backend" && backendBoost.includes(normalized)) {
          matchScore += 3;
        }
        if (key === "frontend" && frontendBoost.includes(normalized)) {
          matchScore += 3;
        }
        if (key === "ai_ml" && aiBoost.includes(normalized)) {
          matchScore += 3;
        }
        if (key === "fullStack" && fullStackBoost.includes(normalized)) {
          matchScore += 2; // boost only for MERN, MEAN, REST APIs, GraphQL
        }
      }
    });

    // Prefer higher score; on tie, prefer the more specific domain (smaller list)
    if (matchScore > bestScore || (matchScore === bestScore && bestKey && list.length < (domainLists[bestKey] || []).length)) {
      bestScore = matchScore;
      bestKey = key;
    }
  }

  // Only set Full Stack when resume clearly has both FE and BE skills
  let tempFe = 0;
  let tempBe = 0;
  (domainLists["frontend"] || []).forEach(({ normalized }) => { if (normalizedDetected.has(normalized)) tempFe++; });
  (domainLists["backend"] || []).forEach(({ normalized }) => { if (normalizedDetected.has(normalized)) tempBe++; });

  if (tempFe >= 2 && tempBe >= 2) {
    bestKey = "fullStack";
  }

  // When no domain matched, pick the one with smallest skill list so "missing skills" isn’t huge
  if (!bestKey) {
    let minSize = Infinity;
    for (const key of domainKeys) {
      const list = domainLists[key];
      if (list && list.length > 0 && list.length < minSize) {
        minSize = list.length;
        bestKey = key;
      }
    }
    if (!bestKey) bestKey = "frontend"; // safe fallback
  }

  const skillList = domainLists[bestKey] || [];
  const missingSkills = skillList
    .filter(({ normalized }) => !normalizedDetected.has(normalized))
    .map(({ display }) => display);

  const domainLabel = domainLabels[bestKey] || "Full Stack Development";

  return {
    domainKey: bestKey,
    domainLabel,
    jobRole: domainToJobRole[bestKey] || "Full Stack Developer",
    missingSkills,
    detectedSkillsInDomain: skillList
      .filter(({ normalized }) => normalizedDetected.has(normalized))
      .map(({ display }) => display)
  };
}


/**
 * Full Pipeline
 */
function analyzeResumeDomains(resumeText) {
  const detectedSkills = extractSkillsFromText(resumeText);
  const suggestion = suggestDomainFromSkills(detectedSkills);

  return {
    resumeSkills: detectedSkills,
    domain: suggestion.domainLabel,
    domainKey: suggestion.domainKey,
    jobRole: suggestion.jobRole,
    missingSkills: suggestion.missingSkills,
    detectedInDomain: suggestion.detectedSkillsInDomain
  };
}

module.exports = {
  extractSkillsFromText,
  suggestDomainFromSkills,
  analyzeResumeDomains
};