// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
const navigate = useNavigate();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        if (error.response && error.response.status === 401) {
          toast.error("session expired please login")
          navigate("/auth/login")
        }
        setError('Failed to fetch applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sortedApplications = [...applications].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setApplications(sortedApplications);
  };
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => paginate(number)}
        className={`px-3 py-1 border rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} mx-1`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer" onClick={() => handleSort('internship.title')}>Internship Title</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer" onClick={() => handleSort('internship.company')}>Company</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Cover Letter</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Resume</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Portfolio URL</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{application.internship.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{application.internship.company}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{application.coverLetter}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{application.status}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <a href={`/${application.resume}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View Resume
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View Portfolio
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-3 py-1 border rounded bg-white text-gray-700 mx-1"
              >
                &lt;
              </button>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-3 py-1 border rounded bg-white text-gray-700 mx-1"
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;