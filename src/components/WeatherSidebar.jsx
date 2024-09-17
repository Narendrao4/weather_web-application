import React from 'react';  // Remove useState import since it's no longer needed
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherSidebar = ({ darkmode, setSelectedCity }) => {
  const navigate = useNavigate();  // Create navigate function

  const handleCityClick = (city) => {
    console.log(`City clicked: ${city}`);
    setSelectedCity(city); // Notify parent about the selected city
    navigate('/weather');  // Navigate to /weather after selecting the city
  };

  return (
    <aside className={`weather-sidebar p-3 border-end border border-black ${darkmode ? 'bg-dark text-light' : 'bg-sky-300 text-dark'}`}>
      <h2 className="text-center mb-4">City List</h2>
      <ul className="city-list list-unstyled">
        {['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Rome', 'Berlin', 'Madrid', 'Dubai', 'Istanbul'].map(city => (
          <li key={city}>
            <button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick(city)}>
              {city}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default WeatherSidebar;
