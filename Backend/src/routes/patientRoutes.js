const express = require("express");
const { createPatient, getPatient,getAllPatients } = require("../controllers/patientControler");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const Patientrouter = express.Router();

// console.log("========== PATIENT ROUTE DEBUG ==========");
// console.log("createPatient:", typeof createPatient);
// console.log("getPatient:", typeof getPatient);
// console.log("protect:", typeof protect);
// console.log("authorize:", typeof authorize);
// console.log("authorize result:", typeof authorize?.("HEALTH_WORKER", "ADMIN"));
// console.log("==========================================");

Patientrouter.post("/",protect,authorize("HEALTH_WORKER", "ADMIN"),createPatient);

// Get a patient by ID
Patientrouter.get("/:id",protect,getPatient);

Patientrouter.get("/",protect,authorize("HEALTH_WORKER", "ADMIN"),getAllPatients);

module.exports = Patientrouter;