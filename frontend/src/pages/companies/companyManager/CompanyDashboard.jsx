/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import SmallCards from './SmallCards';
import logo from "../../../assets/Logo1.png"
import { useNavigate } from 'react-router';

const CompanyDashboard = () => {
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [allInternship,setAllInternship]=useState([])
  const [totalApplications,setTotalApplications]=useState(0)
  const [train,setTrain]=useState(0)
  const [testApplication,setTestApplication]=useState([])
  const [student,setStudent]=useState([])
  useEffect(() => {
  const getInternship = async () => {
  try {
  const response = await axios.get("http://localhost:5000/api/company/internship/my-internship");
  if (response.status === 200) {
   setAllInternship(response.data);
   countTotalApplications(response.data)
      } else {
        console.log("You cannot fetch the internships");
      }
    } catch (error) {
      console.error("An error occurred while fetching the internships:", error);
    }
  };

  getInternship();
}, []);

// console.log(allInternship)
const countTotalApplications = (internships) => {
  const allApplications = internships.flatMap(internship => internship.applications || []);
  setTrain(allApplications.length);
};
// console.log(train)
useEffect(() => {
  const fetchApplicationDetails = async () => {
    try {
      const applicationIds = allInternship?.flatMap(internship => internship.applications || []);
      const applicationDetails = await Promise.all(
        applicationIds.map(async (id) => {
          const response = await axios.get(`http://localhost:5000/api/company/application/${id}`);
          return response.data;
        })
      );
      setTestApplication(applicationDetails);
      setFilteredApplications(applicationDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching application details", error);
    }
  };
  fetchApplicationDetails();
}, [allInternship]);


// console.log(testApplication)
useEffect(() => {
  const fetchStudents = async () => {
    try {
      const studentIds = testApplication.map(application => application.student);
      //this are used inorder to remove duplicates.
      const uniqueStudentIds = [...new Set(studentIds)];
      const studentDetails = await Promise.all(
        uniqueStudentIds.map(async (id) => {
          const response = await axios.get(`http://localhost:5000/api/company/student/${id}`);
          return response.data;
        })
      );

      const studentMap = studentDetails.reduce((map, student) => {
        map[student._id] = student;
        return map;
      }, {});

      setStudent(studentMap);
    } catch (error) {
      console.error("Error fetching student details", error);
    }
  };
  fetchStudents();
}, [testApplication]);
console.log(student)


useEffect(() => {
// Calculate total number of applications whenever allInternship changes
const total = allInternship.reduce((acc, curr) => acc + curr.applications.length, 0);
setTotalApplications(total);
}, [allInternship]);

 

 
  const getStatusData = () => {
    const statusCounts = testApplication.reduce((acc, application) => {
      acc[application.status] = (acc[application.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  };

  const getApplicationTrendsData = () => {
    const trends = testApplication.reduce((acc, application) => {
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
    <div className="bg-gray-50 mt-20 ml-64">
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4 bg-whiterounded-lg px-6">
      
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back to Dashboard</h1>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-8 gap-6">
        <SmallCards title="Total Internships" count={allInternship.length} icon="📄" />
        <SmallCards title="Total Applications" count={train} />
        <SmallCards title="Accepted Applications" count={testApplication.filter(total=>total.status==="accepted").length} icon="✅" />
        <SmallCards title="Rejected Applications" count={testApplication.filter(total => total.status === 'rejected').length} icon="❌" />
        <SmallCards title="Pending Applications" count={testApplication.filter(total => total.status === 'pending').length} icon="⌛️" />

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
            <PieChart>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Resume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Portfolio URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date Applied</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
          {filteredApplications.map(application => {
            const studentDetail = student[application.student];
            return (
              <tr key={application._id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{studentDetail?.name || 'Unknown'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{application.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                <a href={`http://localhost:5000/${application.resume}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">view resume</a>

               </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">portfolioUrl</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{new Date(application.date).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>

        </table>
      </div>
    </div>
  );
};

export default CompanyDashboard