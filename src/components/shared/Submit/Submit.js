import React from 'react';
import './style.css';
const Submit = () => {
  return (
    <div className="bg-gray-800 loading w-full h-screen flex justify-center items-center">
      <div className="circ">
        <div className="load">Loading . . . </div>
        <div className="hands" />
        <div className="body" />
        <div className="head">
          <div className="eye" />
        </div>
      </div>
    </div>
  );
};

export default Submit;
