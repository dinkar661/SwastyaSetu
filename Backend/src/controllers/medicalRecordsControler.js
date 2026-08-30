const MedicalRecord = require("../models/medicalRecord.js");

const createMedicalRecord = async (req,res) => {
  try {
    const record =
      await MedicalRecord.create({
        ...req.body,
        doctorId: req.user.id
      });

    res.status(201).json(record);
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getPatientRecords = async (req,res) => {
  try {
    const records =
      await MedicalRecord.find({
        patientId: req.params.patientId
      })
        .populate("doctorId", "name")
        .sort({ createdAt: -1 });

    res.json(records);
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createMedicalRecord,
  getPatientRecords
};