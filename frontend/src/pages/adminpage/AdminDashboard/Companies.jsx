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
      const response = await axios.get(`http://localhost:5000/api/admin/companies`);
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
    if (status === "approved") return "active";
    if (status === "rejected" || status === "pending") return "inactive";
    return "unknown";
  };

  const filteredCompanies = companies.filter((company) => {
    if (statusFilter === "all") return true;
    const status = getStatus(company.companyDetails?.status);
    return status === statusFilter;
  });

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
            <th className="py-2 border-b">Subscription Plan</th>
            <th className="py-2 border-b">Status</th>
            <th className="py-2 border-b">Actions</th>
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
                <td className="py-2 border-b">
                  {company.companyDetails?.subscriptionPlan ? company.companyDetails.subscriptionPlan.type : 'N/A'}
                </td>
                <td className="py-2 border-b">
                  {getStatus(company.companyDetails?.status)}
                </td>
                <td className="py-2 border-b flex space-x-2">
                  <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => handleView(company._id)}
                  >
                    View
                  </button>
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
              <td colSpan="6" className="py-2 text-center border-b">
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
}

export default Companies;
