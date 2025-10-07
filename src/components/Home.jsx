import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(stored);
  }, []);

  const handleAddName = () => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    let stored = JSON.parse(localStorage.getItem("leaderboard")) || [];

    stored.push({ name: name, score: 0 }); // Append name only
    localStorage.setItem("leaderboard", JSON.stringify(stored));
    setLeaderboard(stored);
    setName(""); // Clear input
  };

  const handleStart = () => {
    if (name.trim() !== "") {
      handleAddName();
    }
    if (leaderboard.length === 0) {
      alert("Enter your name first!");
      return;
    }
    localStorage.setItem("username", name || leaderboard[0].name);
    navigate("/game");
  };

  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="game-title">🚦 Traffic Reflex Challenge</h1>
        <p className="tagline">
          Think fast. React faster. Don’t get caught by red! 
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
          required
        />
        <button className="play-btn" onClick={handleAddName}>
           Add to Leaderboard
        </button> <br />
        <button className="play-btn" onClick={handleStart}>
           Start Game
        </button>
          <section className="info-section">
        <h2>How to Play 🎮</h2>
        <div className="rules-grid">
          <div className="rule-card">
            <h3>🟢 Green Light</h3>
            <p>Click <b>Go</b> quickly when you see green! Earn 1 point.</p>
          </div>
          <div className="rule-card">
            <h3>🟡 Yellow Light</h3>
            <p>Be careful! Yellow means “get ready.” Don’t click yet!</p>
          </div>
          <div className="rule-card">
            <h3>🔴 Red Light</h3>
            <p>Clicking on red ends the game instantly. Game Over!</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;
