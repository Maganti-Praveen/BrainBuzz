import React, { useState, useEffect } from "react";
import API from "../api";
import "../css/leaderboard.css";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("leaderboard")
      .then(res => { setData(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr><th>Rank</th><th>Name</th><th>Score</th></tr>
          </thead>
          <tbody>
            {data.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td><td>{e.name}</td><td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
