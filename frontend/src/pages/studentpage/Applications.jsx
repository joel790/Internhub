import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to fetch applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead className='bg-gray-200'>
            <tr>
              <th className="py-2 px-4 border-b">Internship Title</th>
              <th className="py-2 px-4 border-b">Company</th>
              <th className="py-2 px-4 border-b">Cover Letter</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Resume</th>
              <th className="py-2 px-4 border-b">Portfolio URL</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="py-2 px-4 border-b">{application.internship.title}</td>
                <td className="py-2 px-4 border-b">{application.internship.company}</td>
                <td className="py-2 px-4 border-b">{application.coverLetter}</td>
                <td className="py-2 px-4 border-b">{application.status}</td>
                <td className="py-2 px-4 border-b">
                  <a href={`/${application.resume}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Resume
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Portfolio
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Applications;
