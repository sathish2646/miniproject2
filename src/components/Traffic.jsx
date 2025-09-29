import React, { useState, useEffect } from "react";

const Traffic = () => {
  const redColor = { backgroundColor: "red" };
  const yellowColor = { backgroundColor: "yellow" };
  const greenColor = { backgroundColor: "green" };
  const offColor = { backgroundColor: "white" };

  const [red, setRed] = useState(offColor);
  const [yellow, setYellow] = useState(offColor);
  const [green, setGreen] = useState(offColor);
  const [currentLight, setCurrentLight] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // Prompt for username at start if not already saved
  useEffect(() => {
    if (!username) {
      const name = prompt("Enter your username:");
      if (name) {
        setUsername(name);
        localStorage.setItem("username", name);
      }
    }
  }, [username]);

  const randomCol = () => {
    const lights = ["red", "yellow", "green"];
    const random = lights[Math.floor(Math.random() * lights.length)];
    setCurrentLight(random);

    setRed(offColor);
    setYellow(offColor);
    setGreen(offColor);

    if (random === "red") setRed(redColor);
    if (random === "yellow") setYellow(yellowColor);
    if (random === "green") setGreen(greenColor);
  };

    useEffect(() => {
        
        const interval = setTimeout(() => {
            randomCol();
        }, 200);

         return () => clearInterval(interval);

    }, [randomCol]);

  const changeLight = () => {
    if (currentLight === "red") {
      alert("Game Over");
      if (correct > highScore) {
        setHighScore(correct);
        localStorage.setItem("highScore", correct);
      }
      setCorrect(0);
    }
    if (currentLight === "yellow") {
      alert("Almost There");
      if (correct > highScore) {
        setHighScore(correct);
        localStorage.setItem("highScore", correct);
      }
      setCorrect(0);
    }
    if (currentLight === "green") {
      setCorrect(correct + 1);
    }
  };

  return (
    <>
      <section style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Traffic Light Reflex</h1>
        <h2>How To Play?</h2>
        <p>
          Traffic light changes randomly (red, yellow, green). User must click
          "Go" only when green. Wrong click means game over.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label>
            Username:{" "}
            <input
              type="text"
              value={username}
              className="username-input"
              onChange={(e) => {
                setUsername(e.target.value);
                localStorage.setItem("username", e.target.value);
              }}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div
          className="traffic"
          style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
        >
          <div
            className="one"
            style={{ ...red, width: "50px", height: "50px" }}
          ></div>
          <div
            className="two"
            style={{ ...yellow, width: "50px", height: "50px" }}
          ></div>
          <div
            className="three"
            style={{ ...green, width: "50px", height: "50px" }}
          ></div>
        </div>

        <h2>{username ? `${username}'s Score: ${correct}` : `Score: ${correct}`}</h2>
        <h2>High Score: {highScore}</h2>

        <button
          onClick={changeLight}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Go
        </button>
      </section>
    </>
  );
};

export default Traffic;
