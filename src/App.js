import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sensors, setSensors] = useState({
    temp: 0, humidity: 0, gas: 0, light: 0, wind: 0 
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors({
        temp: (Math.random() * 50).toFixed(1),
        humidity: (Math.random() * 100).toFixed(1),
        gas: (Math.random() * 300).toFixed(1),
        light: (Math.random() * 1000).toFixed(0),
        wind: (Math.random() * 45).toFixed(1) // 5th Sensor: Wind Speed
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* PROFESSOR REQUIREMENT: Your Name in the Title */}
        <h1>Yagnesh's IoT Security Dashboard</h1>
        <div className="sensor-grid">
          <div className="card"><h3>Temperature</h3><p>{sensors.temp}°C</p></div>
          <div className="card"><h3>Humidity</h3><p>{sensors.humidity}%</p></div>
          <div className="card"><h3>Gas Level</h3><p>{sensors.gas} PPM</p></div>
          <div className="card"><h3>Light</h3><p>{sensors.light} Lux</p></div>
          <div className="card" style={{border: '2px solid #61dafb'}}>
            <h3>Wind Speed</h3>
            <p>{sensors.wind} m/s</p>
          </div>
        </div>
      </header>
    </div>
  );
}
export default App;