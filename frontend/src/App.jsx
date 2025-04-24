import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/loginpage";
import AdminAuthForm from "./components/AdminAuthForm";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Quizepage from "./pages/quizpage";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateQuiz from './pages/AdminCreateQuiz';
import AdminRegisterForm from "./components/AdminRegisterForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(!!sessionStorage.getItem("adminToken"));

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!sessionStorage.getItem("token"));
      setIsAdminAuthenticated(!!sessionStorage.getItem("adminToken"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Auth & Dashboard */}
        <Route path="/admin/register" element={<AdminRegisterForm />} />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated
              ? <Navigate to="/admin/dashboard" replace />
              : <AdminAuthForm />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAdminAuthenticated
              ? <AdminDashboard />
              : <Navigate to="/admin" replace />
          }
        />
        <Route
          path="/admin/create-quiz"
          element={
            isAdminAuthenticated
              ? <AdminCreateQuiz />
              : <Navigate to="/admin" replace />
          }
        />
        <Route
          path="/admin/leaderboard"
          element={
            isAdminAuthenticated
              ? <Leaderboard />
              : <Navigate to="/admin" replace />
          }
        />

        {/* User Auth & App */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/home" replace />
              : <AuthForm setAuth={setIsAuthenticated} />
          }
        />
        <Route element={isAuthenticated ? <Layout /> : <Navigate to="/" replace />}>
          <Route path="home" element={<Home />} />
          <Route path="quiz/:category" element={<Quizepage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
