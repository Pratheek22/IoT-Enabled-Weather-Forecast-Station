const express = require('express');
const router = express.Router();
const Prediction = require('../models/predictionModel');

router.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ timestamp: -1 }).limit(10);
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
