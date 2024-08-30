import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';

function Wheathertask() {
  const [City, setCity] = useState("");  
  const [search, setsearch] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [flagUrl, setFlagUrl] = useState(""); 
  const apikey = "b2b3df336f2787af0e9246e6d10d0a37";

  const getweather = useCallback(async () => {
    if (!City) return;
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}&units=metric`;
      const weatherResponse = await axios.get(weatherUrl);
      setWeather(weatherResponse.data);
      setError("");

      
      const countryCode = weatherResponse.data.sys.country.toLowerCase(); 
      const flagUrlResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      console.log('Flag Response:', flagUrlResponse.data); // Debugg
      if (flagUrlResponse.data && flagUrlResponse.data[0] && flagUrlResponse.data[0].flags) {
        setFlagUrl(flagUrlResponse.data[0].flags.png); 
      } else {
        setFlagUrl(""); 
        console.error("Flag URL not found");
      }
    } catch (error) {
      setWeather(null);
      setError("City not found or something went wrong.");
      setFlagUrl(""); 
      console.error("Error fetching weather or flag data:", error);
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

  const getIcon = (description) => {
    if (description.includes("rain")) return "bi bi-cloud-rain";
    if (description.includes("clear")) return "bi bi-sun";
    return null;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column:*/}
        <div className="col-md-6">
          <h5>Weather App</h5>
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
            <div>
              <h2>{weather.name}</h2>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Country: {weather.sys.country}</p>
              <div>
                <i className={getIcon(weather.weather[0].description)} style={{ fontSize: '4rem' }}></i>
              </div>
            </div>
          )}
        </div>

        {/* Flag */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          {flagUrl && (
            <img src={flagUrl} alt="Country Flag" style={{ width: '100%', maxWidth: '400px', height: 'auto' }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Wheathertask;
