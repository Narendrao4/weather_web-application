import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { Link } from 'react-router-dom'; // Import Link for navigation

const Home = ({ darkmode }) => {
  return (
    <div className="position-relative w-100" style={{ height: '100vh' }}>
      <img
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        src="https://cdn.pixabay.com/photo/2016/03/31/15/22/clouds-1293230_1280.png"
        alt="Cover"
        style={{ objectFit: 'cover' }} // Ensure the image covers the container
      />
      <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ zIndex: 1 }}>
        <h1 className={darkmode ? 'text-light' : 'text-dark'}>Weather Report</h1>
      </div>
      <footer className={`position-absolute bottom-0 w-100 p-3 text-center ${darkmode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Link to="/contact" className={`text-decoration-none ${darkmode ? 'text-light' : 'text-dark'}`}>Contact Information</Link>
      </footer>
    </div>
  );
};

export default Home;
