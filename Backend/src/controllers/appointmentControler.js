const Appointment = require("../models/appointment.js");

// Create a new appointment
const createAppointment = async (req,res) => {
  try {
    const {
      patientId,
      doctorId,
      facilityId,
      date,
      type,
      reason
    } = req.body;

    const existing =
      await Appointment.countDocuments({
        doctorId,
        date: new Date(date)
      });

    const appointment =
      await Appointment.create({
        patientId,
        doctorId,
        facilityId,
        date,
        type,
        reason,
        tokenNumber: existing + 1
      });

    res.status(201).json({
      message: "Appointment booked",
      appointment
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get the queue of appointments for a doctor
const getDoctorQueue = async (req,res) => {
  try {

    const appointments =
      await Appointment.find({
        doctorId: req.user.id,
        status: {
          $in: [
            "BOOKED",
            "WAITING",
            "IN_PROGRESS"
          ]
        }
      })
        .populate("patientId")
        .sort({ tokenNumber: 1 });

    res.json(appointments);
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getDoctorQueue
};