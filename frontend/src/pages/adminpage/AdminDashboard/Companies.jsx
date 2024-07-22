// src/components/AdminDashboard/Companies.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const staticData = [
    {
      _id: "1",
      companyName: "Tech Innovators",
      contact: "info@techinnovators.com",
      internshipsPosted: 5,
      status: "active",
    },
    {
      _id: "2",
      companyName: "Green Solutions",
      contact: "contact@greensolutions.com",
      internshipsPosted: 2,
      status: "inactive",
    },
  ];

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`/api/admin/companies`);
      if (response.data.companies && Array.isArray(response.data.companies)) {
        setCompanies(response.data.companies);
      } else {
        console.error("Invalid response format");
        setCompanies(staticData);
      }
    } catch (error) {
      console.error("Error fetching companies", error);
      setCompanies(staticData);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/companies/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error("Error deleting company", error);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border-b">Company Name</th>
            <th className="py-2 border-b">Contact</th>
            <th className="py-2 border-b">Internships Posted</th>
            <th className="py-2 border-b">Status</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company._id}>
                <td className="py-2 border-b">{company.companyName}</td>
                <td className="py-2 border-b">{company.contact}</td>
                <td className="py-2 border-b">{company.internshipsPosted}</td>
                <td className="py-2 border-b">{company.status}</td>
                <td className="py-2 border-b">
                  <button
                    className="p-2 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(company._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 text-center border-b">
                No companies available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;
