import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Predictions.css";

const Predictions = () => {
  const [prediction, setPrediction] = useState(null);

  const fetchPrediction = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/predictions");
      if (res.data.length > 0) {
        setPrediction(res.data[0]);
      } else {
        setPrediction(null);
      }
    } catch (err) {
      console.error("Error fetching prediction:", err);
    }
  };


  useEffect(() => {
    fetchPrediction();
    const interval = setInterval(fetchPrediction, 300000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="prediction-container">
      <h3>Predictions for Next Hour</h3>
      {prediction ? (
        <table className="prediction-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Predicted Temperature (°C)</th>
              <th>Predicted Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{new Date(prediction.timestamp).toLocaleString()}</td>
              <td>{prediction.predicted_temperature.toFixed(2)}</td>
              <td>{prediction.predicted_humidity.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="no-data">No predictions available.</p>
      )}
    </div>
  );
};

export default Predictions;
