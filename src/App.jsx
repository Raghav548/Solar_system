import React, { useState, useEffect, useRef } from "react";
import SolarSystem from "./SolarSystem.jsx";
import Controls from "./Controls.jsx";
import "./styles.css";

const App = () => {
  const [planets, setPlanets] = useState([
    {
      name: "Mercury",
      radius: 0.5,
      distance: 10,
      speed: 1,
      color: "gray",
      texture: "/textures/mercury.jpg", // Path to texture
    },
    {
      name: "Venus",
      radius: 0.8,
      distance: 15,
      speed: 0.8,
      color: "orange",
      texture: "/textures/venus.jpg",
    },
    {
      name: "Earth",
      radius: 1,
      distance: 20,
      speed: 0.6,
      color: "blue",
      texture: "/textures/earth.jpg",
    },
    {
      name: "Mars",
      radius: 0.7,
      distance: 25,
      speed: 0.5,
      color: "red",
      texture: "/textures/mars.jpg",
    },
    {
      name: "Jupiter",
      radius: 2,
      distance: 35,
      speed: 0.4,
      color: "brown",
      texture: "/textures/jupiter.jpg",
    },
    {
      name: "Saturn",
      radius: 1.8,
      distance: 45,
      speed: 0.3,
      color: "gold",
      texture: "/textures/saturn.jpg",
    },
    {
      name: "Uranus",
      radius: 1.5,
      distance: 55,
      speed: 0.2,
      color: "lightblue",
      texture: "/textures/uranus.jpg",
    },
    {
      name: "Neptune",
      radius: 1.4,
      distance: 65,
      speed: 0.1,
      color: "darkblue",
      texture: "/textures/neptune.jpg",
    },
  ]);

  const [showControls, setShowControls] = useState(false);
  const controlsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target)) {
        setShowControls(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="canvas-container">
        <SolarSystem planets={planets} />
      </div>
      <button
        className="toggle-button"
        onClick={() => setShowControls(!showControls)}
      >
        {showControls ? "Hide Controls" : "Show Controls"}
      </button>
      <div
        ref={controlsRef}
        className={`controls ${showControls ? "visible" : ""}`}
      >
        <Controls planets={planets} setPlanets={setPlanets} />
      </div>
    </div>
  );
};

export default App;