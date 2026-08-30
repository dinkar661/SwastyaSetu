const Referral = require("../models/referral.js");


// Create a new referral
const createReferral = async (req, res) => {
  try {
    const {
      patientId,
      fromFacility,
      toFacility,
      reason,
      priority
    } = req.body;

    const referral = await Referral.create({
      patientId,
      fromFacility,
      toFacility,
      reason,
      priority,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Referral created",
      referral
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Update referral status
const updateReferralStatus = async (req,res) => {
  try {
    const { status } = req.body;

    const referral =
      await Referral.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    if (!referral) {
      return res.status(404).json({
        message: "Referral not found"
      });
    }

    res.json({
      message: "Referral updated",
      referral
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createReferral,
  updateReferralStatus
};