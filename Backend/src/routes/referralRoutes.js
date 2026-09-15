const express = require("express");

const { createReferral, updateReferralStatus, getMyReferrals } = require("../controllers/referralControler.js");

const { protect } = require("../middleware/authMiddleware.js");

const referralrouter = express.Router();

referralrouter.post("/",protect,createReferral);

referralrouter.put("/:id/status",protect,updateReferralStatus);

// Patient's referrals
referralrouter.get("/my",protect,getMyReferrals);

module.exports = referralrouter;