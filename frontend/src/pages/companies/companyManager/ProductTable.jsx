/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const ProductTable = ({ internId }) => {
  const [studApply, setStudApply] = useState([]);
  const [internship, setInternship] = useState(null);


  
  useEffect(() => {
    const getStudentApply = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/company/internship/${internId}/applications`);
        if (response.status === 200) {
          setStudApply(response.data);
        } else {
          console.log("There is something wrong when fetching");
        }
      } catch (error) {
        console.error("You cannot get the student apply for internships", error);
      }
    };
    
    getStudentApply();
  }, [internId]);

  useEffect(() => {
    const getInternshipbyId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/company/internships/${internId}`);
        if (response.status === 200) {
          setInternship(response.data);
        } else {
          console.log("There is something wrong when fetching");
        }
      } catch (error) {
        console.error("There is an error when you fetch", error);
      }
    };

    getInternshipbyId();
  }, [internId]);

  
  const handleSubmit = async (applicationId, newStatus) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/company/application/${applicationId}/status`, { status: newStatus });
        if (response.status === 200) {
            setStudApply(prevStudApply => 
                prevStudApply.map(stud => 
                    stud._id === applicationId ? { ...stud, status: newStatus } : stud
                )
            );
            console.log("You updated the status successfully");
        } else {
            console.log("There is something wrong");
        }
    } catch (error) {
        console.error("There is an error", error);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internship Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studApply.length > 0 ? studApply.map((stud) => (
              <tr key={stud._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{internship ? internship.title : 'Loading...'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stud.student}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(stud.date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={stud.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={stud.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Portfolio
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={stud.status}
                    onChange={(event) => handleSubmit(stud._id, event.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">{stud.status}</option>
                    <option value="rejected">rejected</option>
                    <option value="accepted">accepted</option>
                  </select>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;