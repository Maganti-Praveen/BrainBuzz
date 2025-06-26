import React from "react";
import "../css/navbar.css";
import { useNavigate, Link } from "react-router-dom";
import brainbuzzLogo from "../assets/brainbuzzlogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="Logo">
          <img src={brainbuzzLogo} alt="BrainBuzz Logo" className="logo-img" />
        </div>
        <ul>
          <li className="items"><Link to="/home">Home</Link></li>
          <li className="items"><Link to="/profile">Profile</Link></li>
          <li className="items"><Link to="/leaderboard">Leaderboard</Link></li>
          <li className="items"><Link to="/contact">Contact</Link></li>
        </ul>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
