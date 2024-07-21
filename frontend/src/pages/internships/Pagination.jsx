import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
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
    </div>
  );
};

export default Pagination;