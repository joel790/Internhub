import { useState, useEffect } from "react";
import axios from "axios";

const RecentApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/recent-applications"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching recent applications:", error);
    }
  };

  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg p-5 h-auto">
      <div className="flex flex-col gap-1 mb-5">
        <span className="text-base font-medium text-[#212B36]">
          Recent Applications
        </span>
        <span className="text-xs text-[#637381]">
          List of recent internship applications
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F4F6F8]">
            <tr>
              {[
                "Student Name",
                "Internship Title",
                "Application Date",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-[#637381] uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.internshipTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.applicationDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentApplications;
