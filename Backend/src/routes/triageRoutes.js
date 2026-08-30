const express = require("express");

const { triagePatient } = require("../controllers/triagecontroler.js");
const { protect } = require("../middleware/authMiddleware.js");

const triagerouter = express.Router();

triagerouter.post("/",protect,triagePatient);

module.exports = triagerouter;