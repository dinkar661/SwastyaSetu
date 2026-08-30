const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "PATIENT",
        "HEALTH_WORKER",
        "DOCTOR",
        "ADMIN"
      ],
      required: true
    },

    language: {
      type: String,
      enum: ["en", "hi", "mr"],
      default: "en"
    },

    facilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);