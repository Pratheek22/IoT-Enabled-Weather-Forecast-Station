const express = require("express");
const SensorData = require("../models/SensorData");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: 1 });
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

router.post("/", async (req, res) => {
  const { temperature, humidity, pressure, light } = req.body;

  if (temperature == null || humidity == null || pressure == null || light == null) {
    return res.status(400).json({ message: "Missing fields in request body" });
  }

  const newSensorData = new SensorData({
    temperature,
    humidity,
    pressure,
    light
  });

  try {
    const savedData = await newSensorData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
