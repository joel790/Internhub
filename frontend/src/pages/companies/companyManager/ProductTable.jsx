import axios from "axios";
import { useEffect, useState } from "react";

const ProductTable = () => {
  const [studApply, setStudApply] = useState([]);
  // to get internshipid
  const internId = "123456";

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
  }, []);

  console.log(studApply);

  const sample = [
    { id: 1, name: "gebeyehu", title: "frontend", date: "23454", status: "pending" },
    { id: 2, name: "hab", title: "frontend", date: "23454", status: "pending" },
    { id: 3, name: "gebesiryehu", title: "frontend", date: "23454", status: "pending" },
    { id: 4, name: "ader", title: "frontend", date: "23454", status: "pending" },
    { id: 5, name: "cha", title: "frontend", date: "23454", status: "pending" },
    { id: 6, name: "eyu", title: "frontend", date: "23454", status: "pending" },
  ];

  const handleSubmit = async (applicationId, newStatus) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/company/application/${applicationId}/status`, { status: newStatus });
      if (response.status === 200) {
        console.log("You updated the status successfully");
      } else {
        console.log("There is something wrong");
      }
    } catch (error) {
      console.error("There is something error", error);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-4xl overflow-x-auto rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Internship Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Application Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sample.map((sam) => (
              <tr key={sam.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sam.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sam.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sam.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={sam.status}
                    name="status"
                    onChange={(event) => handleSubmit(sam.id, event.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">pending</option>
                    <option value="rejected">rejected</option>
                    <option value="approved">approved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;