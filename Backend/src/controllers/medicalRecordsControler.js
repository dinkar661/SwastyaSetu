const MedicalRecord = require("../models/medicalRecord.js");
const Patient = require("../models/patient.js");

const createMedicalRecord = async (req,res) => {
  try {
    const record =
      await MedicalRecord.create({
        ...req.body,
        doctorId: req.user._id
      });

    res.status(201).json(record);
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getMyMedicalRecords = async (req, res) => {
  try {

    const patient = await Patient.findOne({
      userId: req.user._id
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient profile not found."
      });
    }

    const records = await MedicalRecord.find({
      patientId: patient._id
    })
      .populate("doctorId", "name")
      .sort({ createdAt: -1 });

    res.json(records);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createMedicalRecord,
  getMyMedicalRecords
};