import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(sessionStorage.getItem("username") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = e => {
    e.preventDefault();
    sessionStorage.setItem("username", name);
    sessionStorage.setItem("email", email);
    setMessage("Profile updated successfully!");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-picture">
        <img src="https://via.placeholder.com/150" alt="Profile" />
        <button className="update-picture-btn">Update Picture</button>
      </div>
      <form onSubmit={handleUpdate} className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Update Password:</label>
          <input type="password" placeholder="New Password" value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn">Update Profile</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="badge-section">
        <h3>Badge (Surprise)</h3>
        <div className="badge">🎖️</div>
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
