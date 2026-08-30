const Patient = require("../models/patient");

// Create a new patient

const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      village,
      district,
      address,
      bloodGroup,
      allergies,
      chronicConditions,
      emergencyContact
    } = req.body;

    
    const patientId =
      "PAT-" +
      Date.now().toString().slice(-6);

    const patient = await Patient.create({
      patientId,
      name,
      age,
      gender,
      phone,
      village,
      district,
      address,
      bloodGroup,
      allergies,
      chronicConditions,
      emergencyContact,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Patient registered",
      patient
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get all patients

const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(
      req.params.id
    );

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createPatient,
  getPatient
};