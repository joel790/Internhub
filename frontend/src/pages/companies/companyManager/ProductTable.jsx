import { useState } from "react";

const ProductTable = () => {
  const sample = [
    {
      id: 1,
      name: "gebeyehu",
      title: "frontend",
      date: "23454",
      status: "pending",
    },
    {
      id: 2,
      name: "hab",
      title: "frontend",
      date: "23454",
      status: "pending",
    },
    {
      id: 3,
      name: "gebesiryehu",
      title: "frontend",
      date: "23454",
      status: "pending",
    },
    {
      id: 4,
      name: "ader",
      title: "frontend",
      date: "23454",
      status: "pending",
    },
    {
      id: 5,
      name: "cha",
      title: "frontend",
      date: "23454",
      status: "pending",
    },
    {
      id: 6,
      name: "eyu",
      title: "frontend",
      date: "23454",
      status: "pending",
    },
  ];

  const [status, setStatus] = useState("pending");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (status) => {
    if (status === "pending") {
      console.log("pending");
    } else if (status === "rejected") {
      console.log("rejected");
    } else if (status === "approved") {
      console.log("approved");
    } else {
      console.log("");
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
                    value={status}
                    name="status"
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option onClick={() => handleSubmit("pending")} value="pending">
                      pending
                    </option>
                    <option onClick={() => handleSubmit("rejected")} value="rejected">
                      rejected
                    </option>
                    <option onClick={() => handleSubmit("approved")} value="approved">
                      approved
                    </option>
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