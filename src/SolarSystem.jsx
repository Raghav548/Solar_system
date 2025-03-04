import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

// Planet component with textures
const Planet = ({ radius, distance, speed, color, texture }) => {
  const planetRef = useRef();

  // Load the texture
  const planetTexture = useLoader(THREE.TextureLoader, texture);

  // Animation for planet revolution
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    planetRef.current.position.x = Math.sin(elapsedTime * speed) * distance;
    planetRef.current.position.z = Math.cos(elapsedTime * speed) * distance;
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
};

// Sun component with texture
const Sun = () => {
  const sunTexture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");

  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial
        map={sunTexture}
        emissive="orange" // Glow color
        emissiveIntensity={1.5} // Glow intensity
      />
    </mesh>
  );
};

// Orbit component
const Orbit = ({ distance }) => {
  const points = [];
  const segments = 100;

  // Generate points for the orbit
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.sin(angle) * distance, 0, Math.cos(angle) * distance));
  }

  return (
    <Line
      points={points}
      color="white"
      lineWidth={1}
      transparent
      opacity={0.5}
    />
  );
};

// Main Solar System component
const SolarSystem = ({ planets }) => {
  const [showOrbits, setShowOrbits] = useState(false); // State to manage orbit visibility
  const [showProperties, setShowProperties] = useState(false); // State to manage properties panel visibility

  return (
    <>
      <Canvas
        style={{ width: "100%", height: "100vh" }}
        camera={{ position: [0, 50, 100], fov: 45 }}
      >
        <ambientLight intensity={6} />
        <pointLight position={[0, 0, 0]} intensity={1} />
        <Sun />
        {planets.map((planet, index) => (
          <React.Fragment key={index}>
            <Planet {...planet} />
            {showOrbits && <Orbit distance={planet.distance} />}
          </React.Fragment>
        ))}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
      </Canvas>

      {/* Buttons for toggling orbits and properties */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={() => setShowOrbits(!showOrbits)}
        >
          {showOrbits ? "Hide Orbits" : "Show Orbits"}
        </button>
        <button
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={() => setShowProperties(!showProperties)}
        >
          {showProperties ? "Hide Properties" : "Show Properties"}
        </button>
      </div>

      {/* Properties panel */}
      {showProperties && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 10,
            maxHeight: "80vh", // Set a maximum height
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <h3>Planet Properties</h3>
          {planets.map((planet, index) => (
            <div key={index}>
              <h4>{planet.name}</h4>
              <p>Radius: {planet.radius.toFixed(2)}</p>
              <p>Distance: {planet.distance.toFixed(2)}</p>
              <p>Speed: {planet.speed.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SolarSystem;