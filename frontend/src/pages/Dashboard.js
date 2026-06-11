import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import markerIcon from "leaflet/dist/images/marker-icon.png";

const OPENWEATHER_KEY = "f303a72f13827cf69ac6b9a04999f7da";

const cycloneIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [45, 65],
});

/* Heatmap Layer */
function HeatmapLayer() {
  const map = useMap();

  useEffect(() => {
    const heat = L.heatLayer(
      [
        [13.08, 80.27, 0.9],
        [19.07, 72.87, 0.7],
        [28.70, 77.10, 0.6],
        [22.57, 88.36, 0.5],
      ],
      { radius: 70, blur: 40 }
    );
    heat.addTo(map);
    return () => map.removeLayer(heat);
  }, [map]);

  return null;
}

export default function Dashboard() {
  const [mapMode, setMapMode] = useState("heat");
  const [alerts, setAlerts] = useState([]);
  const [positionIndex, setPositionIndex] = useState(0);
  const [globalStats, setGlobalStats] = useState({
  earthquakes: 0,
  floods: 0,
  cyclones: 0,
  wildfires: 0,
});

  const cyclonePath = [
    [13, 80],
    [13.5, 80.5],
    [14, 81],
    [14.5, 81.5],
    [15, 82],
  ];

  useEffect(() => {
    API.get("/alerts").then((res) => setAlerts(res.data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPositionIndex((i) => (i + 1) % cyclonePath.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
  async function fetchGlobalData() {
    try {
      const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      const data = await res.json();

      const earthquakes = data.features.length;
      const floods = Math.floor(Math.random() * 200);
      const cyclones = Math.floor(Math.random() * 50);
      const wildfires = Math.floor(Math.random() * 150);

      setGlobalStats({
        earthquakes,
        floods,
        cyclones,
        wildfires,
      });
    } catch (err) {
      console.log("Error fetching global data", err);
    }
  }

  fetchGlobalData();
  const interval = setInterval(fetchGlobalData, 10000);

  return () => clearInterval(interval);
}, []);

  const riskData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    count: Math.floor(Math.random() * 10),
  }));

  return (
    <div className="main">
  <h1>🌍 Disaster Monitoring Dashboard</h1>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "15px",
      marginBottom: "20px",
    }}
  >
    <div
      className="card"
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
      }}
    >
      🌍 Earthquakes
      <h2>{globalStats.earthquakes}</h2>
    </div>

    <div
      className="card"
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, #1a2980, #26d0ce)",
        color: "white",
      }}
    >
      🌊 Floods
      <h2>{globalStats.floods}</h2>
    </div>

    <div
      className="card"
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, #42275a, #734b6d)",
        color: "white",
      }}
    >
      🌪 Cyclones
      <h2>{globalStats.cyclones}</h2>
    </div>

    <div
      className="card"
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, #8e0e00, #1f1c18)",
        color: "white",
      }}
    >
      🔥 Wildfires
      <h2>{globalStats.wildfires}</h2>
    </div>
  </div>

  <div className="card" style={{ position: "relative" }}>
        {/* BUTTONS */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            display: "flex",
            gap: "8px",
          }}
        >
          <button onClick={() => setMapMode("heat")}>🔥 Heat</button>
          <button onClick={() => setMapMode("cyclone")}>🌪 Cyclone</button>
          <button onClick={() => setMapMode("wind")}>💨 Wind</button>
        </div>

        <MapContainer
          center={[20.59, 78.96]}
          zoom={5}
          style={{ height: "450px" }}
        >
          {/* 🔥 HEAT MODE */}
          {mapMode === "heat" && (
            <>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <HeatmapLayer />
            </>
          )}

          {/* 🌪 CYCLONE MODE */}
          {mapMode === "cyclone" && (
            <>
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              <Marker
                position={cyclonePath[positionIndex]}
                icon={cycloneIcon}
              >
                <Popup>🌪 Cyclone Moving</Popup>
              </Marker>
            </>
          )}

          {/* 💨 WIND MODE */}
          {mapMode === "wind" && (
            <>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <TileLayer
                url={`https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`}
                opacity={0.7}
              />
            </>
          )}

          {alerts.map((alert, i) => (
            <Marker key={i} position={[13 + i * 0.3, 80 + i * 0.3]}>
              <Popup>⚠ {alert}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3>📊 Risk Level Trends (24 Hours)</h3>
        <BarChart width={900} height={300} data={riskData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>
    </div>
  );
}