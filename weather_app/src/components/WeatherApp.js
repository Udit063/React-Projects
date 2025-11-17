import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "f266708715034173957193416251711";
  const BASE_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${cityName}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="city-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {loading && <div className="loading">Loading weather data...</div>}

      {error && (
        <div className="error">
          Error: {error}. Please check the city name and try again.
        </div>
      )}
      {weather && !loading && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys}
          </h2>
          <div className="weather-main">
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              className="weather-icon"
            />
            <div className="temperature">
              = {Math.round(weather.current.temp_c)}°C
            </div>
          </div>
          <div className="weather-details">
            <p className="weather-description">
              {weather.current.condition.text}
            </p>
            <div className="weather-stats">
              <div>Feels like: {weather.current.feelslike_c}°C</div>
              <div>Humidity: {weather.current.humidity}%</div>
              <div>Wind: {weather.current.wind_kph} kph</div>
              <div>Pressure: {weather.current.pressure_mb} hPa</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
