// import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchField = () => {
  return (
    <div className='flex justify-center'>
    <div className="flex items-center border border-gray-300 rounded-2xl p-2 bg-white shadow-sm w-1/2" >
      <FaSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search interns..."
        className="flex-grow outline-none text-gray-700"
      />
      <button className="bg-blue-500 text-white px-4 py-1 rounded-lg ml-2 hover:bg-blue-600">
        Search
      </button>
    </div>
    </div>
  );
};

export default SearchField;
