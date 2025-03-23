import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const SensorGraph = ({ data }) => {

  const timeLabels = data.map((item) => new Date(item.timestamp).toLocaleTimeString());

  const createChartData = (label, values, color) => ({
    labels: timeLabels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: color,
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.2,
      },
    ],
  });

  return (
    <div className="graphs-container" style={{ marginTop: "20px" }}>
      <h3>📊 Sensor Data Visualization</h3>

      <div style={{ width: "80%", margin: "20px auto" }}>
        <h4>🌡️ Temperature (°C)</h4>
        <Line data={createChartData("Temperature", data.map((item) => item.temperature), "#FF6384")} />
      </div>

      <div style={{ width: "80%", margin: "20px auto" }}>
        <h4>💧 Humidity (%)</h4>
        <Line data={createChartData("Humidity", data.map((item) => item.humidity), "#36A2EB")} />
      </div>

      <div style={{ width: "80%", margin: "20px auto" }}>
        <h4>⚡ Light Intensity (lux)</h4>
        <Line data={createChartData("Light Intensity", data.map((item) => item.lightIntensity), "#FFCE56")} />
      </div>

      <div style={{ width: "80%", margin: "20px auto" }}>
        <h4>🌬️ Pressure (hPa)</h4>
        <Line data={createChartData("Pressure", data.map((item) => item.pressure), "#4BC0C0")} />
      </div>
    </div>
  );
};

export default SensorGraph;
