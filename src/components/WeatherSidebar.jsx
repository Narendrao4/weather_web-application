import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherSidebar = ({ onSelectCity }) => {
  const handleCityClick = (city) => {
    const event = new CustomEvent('citySelected', { detail: city });
    document.dispatchEvent(event);
  };
  

  return (
    <aside className="weather-sidebar p-6 border-end">
      <h2 className="text-center mb-4">City List</h2>
      <ul className="city-list list-unstyled w-1">
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('New York')}>New York</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('London')}>London</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Tokyo')}>Tokyo</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Paris')}>Paris</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Sydney')}>Sydney</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Rome')}>Rome</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Berlin')}>Berlin</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Madrid')}>Madrid</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Dubai')}>Dubai</button></li>
        <li><button className="city-button btn btn-outline-primary w-100 mb-2" onClick={() => handleCityClick('Istanbul')}>Istanbul</button></li>
      </ul>
    </aside>
  );
};

export default WeatherSidebar;
