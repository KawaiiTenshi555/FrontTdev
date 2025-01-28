import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import StockManagementPage from "./pages/StockManagement";
import UserManagementPage from "./pages/UserManagement";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Command from "./pages/Command";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="pt-20"></div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/StockManagement" element={<StockManagementPage />} />
        <Route path="/UserManagement" element={<UserManagementPage />} />
        <Route path="/KPI" element={<Dashboard />} />
        <Route path="/Command" element={<Command />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
