const roleMap = {
  "Frontend Developer": ["react", "vue", "angular", "html", "css", "javascript", "typescript", "tailwind", "next.js", "bootstrap"],
  "Backend Developer": ["node", "express", "java", "python", "php", "ruby", "django", "spring", "c#", ".net", "go", "sql", "postgresql"],
  "Full Stack Developer": ["react", "node", "javascript", "html", "css", "mongodb", "mysql", "express", "aws", "docker", "typescript", "sql"],
  "Data Scientist": ["python", "r", "machine learning", "deep learning", "pandas", "numpy", "tensorflow", "pytorch", "statistics"],
  "Data Analyst": ["python", "sql", "excel", "pandas", "numpy", "power bi", "tableau", "data visualization", "statistics"],
  "Cloud Engineer": ["aws", "azure", "docker", "kubernetes", "linux", "gcp", "terraform", "ci/cd", "devops"],
  "Machine Learning Engineer": ["python", "machine learning", "deep learning", "nlp", "computer vision", "tensorflow", "pytorch"],
  "UI/UX Designer": ["figma", "sketch", "adobe xd", "wireframing", "prototyping", "illustrator", "photoshop", "user experience", "user interface"],
  "Product Manager": ["agile", "scrum", "jira", "product management", "leadership", "communication", "roadmap", "strategy", "confluence"],
  "Cybersecurity Analyst": ["security", "networking", "linux", "penetration testing", "firewalls", "cryptography", "wireshark", "ethical hacking"],
  "QA Automation Engineer": ["selenium", "cypress", "jest", "mocha", "testing", "qa", "automation", "python", "java"],
  "Marketing Specialist": ["seo", "marketing", "google analytics", "content marketing", "social media", "campaign management", "hubspot", "copywriting"],
  "Sales Representative": ["sales", "b2b", "b2c", "crm", "salesforce", "cold calling", "negotiation", "communication", "account management"],
  "HR Generalist": ["hr", "recruitment", "onboarding", "employee relations", "payroll", "performance management", "workday", "communication"],
  "Financial Analyst": ["finance", "excel", "financial modeling", "accounting", "forecasting", "budgeting", "valuation", "sql", "data analysis"]
};

// Map high-level role labels to a concise domain label for UI
const roleDomainMap = {
  "Frontend Developer": "Web Development",
  "Backend Developer": "Web Development",
  "Full Stack Developer": "Web Development",
  "Data Scientist": "Data Science",
  "Data Analyst": "Data Science",
  "Cloud Engineer": "Cloud Computing",
  "Machine Learning Engineer": "Artificial Intelligence",
  "UI/UX Designer": "Design",
  "Product Manager": "Product Management",
  "Cybersecurity Analyst": "Cybersecurity",
  "QA Automation Engineer": "Quality Assurance",
  "Marketing Specialist": "Marketing",
  "Sales Representative": "Sales",
  "HR Generalist": "Human Resources",
  "Financial Analyst": "Finance"
};

function detectRoleFromSkills(skills) {
  let scores = {};

  Object.entries(roleMap).forEach(([role, roleSkills]) => {
    scores[role] = skills.filter(skill => roleSkills.includes(skill)).length;
  });

  let bestRole = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  return scores[bestRole] > 0 ? bestRole : null;
}

function getDomainForRole(role) {
  return roleDomainMap[role] || null;
}

module.exports = { detectRoleFromSkills, roleMap, getDomainForRole };