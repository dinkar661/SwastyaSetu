const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: [
        "SUB_CENTER",
        "PHC",
        "RURAL_HOSPITAL",
        "DISTRICT_HOSPITAL"
      ]
    },

    district: String,

    address: String,

    phone: String,

    doctorsAvailable: {
      type: Number,
      default: 0
    },

    diagnostics: [
      {
        name: String,
        available: Boolean
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Facility", facilitySchema);