import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Lottie from 'lottie-react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';

import rainAnimation from '../assests/animation/rain.json';
import sunnyAnimation from '../assests/animation/sunny.json';
import cloudyAnimation from '../assests/animation/cloudy.json';
import thunderstormAnimation from '../assests/animation/tunderstrom.json';

function Wheathertask({ selectedCity }) {
  const [City, setCity] = useState("");  
  const [search, setSearch] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [flagUrl, setFlagUrl] = useState(""); 
  const [countryInfo, setCountryInfo] = useState({});
  const apikey = "b2b3df336f2787af0e9246e6d10d0a37";

  const getWeather = useCallback(async () => {
    if (!City) return;
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}&units=metric`;
      const weatherResponse = await axios.get(weatherUrl);
      setWeather(weatherResponse.data);
      setError("");

      const countryCode = weatherResponse.data.sys.country.toLowerCase(); 
      const flagUrlResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      
      if (flagUrlResponse.data && flagUrlResponse.data[0]) {
        const countryData = flagUrlResponse.data[0];
        setFlagUrl(countryData.flags.png); 
        setCountryInfo({
          area: countryData.area || "N/A",
          population: countryData.population || "N/A",
          capital: countryData.capital ? countryData.capital[0] : "N/A",
          continents: countryData.continents ? countryData.continents.join(', ') : "N/A",
          languages: countryData.languages ? Object.values(countryData.languages).join(', ') : "N/A",
          timezones: countryData.timezones ? countryData.timezones.join(', ') : "N/A"
        });
      } else {
        setFlagUrl(""); 
        setCountryInfo({});
      }
    } catch (error) {
      setWeather(null);
      setError("❌ City not found or something went wrong.");
      setFlagUrl(""); 
      setCountryInfo({});
    } finally {
      setSearch(false);
    }
  }, [City, apikey]);

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
      setSearch(true);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (search) {
      getWeather();
    }
  }, [search, getWeather]);

  const getWeatherAnimation = (main) => {
    if (main.includes("rain")) return rainAnimation;
    if (main.includes("thunderstorm")) return thunderstormAnimation;
    if (main.includes("clear")) return sunnyAnimation;
    if (main.includes("cloud")) return cloudyAnimation;
    return null;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🌍 Search Any City Station to Get Weather + Country Info</h2>
      
      <div className="row">
        {/* Left Column: Search + Weather */}
        <div className="col-md-4 d-flex flex-column justify-content-between">
          <div className="mb-4">
            <label htmlFor="search" className="form-label">🔍 Search Location</label>
            <div className="input-group">
              <input
                type="search"
                name="search"
                id="search"
                onChange={(e) => setCity(e.target.value)}
                value={City}
                placeholder="Enter city name (e.g. London)"
                className="form-control"
              />
              <button className="btn btn-primary" onClick={() => setSearch(true)}>
                <i className="bi bi-search"></i>
              </button>
            </div>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>

          {weather && (
            <div className="d-flex flex-column gap-1 ps-2">
              <h4 className="fw-bold">{weather.name}</h4>
              <p>🌡 Temperature: {weather.main.temp}°C</p>
              <p>🌦 Weather: {weather.weather[0].description}</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
              <p>🏳️ Country: {weather.sys.country}</p>
              <p>🌧 Rain [1hr]: {weather.rain ? weather.rain['1h'] : "N/A"}</p>
            </div>
          )}
        </div>

        {/* Center Column: Animation */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          {weather ? (
            getWeatherAnimation(weather.weather[0].description) && (
              <Lottie
                animationData={getWeatherAnimation(weather.weather[0].description)}
                style={{ width: '12rem', height: 'auto' }}
              />
            )
          ) : (
            <div className="text-muted text-center">
              <p className="fw-light">Search for a Station to see weather animation</p>
              <i className="bi bi-cloud-sun" style={{ fontSize: '3rem' }}></i>
            </div>
          )}
        </div>

        {/* Right Column: Flag + Country Info */}
        <div className="col-md-4 text-center">
          {flagUrl && (
            <>
              <img
                src={flagUrl}
                alt="Country Flag"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '200px', border: '5px solid black', marginTop: '1rem' }}
              />
              <div className="mt-3">
                <p><strong>🗺 Area:</strong> {countryInfo.area} sq km</p>
                <p><strong>👥 Population:</strong> {countryInfo.population}</p>
                <p><strong>🏙 Capital:</strong> {countryInfo.capital}</p>
                <p><strong>🌐 Continent:</strong> {countryInfo.continents}</p>
                <p><strong> Languages:</strong> {countryInfo.languages}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wheathertask;
