import { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from "recharts";

function Prediction() {

  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  async function run() {
    const res = await API.get(`/predict/${city}`);
    setData(res.data);
  }

  // Dummy 24H forecast (replace later with backend data)
  const forecastData = [
    { hour: "0:00", Cyclone: 35, Flood: 58, Earthquake: 12, Wildfire: 22 },
    { hour: "4:00", Cyclone: 70, Flood: 44, Earthquake: 10, Wildfire: 35 },
    { hour: "8:00", Cyclone: 60, Flood: 28, Earthquake: 15, Wildfire: 40 },
    { hour: "12:00", Cyclone: 12, Flood: 5, Earthquake: 18, Wildfire: 32 },
    { hour: "16:00", Cyclone: 5, Flood: 2, Earthquake: 10, Wildfire: 15 },
    { hour: "20:00", Cyclone: 55, Flood: 40, Earthquake: 9, Wildfire: 0 },
    { hour: "24:00", Cyclone: 70, Flood: 50, Earthquake: 18, Wildfire: 0 }
  ];

  // Dummy classification count
  const disasterStats = [
    { type: "Cyclone", count: 150 },
    { type: "Flood", count: 230 },
    { type: "Earthquake", count: 90 },
    { type: "Wildfire", count: 180 },
    { type: "Landslide", count: 20 },
    { type: "Drought", count: 65 }
  ];

  return (
    <motion.div
      className="main"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <h1>⚡ Disaster Prediction</h1>

      <div className="card">
        <input
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={run}>Predict</button>
      </div>

      {data && (
        <>
          <div className="card">
            <h3>🌍 Weather Data</h3>
            <p>🌡 Temperature: {data.weather.temperature} °C</p>
            <p>💧 Humidity: {data.weather.humidity} %</p>
            <p>🌪 Wind: {data.weather.wind} m/s</p>
            <p>🌧 Rain: {data.weather.rain} mm</p>

            <h2 style={{ marginTop: "15px" }}>
              {data.prediction}
            </h2>
          </div>

          {/* ================= CHARTS ================= */}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            {/* 24H Forecast */}
            <div className="card">
              <h3>📈 24-Hour Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Cyclone" />
                  <Line type="monotone" dataKey="Flood" />
                  <Line type="monotone" dataKey="Earthquake" />
                  <Line type="monotone" dataKey="Wildfire" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Disaster Classification */}
            <div className="card">
              <h3>📊 Disaster Classification (Last 30 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={disasterStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      )}

    </motion.div>
  );
}

export default Prediction;