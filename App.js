import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './wheatherapp/Navbar';
import WeatherSidebar from './wheatherapp/WeatherSidebar';
import Wheathertask from './wheatherapp/wheathertask';
import './App.css';


const App = () => {
  const [darkmode, setdarkmode] = useState(false);

  const handleSelectCity = (selectedCity) => {
    // Pass the selected city to Wheathertask
    document.dispatchEvent(new CustomEvent('citySelected', { detail: selectedCity }));
  };

  return (
    <Router> 
      <div className={`App ${darkmode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
          <Navbar darkmode={darkmode} setdarkmode={setdarkmode} />
          <div className="main-content flex">
            <WeatherSidebar onSelectCity={handleSelectCity} />
            <div className="content">
              <Routes>
                <Route path="/weather" element={<Wheathertask />} />    
              </Routes>
            </div>
          </div>
        </div>
    </Router>
  );
};

export default App;
