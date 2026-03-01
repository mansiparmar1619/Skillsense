const skillList = [
  "javascript", "python", "java", "c++", "c#", "ruby", "go", "php", "typescript", "swift", "kotlin", "rust", "r", "sql",
  "html", "css", "react", "vue", "angular", "next.js", "tailwind", "bootstrap", "sass", "redux", "jquery", "figma",
  "node", "express", "django", "flask", "spring", "asp.net", "ruby on rails", "graphql", "rest api",
  "mongodb", "mysql", "postgresql", "oracle", "redis", "firebase", "cassandra", "elasticsearch",
  "aws", "azure", "gcp", "docker", "kubernetes", "linux", "jenkins", "terraform", "ci/cd", "git", "github", "gitlab",
  "machine learning", "deep learning", "data analysis", "data science", "pandas", "numpy", "tensorflow", "pytorch", "power bi", "tableau", "statistics", "nlp", "computer vision", "excel",
  "agile", "scrum", "jira", "leadership", "communication", "problem solving", "management", "marketing", "seo", "security"
];

function extractSkills(text){
  const lowerText = text.toLowerCase();
  const detected = [];

  skillList.forEach(skill => {
    // using boundaries or just includes
    // just includes might falsely match "go" in "good", so let's add word boundaries for short words maybe? 
    // actually, strict words are better matched with regex
    const regex = new RegExp(`\\b${skill === 'c++' ? 'c\\+\\+' : skill.replace('.', '\\.')}\\b`, 'i');
    if(regex.test(lowerText)){
      detected.push(skill);
    }
  });

  return detected;
}

module.exports = extractSkills;