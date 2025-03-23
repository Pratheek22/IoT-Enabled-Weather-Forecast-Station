const SensorData = require("../models/SensorData");

const storeSensorData = async (req, res) => {
  const { temperature, humidity, pressure, lightIntensity } = req.body;
  try {
    const newData = new SensorData({
      temperature,
      humidity,
      pressure,
      lightIntensity,
    });
    await newData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
};


const getLatestSensorData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ createdAt: -1 }).limit(1);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  storeSensorData,
  getLatestSensorData,
};
