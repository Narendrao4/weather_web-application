import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherSidebar = ({ darkmode, setSelectedCity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCityClick = (city) => {
    console.log(`City clicked: ${city}`);
    setSelectedCity(city); // Notify parent about the selected city
  };

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      {/* <button 
        className="btn btn-primary d-md-none" 
        onClick={toggleSidebar}
        style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1050 }}
      >
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button> */}
      <aside className={`weather-sidebar p-3 border-end border border-black ${isOpen ? 'open' : ''} ${darkmode ? 'bg-dark text-light' : 'bg-sky-300 text-dark'}`}>
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
    </>
  );
};

export default WeatherSidebar;
