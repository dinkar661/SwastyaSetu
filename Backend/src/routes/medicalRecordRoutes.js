const express = require("express");

const { createMedicalRecord,  getMyMedicalRecords , getMedicalRecords} = require("../controllers/medicalRecordsControler.js");

const { protect } = require("../middleware/authMiddleware.js");

const { authorize } = require("../middleware/roleMiddleware.js");

const recordrouter = express.Router();


// Doctor creates medical record
recordrouter.post("/",protect,authorize("DOCTOR"),createMedicalRecord);


// Logged-in patient gets their own records
recordrouter.get("/my",protect,authorize("PATIENT"),getMyMedicalRecords);

// Doctor / Health Worker gets a patient's records

recordrouter.get("/patient/:patientId",protect,authorize("DOCTOR", "HEALTH_WORKER"),getMedicalRecords);


module.exports = recordrouter;