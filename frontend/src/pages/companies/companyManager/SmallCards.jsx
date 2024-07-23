import React from 'react';

const SmallCards = ({ title, count, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between border border-blue-100">
      <div>
        <h2 className="text-xl font-bold text-gray-700">{title}</h2>
        <p className="text-2xl text-gray-800">{count}</p>
      </div>
      <div className="text-2xl text-blue-300">
        {icon}
      </div>
    </div>
  );
};

export default SmallCards;
