const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const skills = require("../utils/skills");
const matchJobs = require("../services/matchService");

// File storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const cleanName = file.originalname.replace(/\s+/g, "_");
        cb(null, Date.now() + "-" + cleanName);
    }
});

const upload = multer({ storage: storage });

router.post("/upload-resume", upload.single("resume"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = path.join(__dirname, "../uploads", req.file.filename);

        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        const resumeText = pdfData.text.toLowerCase();

        const detectedSkills = skills.filter(skill =>
            resumeText.includes(skill)
        );

        const jobResults = matchJobs(detectedSkills);

        res.json({
            message: "Resume analyzed successfully",
            skills: detectedSkills,
            bestMatch: jobResults.bestMatch,
            bestDomain: jobResults.bestDomain,
            jobs: jobResults.allMatches,
            resumeScore: jobResults.resumeScore,
            suggestions: jobResults.suggestions
        });

    } catch (error) {
        console.log("PDF ERROR:", error);
        res.status(500).json({ message: "Error reading resume" });
    }
});

module.exports = router;