import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  ResponsiveContainer, Scatter
} from "recharts";

export default function Analytics() {

  const [events, setEvents] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [trend, setTrend] = useState([]);
  const [anomalyData, setAnomalyData] = useState([]);

  const COLORS = ["#00c6ff", "#0072ff", "#ffc107", "#ff5252"];

  useEffect(() => {

    async function fetchData() {
      try {

        // 🌍 REAL-TIME EARTHQUAKE DATA
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        const data = await res.json();
        const quakes = data.features;

        setEvents(quakes);

        // 📊 MONTHLY SIMULATION
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        const monthly = months.map(m => ({
          month: m,
          cyclone: Math.floor(Math.random() * 30),
          flood: Math.floor(Math.random() * 35),
          quake: Math.floor(Math.random() * 20),
          fire: Math.floor(Math.random() * 25),
        }));

        setMonthlyData(monthly);

        // 🧩 EVENT DISTRIBUTION
        setDistribution([
          { name: "Cyclone", value: Math.floor(Math.random() * 100) },
          { name: "Flood", value: Math.floor(Math.random() * 200) },
          { name: "Earthquake", value: quakes.length },
          { name: "Wildfire", value: Math.floor(Math.random() * 120) },
        ]);

        // ⏱ 24H TREND
        const trendData = Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          risk: Math.floor(Math.random() * 100),
        }));

        setTrend(trendData);

        // 🧠 ANOMALY DETECTION (Z-SCORE)
        const values = trendData.map(d => d.risk);

        const mean = values.reduce((a, b) => a + b, 0) / values.length;

        const std = Math.sqrt(
          values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
        );

        const anomaly = trendData.map(d => {
          const z = (d.risk - mean) / std;
          return {
            ...d,
            anomaly: Math.abs(z) > 2 ? d.risk : null
          };
        });

        setAnomalyData(anomaly);

      } catch (err) {
        console.log("Error fetching data", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000); // 🔄 refresh

    return () => clearInterval(interval);

  }, []);

  // 📌 KPI VALUES
  const totalEvents = events.length;
  const avgResponse = (Math.random() * 5 + 2).toFixed(1);
  const falseRate = (Math.random() * 5).toFixed(1);

  return (
    <motion.div className="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <h1>📊 Real-Time Global Disaster Analytics</h1>

      {/* KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
        <div className="card">
          🌍 Total Events
          <h2>{totalEvents}</h2>
        </div>
        <div className="card">
          ⚡ Avg Response
          <h2>{avgResponse} min</h2>
        </div>
        <div className="card">
          ❗ False Rate
          <h2>{falseRate}%</h2>
        </div>
        <div className="card">
          🛡 Monitoring
          <h2>Global</h2>
        </div>
      </div>

      <br/>

      {/* ROW 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>

        {/* Monthly */}
        <div className="card">
          <h3>📅 Monthly Disaster Distribution</h3>
          <ResponsiveContainer height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cyclone" stackId="a" fill="#00c6ff" />
              <Bar dataKey="flood" stackId="a" fill="#0072ff" />
              <Bar dataKey="quake" stackId="a" fill="#ffc107" />
              <Bar dataKey="fire" stackId="a" fill="#ff5252" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="card">
          <h3>🌐 Event Distribution</h3>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie data={distribution} dataKey="value" innerRadius={60} outerRadius={100}>
                {distribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      <br/>

      {/* ROW 2 - TREND */}
      <div className="card">
        <h3>⏱ 24H Risk Trend</h3>
        <ResponsiveContainer height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line dataKey="risk" stroke="#00ff88" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <br/>

      {/* 🧠 ANOMALY GRAPH */}
      <div className="card">
        <h3>🧠 ML Anomaly Detection (Risk Spikes)</h3>

        <ResponsiveContainer height={300}>
          <LineChart data={anomalyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Normal */}
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#00c6ff"
              strokeWidth={2}
            />

            {/* Anomaly */}
            <Scatter
              dataKey="anomaly"
              fill="#ff0000"
              name="Anomaly"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </motion.div>
  );
}