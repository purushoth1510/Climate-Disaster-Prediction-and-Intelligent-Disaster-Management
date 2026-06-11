import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";

import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>

      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;