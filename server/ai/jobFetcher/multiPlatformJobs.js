const fetchGoogleJobs = require("./googleJobs");

const domainToSearch = {
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

// Fallback mock jobs when API returns empty (no API key or rate limit)
const domainJobs = {
  frontend: [
    { title: "Frontend Developer", company: "TechNova", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "React Developer", company: "PixelCraft Studios", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "UI Engineer", company: "DesignHub", location: "Hyderabad, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Frontend Engineer", company: "CloudSync Inc.", location: "Remote", type: "Contract", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "JavaScript Developer", company: "WebForge", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Web Developer", company: "StartupX", location: "Mumbai, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Angular Developer", company: "FinEdge Solutions", location: "Chennai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Frontend Lead", company: "DataViz Corp", location: "Noida, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
  ],
  backend: [
    { title: "Backend Developer", company: "ServerStack", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Node.js Developer", company: "APIFirst Labs", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Java Backend Engineer", company: "FinCore Systems", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Python Backend Developer", company: "DataBridge", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "REST API Developer", company: "CloudNet", location: "Remote", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Backend Engineer", company: "ScaleUp Tech", location: "Gurgaon, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Spring Boot Developer", company: "MicroServ Inc.", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Server-Side Engineer", company: "Nexus Digital", location: "Mumbai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  fullStack: [
    { title: "Full Stack Developer", company: "BuildStack", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "MERN Stack Developer", company: "WebGenius", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Full Stack Engineer", company: "AppCraft Solutions", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "MEAN Stack Developer", company: "TechStream", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Full Stack Web Developer", company: "InnovateTech", location: "Remote", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Software Engineer (Full Stack)", company: "Vertex Labs", location: "Noida, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Full Stack JavaScript Developer", company: "CodeCraft", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Senior Full Stack Developer", company: "DataPulse", location: "Gurgaon, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  dataScience: [
    { title: "Data Scientist", company: "AnalytiQ", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Data Analyst", company: "InsightHub", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Business Intelligence Analyst", company: "DataMinds", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Data Engineer", company: "PipelineX", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Quantitative Analyst", company: "FinData Corp", location: "Mumbai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Research Data Scientist", company: "DeepSense AI", location: "Remote", type: "Contract", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Statistical Analyst", company: "StatCore", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Senior Data Scientist", company: "Algo Analytics", location: "Gurgaon, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  ai_ml: [
    { title: "Machine Learning Engineer", company: "NeuralForge", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "AI Research Engineer", company: "DeepMind Labs", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "NLP Engineer", company: "LangTech AI", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Computer Vision Engineer", company: "VisionX", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Deep Learning Engineer", company: "TensorLab", location: "Remote", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "ML Ops Engineer", company: "ModelDeploy", location: "Noida, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "AI/ML Developer", company: "CogniTech", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Applied ML Scientist", company: "PredictAI", location: "Mumbai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  cloudComputing: [
    { title: "Cloud Engineer", company: "CloudFirst", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "AWS Solutions Architect", company: "SkyScale", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Azure Cloud Engineer", company: "MicroCloud", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Cloud Infrastructure Engineer", company: "InfraStack", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "GCP Cloud Architect", company: "CloudForge", location: "Remote", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Cloud Security Engineer", company: "ShieldCloud", location: "Gurgaon, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Site Reliability Engineer", company: "ReliaTech", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Cloud DevOps Engineer", company: "PipeCloud", location: "Noida, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  cybersecurity: [
    { title: "Cybersecurity Analyst", company: "SecureNet", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Penetration Tester", company: "HackShield", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "SOC Analyst", company: "CyberWatch", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Security Engineer", company: "FortKnox Tech", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Information Security Analyst", company: "InfoGuard", location: "Mumbai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Ethical Hacker", company: "RedTeam Labs", location: "Remote", type: "Contract", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Threat Intelligence Analyst", company: "ThreatVault", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Cyber Defense Specialist", company: "CyberOps", location: "Gurgaon, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  devOps: [
    { title: "DevOps Engineer", company: "PipelinePro", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "CI/CD Engineer", company: "AutoBuild", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Platform Engineer", company: "PlatformX", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Infrastructure Engineer", company: "InfraOps", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Kubernetes Engineer", company: "K8sForge", location: "Remote", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Release Engineer", company: "DeployFast", location: "Noida, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "DevSecOps Engineer", company: "SecureDeploy", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Automation Engineer", company: "AutoScale", location: "Mumbai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  mobileDevelopment: [
    { title: "Mobile App Developer", company: "AppNova", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "React Native Developer", company: "CrossPlatform Co.", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "iOS Developer", company: "AppleCraft", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Android Developer", company: "DroidTech", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Flutter Developer", company: "FlutterWorks", location: "Remote", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Mobile UI/UX Developer", company: "MobileFirst", location: "Gurgaon, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Swift Developer", company: "iCodeLab", location: "Chennai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Mobile Engineer", company: "AppForge", location: "Mumbai, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
  blockchain: [
    { title: "Blockchain Developer", company: "ChainForge", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Solidity Developer", company: "Web3Labs", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Smart Contract Engineer", company: "DeFi Solutions", location: "Remote", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
    { title: "Crypto Backend Developer", company: "TokenTech", location: "Hyderabad, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "DApp Developer", company: "DecentralX", location: "Pune, India", type: "Contract", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
    { title: "Blockchain Architect", company: "LedgerCore", location: "Mumbai, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
    { title: "Web3 Full Stack Developer", company: "MetaChain", location: "Remote", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
    { title: "Blockchain Security Engineer", company: "AuditDAO", location: "Gurgaon, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  ],
};

// Fallback generic jobs
const genericJobs = [
  { title: "Software Developer", company: "TechCorp", location: "Remote", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  { title: "Software Engineer", company: "BuildSoft", location: "Bangalore, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
  { title: "Junior Developer", company: "StartUp Hub", location: "Pune, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
  { title: "Associate Software Engineer", company: "InfoSys Global", location: "Hyderabad, India", type: "Full-time", platform: "Glassdoor", applyLink: "https://glassdoor.com/jobs" },
  { title: "Trainee Software Developer", company: "FreshTech", location: "Chennai, India", type: "Full-time", platform: "Indeed", applyLink: "https://indeed.com/jobs" },
  { title: "Application Developer", company: "CodeBase Inc.", location: "Noida, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
  { title: "IT Developer", company: "DigiServices", location: "Mumbai, India", type: "Full-time", platform: "Naukri", applyLink: "https://naukri.com/jobs" },
  { title: "Graduate Software Engineer", company: "FutureTech", location: "Gurgaon, India", type: "Full-time", platform: "LinkedIn", applyLink: "https://linkedin.com/jobs" },
];

async function fetchJobsFromAllPlatforms(domainKey) {
  try {
    const searchQuery = domainToSearch[domainKey] || "Software Developer";
    console.log("🔍 Fetching real jobs for:", searchQuery);

    // Fetch genuine jobs from SerpAPI (LinkedIn, Indeed, Naukri, Glassdoor, etc.)
    const realJobs = await fetchGoogleJobs(searchQuery);

    if (realJobs && realJobs.length > 0) {
      return realJobs.slice(0, 12); // Limit to 12 jobs
    }

    // Fallback to mock jobs with search links when API has no results or no key
    console.log("⚠️ Using fallback jobs for:", searchQuery);
    const baseJobs = domainJobs[domainKey] || genericJobs;

    return baseJobs.map((job) => {
      const query = encodeURIComponent([job.title, job.company].filter(Boolean).join(" "));
      let searchLink;
      switch ((job.platform || "").toLowerCase()) {
        case "linkedin":
          searchLink = `https://www.linkedin.com/jobs/search/?keywords=${query}`;
          break;
        case "indeed":
          searchLink = `https://www.indeed.com/jobs?q=${query}`;
          break;
        case "naukri":
          searchLink = `https://www.naukri.com/jobs?q=${query}`;
          break;
        case "glassdoor":
          searchLink = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${query}`;
          break;
        default:
          searchLink = `https://www.linkedin.com/jobs/search/?keywords=${query}`;
      }
      return { ...job, applyLink: searchLink };
    });
  } catch (err) {
    console.error("Job Fetch Error:", err);
    return [];
  }
}

module.exports = fetchJobsFromAllPlatforms;