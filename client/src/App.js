import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginType from "./pages/LoginType";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import PsychiatristLogin from "./pages/PsychiatristLogin";
import SetPassword from "./pages/SetPassword";
import Dashboard from "./pages/Dashboard";
import GeneralDiscussion from "./pages/GeneralDiscussion";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Login Type Selection */}
        <Route path="/login" element={<LoginType />} />

        {/* Login for different user types */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/psychiatrist" element={<PsychiatristLogin />} />
        <Route path="/login/user" element={<Login />} />

        {/* OAuth Callback */}
        <Route path="/callback" element={<Callback />} />

        {/* Set Password (after login user) */}
        <Route path="/set-password" element={isLoggedIn ? <SetPassword /> : <Navigate to="/login/user" />} />

        {/* Protected Routes - Requires login */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login/user" />} />
        <Route path="/general-discussion" element={isLoggedIn ? <GeneralDiscussion /> : <Navigate to="/login/user" />} />
        
        {/* Chat Room with optional groupId */}
        <Route path="/chatroom" element={isLoggedIn ? <ChatRoom /> : <Navigate to="/login/user" />} />
        <Route path="/chatroom/:groupId" element={isLoggedIn ? <ChatRoom /> : <Navigate to="/login/user" />} />

        {/* Fallback: redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
