import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WeatherSidebar from './components/WeatherSidebar';
import Wheathertask from './components/wheathertask';
import Home from './components/Home';
import Contact from './components/contact';
import './App.css';  // Ensure this CSS file is imported
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const [darkmode, setdarkmode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelection = (city) => {
    setSelectedCity(city);
    console.log(`Selected city: ${city}`); // This should show the selected city in the console
  };

  return (
    <Router> 
      <div className={`App ${darkmode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Navbar darkmode={darkmode} setdarkmode={setdarkmode} />
        <div className="d-flex">
          <WeatherSidebar darkmode={darkmode} setSelectedCity={handleCitySelection} />
          <div className="content flex-grow-1">
            <Routes>
              <Route path="/weather_web-application" element={<Home darkmode={darkmode} />} />
              <Route path="/weather" element={<Wheathertask selectedCity={selectedCity} />} />
              <Route path="/contact" element={<Contact />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}  

export default App;
