/* eslint-disable no-unused-vars */
import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        className={`px-3 py-1 border rounded mx-1 ${
          currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700'
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 border rounded ${
            number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          } mx-1`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
        className={`px-3 py-1 border rounded mx-1 ${
          currentPage === pageNumbers.length ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700'
        }`}
        disabled={currentPage === pageNumbers.length}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
