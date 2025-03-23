import React from "react";
import "./SensorCard.css";

const SensorCard = ({ data }) => {
  if (!data) {
    return (
      <div className="sensor-card error">
        <h2>⚠️ No Sensor Data Available</h2>
      </div>
    );
  }

  return (
    <div className="sensor-card">
  
      <div className="sensor-card-header">
        <h2>📊 Current Sensor Data</h2>
      </div>

      <div className="sensor-card-body">
        <div className="sensor-info">
          <span className="label">🌡️ Temperature:</span>
          <span className="value">{data.temperature ?? "N/A"} °C</span>
        </div>

        <div className="sensor-info">
          <span className="label">💧 Humidity:</span>
          <span className="value">{data.humidity ?? "N/A"} %</span>
        </div>

        <div className="sensor-info">
          <span className="label">⚡ Pressure:</span>
          <span className="value">{data.pressure ?? "N/A"} hPa</span>
        </div>

        <div className="sensor-info">
          <span className="label">💡 Light Intensity:</span>
          <span className="value">{data.lightIntensity ?? "N/A"} lux</span>
        </div>

        <div className="sensor-info">
          <span className="label">⏰ Timestamp:</span>
          <span className="value">
            {data.timestamp
              ? new Date(data.timestamp).toLocaleString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
