const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    fromFacility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility"
    },

    toFacility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    reason: {
      type: String,
      required: true
    },

    priority: {
      type: String,
      enum: ["ROUTINE", "URGENT", "EMERGENCY"],
      default: "ROUTINE"
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "ACCEPTED",
        "SCHEDULED",
        "PATIENT_ARRIVED",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "CREATED"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Referral", referralSchema);