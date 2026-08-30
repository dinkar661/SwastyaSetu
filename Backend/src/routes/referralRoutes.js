const express = require("express");

const { createReferral, updateReferralStatus } = require("../controllers/referralControler.js");

const { protect } = require("../middleware/authMiddleware.js");

const referralrouter = express.Router();

referralrouter.post("/",protect,createReferral);

referralrouter.put("/:id/status",protect,updateReferralStatus);

module.exports = referralrouter;