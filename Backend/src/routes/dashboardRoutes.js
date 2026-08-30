const express = require("express");

const { getDashboard } = require("../controllers/dashboardControler.js");

const { protect } = require("../middleware/authMiddleware.js");

const { authorize } = require("../middleware/roleMiddleware.js");

const dashboardrouter = express.Router();

dashboardrouter.get("/",protect,authorize("ADMIN"),getDashboard);

module.exports = dashboardrouter;