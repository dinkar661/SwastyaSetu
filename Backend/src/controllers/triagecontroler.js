const { performTriage } = require('../services/aiService.js');

const triagePatient = async (req, res) => {
  try {
    const {
      age,
      symptoms
    } = req.body;

    if (!age || !symptoms?.length) {
      return res.status(400).json({
        message: "Age and symptoms are required"
      });
    }

    const result = await performTriage({
      age,
      symptoms
    });

    res.json({
      result
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  triagePatient
};