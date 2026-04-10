import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sensors, setSensors] = useState({
    temp: 0,
    humidity: 0,
    gas: 0,
    light: 0,
    wind: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors({
        temp: (Math.random() * 45).toFixed(1),
        humidity: (Math.random() * 100).toFixed(1),
        gas: (Math.random() * 300).toFixed(1),
        light: (Math.random() * 1000).toFixed(0),
        wind: (Math.random() * 55).toFixed(1)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Yagnesh's Digital Armour Dashboard</h1>
        <div className="sensor-grid">
          <div className="card">
            <h3>Temperature</h3>
            <div className="value">{sensors.temp}<span>°C</span></div>
          </div>
          <div className="card">
            <h3>Humidity</h3>
            <div className="value">{sensors.humidity}<span>%</span></div>
          </div>
          <div className="card">
            <h3>Gas Level</h3>
            <div className="value">{sensors.gas}<span>PPM</span></div>
          </div>
          <div className="card">
            <h3>Light Intensity</h3>
            <div className="value">{sensors.light}<span>Lux</span></div>
          </div>
          
          {/* THE FIFTH SENSOR WITH ANIMATION */}
          <div className="card wind-card">
            <h3>Wind Speed</h3>
            <div className="wind-visual">
              <div className="wind-line"></div>
              <div className="wind-line"></div>
              <div className="wind-line"></div>
            </div>
            <div className="value">{sensors.wind}<span>km/h</span></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;