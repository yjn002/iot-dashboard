import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sensors, setSensors] = useState({
    temperature: 0,
    humidity: 0,
    gas: 0,
    light: 0,
    wind: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors({
        temperature: (Math.random() * 50).toFixed(2),
        humidity: (Math.random() * 100).toFixed(2),
        gas: (Math.random() * 400).toFixed(2),
        light: (Math.random() * 1000).toFixed(2),
        wind: (Math.random() * 65).toFixed(2)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        {/* HEADER */}
        <h1 className="App-link">
          Yagnesh's IoT Security Dashboard
        </h1>

        {/* SENSOR GRID */}
        <div className="sensor-grid">

          <div className="card">
            <h3>Temperature</h3>
            <p>{sensors.temperature} °C</p>
          </div>

          <div className="card">
            <h3>Humidity</h3>
            <p>{sensors.humidity} %</p>
          </div>

          <div className="card">
            <h3>Gas Level</h3>
            <p>{sensors.gas} PPM</p>
          </div>

          <div className="card">
            <h3>Light Intensity</h3>
            <p>{sensors.light} Lux</p>
          </div>

          {/* ✅ WIND SENSOR (DAY 3 EXTENSION) */}
          <div className="card wind-highlight">
            <h3>Wind Speed</h3>

            {/* WIND ANIMATION */}
            <div className="wind-box">
              <div className="wind-trace trace-1"></div>
              <div className="wind-trace trace-2"></div>
              <div className="wind-trace trace-3"></div>
            </div>

            <p>{sensors.wind} km/h</p>
          </div>

        </div>

      </header>
    </div>
  );
}

export default App;