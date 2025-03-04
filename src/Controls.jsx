import React from "react";

const Controls = ({ planets, setPlanets }) => {
  const updatePlanetProperty = (index, property, value) => {
    const updatedPlanets = [...planets];
    updatedPlanets[index][property] = parseFloat(value);
    setPlanets(updatedPlanets);
  };

  return (
    <div>
      {planets.map((planet, index) => (
        <div key={index}>
          <h3>{planet.name}</h3>
          <label>Radius: </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={planet.radius}
            onChange={(e) => updatePlanetProperty(index, "radius", e.target.value)}
          />
          <label>Distance: </label>
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={planet.distance}
            onChange={(e) => updatePlanetProperty(index, "distance", e.target.value)}
          />
          <label>Speed: </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={planet.speed}
            onChange={(e) => updatePlanetProperty(index, "speed", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Controls;