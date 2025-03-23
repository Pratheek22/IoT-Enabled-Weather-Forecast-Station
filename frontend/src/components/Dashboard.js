import React, { useState, useEffect } from "react";
import axios from "../services/api";
import SensorCard from "./SensorCard";
import Prediction from "./Prediction";
import SensorGraph from "./SensorGraph";
import "./Dashboard.css";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [lastValue, setLastValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/sensors/last10");
        setSensorData(data);

        if (data.length > 0) {
          setLastValue(data[data.length - 1]);
        }
      } catch (err) {
        console.error("Error fetching sensor data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🌤️ Weather Monitoring Dashboard</h1>
        <p className="welcome-message">👋 Welcome! Check out the latest sensor data below.</p>
      </header>


      {lastValue && (
        <div className="sensor-container">
          <SensorCard data={lastValue} />
        </div>
      )}

 
      <div className="graph-container">
        <h3>📊 Sensor Trends</h3>
        <SensorGraph data={sensorData} />
      </div>

      {lastValue && (
        <div className="prediction-container">
          <h3>🔮 Next Hour Predictions</h3>
          <Prediction data={lastValue} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
