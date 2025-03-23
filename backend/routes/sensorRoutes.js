const express = require("express");
const SensorData = require("../models/SensorData");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: 1 }); // Ascending order
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/last10", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(10);
    res.json(data.reverse());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
