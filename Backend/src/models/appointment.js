const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
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

    date: {
      type: Date,
      required: true
    },

    type: {
      type: String,
      enum: ["IN_PERSON", "TELECONSULTATION"],
      default: "IN_PERSON"
    },

    tokenNumber: Number,

    status: {
      type: String,
      enum: [
        "BOOKED",
        "WAITING",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "BOOKED"
    },

    reason: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);