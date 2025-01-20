import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900">
        <ul>
          <li className="text-white">
            <Link to="/">Accueil</Link>
          </li>
          <li className="text-white">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-white">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
