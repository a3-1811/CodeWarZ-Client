import React from 'react';
import './style.css';
const Loading = () => {
  return (
    <div className="bg-gray-800 loading w-full h-screen flex justify-center items-center">
      <div className="container-loading">
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
