import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FaSun } from 'react-icons/fa';

const Navbar = ({ darkmode, setdarkmode }) => {
  return (
    <nav className="navbar navbar-expand-lg border border-black">
      <div className="container">
        <Link to="/" className="navbar-brand fs-2 fw-bold ">Weather App
           <FaSun className="text-warning me-1 m-2" /> {/* Weather icon */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link to="/" className="nav-link px-3 py-2 rounded  ">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/weather" className="nav-link px-3 py-2 rounded  ">Weather</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-decoration-none px-3 py-2 rounded">Contact</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-secondary ms-2 bg-black" onClick={() => setdarkmode(!darkmode)}>
                {darkmode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;