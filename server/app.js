require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const resumeRoutes = require("./routes/resumeRoutes");
const analyzeRoute = require("./routes/analyzeRoute");

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET","POST"],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// APIs
app.use("/api", resumeRoutes);
app.use("/api", analyzeRoute);

// Test Route
app.get("/", (req,res)=>{
    res.send("Server Running");
});

// Server Start
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});