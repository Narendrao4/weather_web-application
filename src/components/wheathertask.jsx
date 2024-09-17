import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Lottie from 'lottie-react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Lottie JSON files
import rainAnimation from '../assests/animation/rain.json';
import sunnyAnimation from '../assests/animation/sunny.json';
import cloudyAnimation from '../assests/animation/cloudy.json';
import thunderstormAnimation from '../assests/animation/tunderstrom.json'; // Corrected filename

function Wheathertask({ selectedCity }) {

  console.log(`Selected city in Wheathertask: ${selectedCity}`);
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
    return null; // Fallback
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column: Weather Info */}
        <div className="col-md-4 d-flex flex-column justify-content-between">
          <div>
            <h5 className="font-italic font-weight-bold">Search Location</h5>
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
                onClick={() => setSearch(true)}
              >
                Search
              </button>
            </div>
            {error && <p>{error}</p>}
          </div>
          {weather && (
            <div className="d-flex flex-column gap-1" style={{marginLeft:"20px"}}>
              <h2>{weather.name}</h2>
              <h2>Temperature: {weather.main.temp}°C</h2>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Country: {weather.sys.country}</p>
              <p>Rain [1hr]: {weather.rain ? weather.rain['1h'] : "N/A"}</p>
            </div>
          )}
        </div>

        {/* Center Column: Animation */}
        {weather && (
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            {getWeatherAnimation(weather.weather[0].description) && (
              <Lottie
                animationData={getWeatherAnimation(weather.weather[0].description)}
                style={{ width: '12rem', height: 'auto' }}
              />
            )}
          </div>
        )}

        {/* Right Column: Country Info */}
        {flagUrl && (
          <div className="col-md-4 d-flex flex-column justify-content-between align-items-center">
            <img
              src={flagUrl}
              alt="Country Flag"
              className="img-fluid rounded"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                border: '5px solid black',
                marginTop:'2rem'
              }}
            />
            <div className="mt-2 text-center">
              <p className="font-italic font-weight-bold">Area: {countryInfo.area} sq km</p>
              <p className="font-italic font-weight-bold">Population: {countryInfo.population}</p>
              <p className="font-italic font-weight-bold">Capital: {countryInfo.capital}</p>
              <p className="font-italic font-weight-bold">Continent: {countryInfo.continents}</p>
              <p className="font-italic font-weight-bold">Languages: {countryInfo.languages}</p>
              {/* <p className="font-italic font-weight-bold">Timezones: {countryInfo.timezones}</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wheathertask;
