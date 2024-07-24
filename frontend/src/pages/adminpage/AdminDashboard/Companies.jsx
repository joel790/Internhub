import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import ViewCompany from "./ViewCompany";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, [statusFilter]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/companies");
      if (response.data.companies && Array.isArray(response.data.companies)) {
        setCompanies(response.data.companies);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching companies", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/companies/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error("Error deleting company", error);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/companies/${id}`);
      setSelectedCompany(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching company details", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCompany(null);
  };

  const getStatus = (status) => {
    if (status === "approved") return "inactive"; // All companies are marked inactive by default
    if (status === "rejected" || status === "pending") return "inactive";
    return "unknown";
  };

  const filteredCompanies = companies.filter((company) => {
    if (statusFilter === "all") return true;
    const status = getStatus(company.companyDetails?.status);
    return status === statusFilter;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Companies</h1>
        <select
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
        <thead>
          <tr className="bg-blue-500">
            <th className="py-3 px-4 border-b font-medium text-white font-serif">Company Name</th>
            <th className="py-3 px-4 border-b font-medium text-white font-serif">Contact</th>
            <th className="py-3 px-4 border-b font-medium text-white font-serif">Internships Posted</th>
            <th className="py-3 px-4 border-b font-medium text-white font-serif">Subscription Plan</th>
            <th className="py-3 px-4 border-b font-medium text-white font-serif">Status</th>
            <th className="py-3 px-4 border-b font-medium text-white font-serif">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <tr key={company._id}>
                <td className="py-2 border-b">{company.companyDetails?.name || 'N/A'}</td>
                <td className="py-2 border-b">{company.phone}</td>
                <td className="py-2 border-b">
                  {company.companyDetails?.internships?.length > 0 ? (
                    company.companyDetails.internships.map(internship => (
                      <div key={internship._id}>{internship.title}</div>
                    ))
                  ) : (
                    'No internships'
                  )}
                </td>
                <td className="py-3 px-4 border-b text-gray-700">
                  {company.companyDetails?.subscriptionPlan ? company.companyDetails.subscriptionPlan.type : 'N/A'}
                </td>
                <td className="py-3 px-4 border-b text-gray-700">
                  {getStatus(company.companyDetails?.status)}
                </td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button
                    className="p-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleView(company._id)}
                  >
                    View
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleDelete(company._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-3 px-4 text-center border-b text-gray-500">
                No companies available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalIsOpen && selectedCompany && (
        <ViewCompany companyDetail={selectedCompany.companyDetails} onClose={closeModal} />
      )}
    </div>
  );
};

export default Companies;
