const express = require("express");

const { createMedicalRecord, getPatientRecords } = require("../controllers/medicalRecordsControler.js");

const { protect } = require("../middleware/authMiddleware.js");

const { authorize } = require("../middleware/roleMiddleware.js");

const recordrouter = express.Router();


// Doctor creates medical record
recordrouter.post("/",protect,authorize("DOCTOR"),createMedicalRecord);


// Get patient's medical records
recordrouter.get("/:patientId",protect,getPatientRecords);


module.exports = recordrouter;