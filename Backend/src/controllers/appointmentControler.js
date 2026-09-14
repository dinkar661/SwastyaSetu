const Appointment = require("../models/appointment.js");
const Patient = require("../models/patient.js");
const Facility = require("../models/facility.js");

// Create a new appointment

const createAppointment = async (req, res) => {

  try {

      // console.log("Hello");
    const {
      doctorId,
      facilityId,
      date,
      type,
      reason
    } = req.body;

    // Find patient profile using logged-in user
    const patient = await Patient.findOne({
      userId: req.user._id
    });


    if (!patient) {
      return res.status(404).json({
        message: "Patient profile not found"
      });

    }

    // console.log("Hello2");
    const existing =
      await Appointment.countDocuments({
        doctorId,
        date: new Date(date)
      });

    const appointment =
      await Appointment.create({
        patientId: patient._id,
        doctorId,
        facilityId,
        date,
        type,
        reason,
        tokenNumber: existing + 1
      });

      

    res.status(201).json({ message: "Appointment booked", appointment });
  }
  catch (error) {
    console.log("Create appointment error:", error);
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


const getMyAppointments = async (req, res) => {

    try {
        // console.log("Hello");
        const patient = await Patient.findOne({
            userId: req.user._id
        });


        if (!patient) {

            return res.status(404).json({
                message: "Patient profile not found"
            });

        }


        const appointments =
            await Appointment.find({
                patientId: patient._id
            })
                .populate("doctorId", "name email")
                .populate("facilityId")
                .sort({ date: 1 });


        res.json({
            appointments
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
  createAppointment,
  getDoctorQueue,
  getMyAppointments
};