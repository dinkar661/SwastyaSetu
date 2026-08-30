const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes.js");
const patientRoutes = require("./routes/patientRoutes.js");
const recordRoutes = require("./routes/medicalRecordRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const referralRoutes = require("./routes/referralRoutes.js");
const triageRoutes = require("./routes/triageRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const app = express();


// Middleware
// app.use(
//     cors({
//         origin: process.env.CLIENT_URL,
//         credentials: true
//     })
// );

app.use(express.json());

app.use(cookieParser());


// Health check
app.get("/", (req, res) => {
    res.json({
        message: "SwasthyaSetu API running"
    });
});



// Routes
app.use("/api/auth",authRoutes);

app.use("/api/patients",patientRoutes);

app.use("/api/records",recordRoutes);

app.use("/api/appointments",appointmentRoutes);

app.use("/api/referrals",referralRoutes);

app.use("/api/triage",triageRoutes);

app.use("/api/dashboard",dashboardRoutes);

// hello
module.exports = app;