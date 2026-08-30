const express = require("express");

const { createAppointment, getDoctorQueue } = require("../controllers/appointmentControler.js");

const { protect } = require("../middleware/authMiddleware.js");

const appointmentrouter = express.Router();


// Book appointment
appointmentrouter.post("/",protect,createAppointment);


// Doctor queue
appointmentrouter.get("/doctor",protect,getDoctorQueue);


module.exports = appointmentrouter;