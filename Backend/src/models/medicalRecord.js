const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    facilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility"
    },

    symptoms: [String],

    diagnosis: String,

    notes: String,

    prescription: [
      {
        medicine: String,
        dosage: String,
        duration: String
      }
    ],

    visitType: {
      type: String,
      enum: ["IN_PERSON", "TELECONSULTATION"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);