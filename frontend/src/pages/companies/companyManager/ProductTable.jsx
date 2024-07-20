import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductTable = ({ internId }) => {
  // eslint-disable-next-line no-unused-vars
  const [studApply, setStudApply] = useState([]);

  // Dummy data for testing
  const sample = [
    { id: 1, name: "Gebeyehu", title: "Frontend", date: "2024-07-01", status: "pending" },
    { id: 2, name: "Hab", title: "Frontend", date: "2024-07-02", status: "pending" },
    { id: 3, name: "Gebesiryehu", title: "Frontend", date: "2024-07-03", status: "pending" },
    { id: 4, name: "Ader", title: "Frontend", date: "2024-07-04", status: "pending" },
    { id: 5, name: "Cha", title: "Frontend", date: "2024-07-05", status: "pending" },
    { id: 6, name: "Eyu", title: "Frontend", date: "2024-07-06", status: "pending" },
  ];

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

  const handleSubmit = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/company/application/${applicationId}/status`, { status: newStatus });
      if (response.status === 200) {
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
      <div className="w-full max-w-4xl overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internship Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sample.length > 0 ? sample.map((sam) => (
              <tr key={sam.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sam.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sam.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sam.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={sam.status}
                    onChange={(event) => handleSubmit(sam.id, event.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="approved">Approved</option>
                  </select>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;