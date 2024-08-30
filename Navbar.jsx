import React from 'react';
import { Link } from 'react-router-dom';
import Darktheme from './darktheme';  

const Navbar = ({ darkmode, setdarkmode }) => {
  return (
    <nav className={`navbar navbar-expand-lg p-3`}>
      <div className="container">
        <Link to="/" className="navbar-brand">Weather App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/weather" className="nav-link">Weather</Link>
            </li>
            <li className="nav-item">
              <Darktheme darkmode={darkmode} setdarkmode={setdarkmode} />
            </li>
           
          </ul>
        </div>
      </div>
      </nav>
      
  
  );
};

export default Navbar;
