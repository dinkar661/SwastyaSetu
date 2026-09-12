const express = require("express");

const AppointmentRouter = express.Router();

const {
    createAppointment,
    getDoctorQueue,
    getMyAppointments
} = require("../controllers/appointmentControler");

const { protect } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");


AppointmentRouter.post(
    "/",
    protect,
    authorize("PATIENT", "HEALTH_WORKER"),
    createAppointment
);


AppointmentRouter.get(
    "/my",
    protect,
    authorize("PATIENT"),
    getMyAppointments
);


AppointmentRouter.get(
    "/doctor",
    protect,
    authorize("DOCTOR"),
    getDoctorQueue
);


module.exports = AppointmentRouter;