import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(stored);
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏁 Leaderboard</h1>
      <p className="leaderboard-subtitle">
        Names appear in the order they are added 👇
      </p>

      {leaderboard.length === 0 ? (
        <p className="no-scores">No players yet! Add your name.</p>
      ) : (
        <div className="leaderboard-list">
          {leaderboard.map((player, index) => (
            <div key={index} className="leaderboard-item">
              <div className="rank">#{index + 1}</div>
              <div className="player-name">{player.name}</div>
              <div className="player-score">{player.score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
