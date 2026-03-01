const express = require("express");
const { analyzeResume } = require("../ai/controller/analyzeController");

const router = express.Router();

router.post("/analyze-resume", analyzeResume);

module.exports = router;