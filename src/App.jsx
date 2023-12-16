import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Room from "./page/Room";
import Fingerprint from "./page/Fingerprint";
import Statistic from "./page/Statistic";
import History from "./page/History";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/room" element={<Room />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/fingerprint" element={<Fingerprint />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
