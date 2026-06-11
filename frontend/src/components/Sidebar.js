import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>AEGIS</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/prediction">Prediction</Link>
      <Link to="/alerts">Alerts</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/settings">Settings</Link>

    </div>
  );
}

export default Sidebar;