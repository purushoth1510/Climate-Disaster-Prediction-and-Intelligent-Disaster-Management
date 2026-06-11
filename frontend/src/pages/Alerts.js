import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [live, setLive] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    }

    load();

    let interval;
    if (live) {
      interval = setInterval(load, 10000);
    }

    return () => clearInterval(interval);
  }, [live]);

  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter((a) => a.severity === filter);

  const severityStyle = {
    critical: { color: "#ff4d4d", bg: "rgba(255,0,0,0.1)" },
    warning: { color: "#ffc107", bg: "rgba(255,193,7,0.1)" },
    info: { color: "#00c6ff", bg: "rgba(0,198,255,0.1)" },
    resolved: { color: "#4caf50", bg: "rgba(76,175,80,0.1)" },
  };

  return (
    <motion.div
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>🚨 Real-Time Alerts</h1>
          <p>Live disaster notifications from ML models</p>
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span style={{ color: live ? "#4caf50" : "#aaa" }}>
            ● {live ? "LIVE" : "PAUSED"}
          </span>

          <button onClick={() => setLive(!live)}>
            {live ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        {["all", "critical", "warning", "info", "resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? "#00c6ff" : "#222",
              color: "white",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ALERT CARDS */}
      {filteredAlerts.map((alert, i) => (
        <motion.div
          key={i}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="card"
          style={{
            borderLeft: `5px solid ${severityStyle[alert.severity].color}`,
            background: severityStyle[alert.severity].bg,
            marginBottom: "15px",
          }}
        >
          <h3 style={{ color: severityStyle[alert.severity].color }}>
            {alert.title}
          </h3>

          <p>{alert.message}</p>

          <div style={{ fontSize: "0.9rem", color: "#aaa" }}>
            📍 {alert.location} &nbsp;&nbsp;
            ⏱ {alert.time} &nbsp;&nbsp;
            🔗 {alert.source}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Alerts;