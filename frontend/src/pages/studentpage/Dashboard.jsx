import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import SmallCard from './SmallCard';
import logo from "../../assets/Logo1.png"

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/applications');
        setApplications(response.data);
        setFilteredApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        if (error.response && error.response.status === 401) {
          toast.error("Session expired, please login");
          navigate("/auth/login");
        }
        setError('Failed to fetch applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  useEffect(() => {
    const filtered = applications.filter(application =>
      (application.internship && application.internship.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (application.student && application.student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (application.status && application.status.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredApplications(filtered);

    const suggestionList = applications.filter(application =>
      searchQuery &&
      ((application.internship && application.internship.title.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
      (application.student && application.student.name.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
      (application.status && application.status.toLowerCase().startsWith(searchQuery.toLowerCase())))
    ).slice(0, 5);
    setSuggestions(suggestionList);

  }, [searchQuery, applications]);

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  const getStatusData = () => {
    const statusCounts = applications.reduce((acc, application) => {
      acc[application.status] = (acc[application.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  };

  const getApplicationTrendsData = () => {
    const trends = applications.reduce((acc, application) => {
      const month = new Date(application.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(trends).map(month => ({
      month,
      applications: trends[month]
    }));
  };

  const statusData = getStatusData();
  const applicationTrendsData = getApplicationTrendsData();

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="loader">Loading...</div></div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className=" bg-gray-50">
      <div className="flex justify-between  items-center mb-6 border-b border-gray-300 pb-4 bg-white shadow-lg rounded-lg px-6">
        <div className='flex items-center'>
          <img src={logo} alt="Logo" className='w-20 h-20' />
          <Link to="/student" className="text-2xl font-bold text-blue-800 ml-4">Intern-Hub</Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back to Dashboard</h1>
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search title, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              &#x2715;
            </button>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => setSearchQuery(suggestion.internship.title || suggestion.student.name || suggestion.status)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.internship.title || suggestion.student.name || suggestion.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-8 gap-6">
        <SmallCard title="Total Applications" count={applications.length} icon="📄" />
        <SmallCard title="Accepted Applications" count={applications.filter(app => app.status === 'accepted').length} icon="✅" />
        <SmallCard title="Rejected Applications" count={applications.filter(app => app.status === 'rejected').length} icon="❌" />
        <SmallCard title="Pending Applications" count={applications.filter(app => app.status === 'pending').length} icon="⌛" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h5 className="text-xl font-semibold text-gray-800 mb-4">Application Trends</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h5 className="text-xl font-semibold text-gray-800 mb-4">Company Responses</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart >
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'accepted' ? '#82ca9d' : entry.name === 'rejected' ? '#ff7f7f' : '#ffd700'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mx-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Internship</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Portfolio URL</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {filteredApplications.map(application => (
              <tr key={application._id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{application.internship.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{application.student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{application.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{new Date(application.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">portfolioUrl</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;