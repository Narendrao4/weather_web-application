import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Lottie from 'lottie-react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Lottie JSON files
import rainAnimation from '../assests/animation/rain.json';
import sunnyAnimation from '../assests/animation/sunny.json';
import cloudyAnimation from '../assests/animation/cloudy.json';
import tunderstrom from '../assests/animation/tunderstrom.json'

function Wheathertask() {
  const [City, setCity] = useState("");  
  const [search, setsearch] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [flagUrl, setFlagUrl] = useState(""); 
  const [countryInfo, setCountryInfo] = useState({});
  const apikey = "b2b3df336f2787af0e9246e6d10d0a37";

  const getweather = useCallback(async () => {
    if (!City) return;
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}&units=metric`;
      const weatherResponse = await axios.get(weatherUrl);
      console.log(weatherResponse.data);  
      setWeather(weatherResponse.data);
      setError("");

      const countryCode = weatherResponse.data.sys.country.toLowerCase(); 
      const flagUrlResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      console.log(flagUrlResponse.data);
      
      
      if (flagUrlResponse.data && flagUrlResponse.data[0]) {
        const countryData = flagUrlResponse.data[0];
        setFlagUrl(countryData.flags.png); 
        setCountryInfo({
          area: countryData.area || "N/A",
          population: countryData.population || "N/A",
          capital: countryData.capital ? countryData.capital[0] : "N/A",
          continents: countryData.continents ? countryData.continents.join(', ') : "N/A",
          languages: countryData.languages ? Object.values(countryData.languages).join(', ') : "N/A",
          timezones: countryData.timezones[0] ? countryData.timezones.join(', ') : "N/A"
        });
      } else {
        setFlagUrl(""); 
        setCountryInfo({});
      }
    } catch (error) {
      setWeather(null);
      setError("City not found or something went wrong.");
      setFlagUrl(""); 
      setCountryInfo({});
    } finally {
      setsearch(false);
    }
  }, [City, apikey]);

  useEffect(() => {
    if (search) {
      getweather();
    }
  }, [search, getweather]);

  useEffect(() => {
    const handleCitySelect = (event) => {
      setCity(event.detail); 
      setsearch(true); 
    };

    document.addEventListener('citySelected', handleCitySelect);

    return () => {
      document.removeEventListener('citySelected', handleCitySelect);
    };
  }, []);

  const getWeatherAnimation = (main) => {
    if (main.includes("rain")) return rainAnimation;
    if (main.includes("thunderstorm")) return tunderstrom;
    if (main.includes("clear")) return sunnyAnimation;
    if (main.includes("cloud")) return cloudyAnimation;
    return null; // Fallback
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column: Weather Info */}
        <div className="col-md-6">
          <h5 style={{fontStyle: 'oblique', fontWeight:'revert-layer'}}>Search Location</h5>
          <div className="mb-3">
            <input
              type="search"
              name="search"
              id="search"
              onChange={(e) => setCity(e.target.value)}
              value={City}
              placeholder="Enter city"
              className="form-control"
            />
            <button
              className="btn btn-primary mt-3"
              onClick={() => setsearch(true)}
            >
              Search
            </button>
          </div>
          {error && <p>{error}</p>}
          {weather && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, display: "flex", gap: "40px" }}>
                <div style={{ fontStyle: 'oblique', fontWeight: 'bold' }}>
                  <h2>{weather.name}</h2>
                  <h2>Temperature: {weather.main.temp}°C</h2>
                  <p>Weather: {weather.weather[0].description}</p>
                  <p>Humidity: {weather.main.humidity}%</p>
                  <p>Wind Speed: {weather.wind.speed} m/s</p>
                  <p>Country: {weather.sys.country}</p>
                  <p>Rain [1hr]: {weather.rain ? weather.rain['1h'] : "N/A"}</p>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                  {getWeatherAnimation(weather.weather[0].description) && (
                    <Lottie
                      animationData={getWeatherAnimation(weather.weather[0].description)}
                      style={{ width: '12rem', height: 'auto' }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Country Info */}
        {flagUrl && (
          <div className="col-md-6">
            <img
              src={flagUrl}
              alt="Country Flag"
              style={{
                width: '50%',
                maxWidth: '400px',
                height: 'auto',
                border: '5px solid black',
                margin: '40px 200px'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, paddingLeft: '5px', fontStyle: 'italic', fontWeight: 'bold',margin:'20px 100px' }}>
                <p>Area: {countryInfo.area} sq km</p>
                <p>Population: {countryInfo.population}</p>
                <p>Capital: {countryInfo.capital}</p>
                <p>Continent: {countryInfo.continents}</p>
                <p>Language: {countryInfo.languages}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wheathertask;
