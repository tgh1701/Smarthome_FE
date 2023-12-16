import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Room from "./page/Room";
import Fingerprint from "./page/Fingerprint";
import Statistic from "./page/Statistic";
import History from "./page/History";
import "./App.css";
import Login from "./page/Login";
import Signup from "./page/Signup";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("isLoggedIn"));
  console.log(currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/room"
          element={currentUser ? <Room /> : <Navigate to="/login" />}
        />
        <Route
          path="/statistic"
          element={currentUser ? <Statistic /> : <Navigate to="/login" />}
        />
        <Route
          path="/fingerprint"
          element={currentUser ? <Fingerprint /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={currentUser ? <History /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
