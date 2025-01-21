import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import StockManagementPage from "./pages/StockManagement";
import UserManagementPage from "./pages/UserManagement";
import Header from "./pages/Header";

export default function App() {
  return (
    <Router>
      <Header/>
      <div className="pt-20"></div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/StockManagement" element={<StockManagementPage />} />
        <Route path="/UserManagement" element={<UserManagementPage />} />
      </Routes>
    </Router>
  );
}
