import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import "./App.css"

const App = () => {
  return (
    <Router>
      <nav className=".nav">
        <Link to="/" >Home</Link>
        <Link to="/game" >Game</Link>
        <Link to="/leaderboard" >Leaderboard</Link>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};


export default App;
