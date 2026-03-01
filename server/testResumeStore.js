const storeResume = require("./ai/database/resumeStore");

async function test() {

  const resumeText = "I know Python, SQL and Machine Learning";
  const skills = JSON.stringify(["Python", "SQL", "ML"]);

  await storeResume(resumeText, skills);

}

test();