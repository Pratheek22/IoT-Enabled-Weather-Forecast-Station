const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  predicted_temperature: { type: Number, required: true },
  predicted_humidity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
