import React, { useState, useEffect } from "react";


const Game = () => {
  const redColor = { backgroundColor: "#ff1e1e", boxShadow: "0 0 30px #ff1e1e" };
  const yellowColor = { backgroundColor: "#ffea00", boxShadow: "0 0 30px #ffea00" };
  const greenColor = { backgroundColor: "#00ff6a", boxShadow: "0 0 30px #00ff6a" };
  const offColor = { backgroundColor: "#222", boxShadow: "none" };

  const [red, setRed] = useState(offColor);
  const [yellow, setYellow] = useState(offColor);
  const [green, setGreen] = useState(offColor);
  const [currentLight, setCurrentLight] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem("highScore")) || 0);
  const [username] = useState(localStorage.getItem("username") || "Guest");
  const [showGameOver, setShowGameOver] = useState(false);

  // Random Light Generator
  const randomCol = () => {
    const lights = ["red", "yellow", "green"];
    const random = lights[Math.floor(Math.random() * lights.length)];
    setCurrentLight(random);

    // Reset all lights
    setRed(offColor);
    setYellow(offColor);
    setGreen(offColor);

    // Activate selected
    if (random === "red") setRed(redColor);
    if (random === "yellow") setYellow(yellowColor);
    if (random === "green") setGreen(greenColor);
  };

  // Looping the lights
  useEffect(() => {
    const timer = setInterval(randomCol, 400);
    return () => clearInterval(timer);
  }, []);

  // Handle button click
  const handleGoClick = () => {
    if (currentLight === "green") {
      // Correct timing
      setScore((prev) => prev + 1);
    } else {
      // Wrong timing — Game Over
      handleGameOver();
    }
  };

  // Game Over function
  const handleGameOver = () => {
    setShowGameOver(true);

    // Update High Score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }

    // Update Leaderboard
    if (score > 0) {
      const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
      const existing = stored.find((p) => p.name === username);

      if (existing) {
        if (score > existing.score) existing.score = score; // Update only if better
      } else {
        stored.push({ name: username, score });
      }

      const sorted = stored.sort((a, b) => b.score - a.score).slice(0, 10);
      localStorage.setItem("leaderboard", JSON.stringify(sorted));
    }
  };

  // Restart Game
  const handleRestart = () => {
    setShowGameOver(false);
    setScore(0);
  };

  return (
    <div className="game-section">
      <h1 >🚦 Reflex Test</h1>

      <div className="player-info">
        <p><strong>Player:</strong> {username}</p>
        <p><strong>Score:</strong> {score}</p>
        <p><strong>High Score:</strong> {highScore}</p>
      </div>

      <div className="traffic">
        <div className="light" style={red}></div>
        <div className="light" style={yellow}></div>
        <div className="light" style={green}></div>
      </div>

      <button className="go-btn pulse" onClick={handleGoClick}>Go</button>

      {showGameOver && (
        <div className="game-over-modal">
          <div className="game-over-box">
            <h2>💥 Game Over!</h2>
            <p>Your reflexes were too slow...</p>
            <p><strong>Final Score:</strong> {score}</p>
            <button onClick={handleRestart} className="restart-btn">🔁 Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
