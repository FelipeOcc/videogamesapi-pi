import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import VideogameCreate from "./components/VideoGameCreate/VideoGameCreate";
import Details from "./components/Details/Details";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/videogame" element={<VideogameCreate />} />
          <Route path="/videogame/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
