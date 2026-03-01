const domainSkills = {
  softwareDevelopment: {
    frontend: [
      "HTML", "CSS", "JavaScript", "React.js", "Angular", "Vue.js",
      "Bootstrap", "Tailwind", "Material UI"
    ],
    backend: [
      "Node.js", "Express.js", "Django", "Flask", "Spring Boot",
      "PHP", "ASP.NET"
    ],
    fullstack: [
      "MERN Stack", "MEAN Stack", "REST APIs", "GraphQL"
    ]
  },

  dataScience: [
    "Python", "R", "Pandas", "NumPy", "Matplotlib",
    "Seaborn", "Scikit-learn", "EDA", "Statistics",
    "Data Cleaning", "Feature Engineering"
  ],

  ai_ml: [
    "Machine Learning", "Deep Learning", "NLP",
    "TensorFlow", "PyTorch", "Keras",
    "CNN", "RNN", "LLM"
  ],

  cloudComputing: [
    "AWS", "Azure", "Google Cloud",
    "EC2", "S3", "Lambda",
    "Cloud Storage", "Cloud Security"
  ],

  cybersecurity: [
    "Ethical Hacking", "Network Security",
    "Penetration Testing", "Firewalls",
    "Cryptography", "Threat Detection"
  ],

  devOps: [
    "Docker", "Kubernetes", "Jenkins",
    "Git", "CI/CD", "Terraform", "Linux"
  ],

  mobileDevelopment: [
    "Android", "Kotlin", "Swift",
    "React Native", "Flutter"
  ],

  blockchain: [
    "Solidity", "Smart Contracts",
    "Ethereum", "Solana",
    "Rust", "Web3.js"
  ],

  analytics: [
    "SQL", "Excel", "Tableau",
    "Power BI", "Business Intelligence"
  ],

  database: [
    "MySQL", "MongoDB", "PostgreSQL",
    "Oracle", "Firebase", "Redis"
  ]
};

const domainLabels = {
  frontend: "Frontend Development",
  backend: "Backend Development",
  fullStack: "Full Stack Development",
  dataScience: "Data Science",
  ai_ml: "AI/ML",
  cloudComputing: "Cloud Computing",
  cybersecurity: "Cybersecurity",
  devOps: "DevOps",
  mobileDevelopment: "Mobile Development",
  blockchain: "Blockchain",
  analytics: "Analytics",
  database: "Database"
};

const domainToJobRole = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullStack: "Full Stack Developer",
  dataScience: "Data Scientist",
  ai_ml: "Machine Learning Engineer",
  cloudComputing: "Cloud Engineer",
  cybersecurity: "Cybersecurity Analyst",
  devOps: "DevOps Engineer",
  mobileDevelopment: "Mobile Developer",
  blockchain: "Blockchain Developer",
  analytics: "Data Analyst",
  database: "Backend Developer"
};

function normalizeSkill(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, " ");
}

function getAllSkillsFlat() {
  const out = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((s) =>
      out.push({ normalized: normalizeSkill(s), display: s })
    );
  };

  const sd = domainSkills.softwareDevelopment;

  push(sd.frontend);
  push(sd.backend);
  push(sd.fullstack);

  push(domainSkills.dataScience);
  push(domainSkills.ai_ml);
  push(domainSkills.cloudComputing);
  push(domainSkills.cybersecurity);
  push(domainSkills.devOps);
  push(domainSkills.mobileDevelopment);
  push(domainSkills.blockchain);
  push(domainSkills.analytics);
  push(domainSkills.database);

  return out;
}

function getDomainSkillLists() {
  const toPairs = (arr) =>
    (arr || []).map((s) => ({
      normalized: normalizeSkill(s),
      display: s
    }));

  const sd = domainSkills.softwareDevelopment || {};

  return {
    frontend: toPairs(sd.frontend),
    backend: toPairs(sd.backend),
    // Full Stack includes FE, BE, and specific FS skills
    fullStack: toPairs([
      ...(sd.frontend || []),
      ...(sd.backend || []),
      ...(sd.fullstack || [])
    ]),

    dataScience: toPairs(domainSkills.dataScience),
    ai_ml: toPairs(domainSkills.ai_ml),
    cloudComputing: toPairs(domainSkills.cloudComputing),
    cybersecurity: toPairs(domainSkills.cybersecurity),
    devOps: toPairs(domainSkills.devOps),
    mobileDevelopment: toPairs(domainSkills.mobileDevelopment),
    blockchain: toPairs(domainSkills.blockchain),
    analytics: toPairs(domainSkills.analytics),
    database: toPairs(domainSkills.database)
  };
}

module.exports = {
  domainSkills,
  domainLabels,
  domainToJobRole,
  getAllSkillsFlat,
  getDomainSkillLists,
  normalizeSkill
};