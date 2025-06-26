import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminName = sessionStorage.getItem("adminUsername") || "Admin";

  useEffect(() => {
    if (!sessionStorage.getItem("adminToken")) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button> {/* Added logout button up top */}
      </header>
      <h2 className="admin-welcome">welcome {adminName}!</h2> {/* Trying to match the image style */}
      <div className="admin-actions">
        <button
          className="admin-button"
          onClick={() => navigate("/admin/create-quiz")}
        >
          Add Questions
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/leaderboard")}
        >
          LeaderBoard
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
