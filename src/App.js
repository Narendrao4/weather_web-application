import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WeatherSidebar from './components/WeatherSidebar';
import Wheathertask from './components/wheathertask';
import Home from './components/Home';
import Contact from './components/contact';
import './App.css';

const App = () => {
  const [darkmode, setdarkmode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelection = (city) => {
    setSelectedCity(city);
    console.log(`Selected city: ${city}`);
  };

  return (
    <Router> 
      <div className={`App ${darkmode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Navbar darkmode={darkmode} setdarkmode={setdarkmode} />
        <div className="main-content flex">
          <WeatherSidebar onSelectCity={handleCitySelection} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home darkmode={darkmode} />} />
              <Route path="/weather" element={<Wheathertask selectedCity={selectedCity} />} />
              <Route path="/contact" element={<Contact />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
