import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto mt-8 p-2 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-blue-800 mb-4">Contact Information</h2>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Email:</span> 
        <a href=" mailto:sandranarendra279@gmail.com" className="text-blue-500 hover:underline ml-2"> sandranarendra279@gmail.com </a>
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Phone:</span> 
        <a href=" tel: +919666535891" className="text-blue-500 hover:underline ml-2"> +91 9666535891</a>
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Media:</span> 
        <a href="https://www.instagram.com/they_callme_natural/" className="text-gray-950 hover:underline ml-2"> Instagram</a>
      </p>
    </div>
  );
};

export default Contact;
