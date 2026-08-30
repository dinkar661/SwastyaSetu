const Patient = require("../models/patient.js");
const Referral = require("../models/referral.js");
const Appointment = require("../models/appointment.js");

const getDashboard = async (req,res) => {
  try {
    const totalPatients =
      await Patient.countDocuments();

    const pendingReferrals =
      await Referral.countDocuments({
        status: {
          $nin: ["COMPLETED", "CANCELLED"]
        }
      });

    const completedReferrals =
      await Referral.countDocuments({
        status: "COMPLETED"
      });

    const totalAppointments =
      await Appointment.countDocuments();

    res.json({
      totalPatients,
      pendingReferrals,
      completedReferrals,
      totalAppointments
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  getDashboard
};