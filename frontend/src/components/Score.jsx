import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/score.css";

const Score = ({ score, total }) => {
  const navigate = useNavigate();
  return (
    <div className="score-container">
      <h1>Your Score: {score}/{total}</h1>
      <button onClick={() => navigate("/home", { replace: true })} className="btn">
        Go to Home Page!
      </button>
    </div>
  );
};

export default Score;
