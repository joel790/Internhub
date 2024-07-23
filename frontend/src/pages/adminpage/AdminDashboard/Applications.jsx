import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../internships/Pagination"; // Adjust the import path as needed

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/applications");
      if (Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        console.error("Invalid response format");
        setApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/company/application/${id}/approve`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error approving application", error);
    } finally {
      setOpenDropdown(null); // Close the dropdown after action
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/company/application/${id}/reject`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting application", error);
    } finally {
      setOpenDropdown(null); // Close the dropdown after action
    }
  };

  const handleDropdownClick = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(id); // Open the dropdown for the specific application
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredApplications = sortedApplications.filter((app) =>
    Object.values(app).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredApplications.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="p-6 space-y-6 max-w-screen">
      <h1 className="text-2xl font-bold">Company Applications</h1>
      <div className="relative mb-4 flex items-center">
        <input
          type="text"
          className="block w-80 p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th
                  className="py-3 px-4 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                  {sortConfig.key === "name" && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 ${
                        sortConfig.direction === "ascending" ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.415l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort("industry")}
                >
                  Industry
                  {sortConfig.key === "industry" && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 ${
                        sortConfig.direction === "ascending" ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.415l-4 4a 1 0 01-1.414 0l-4-4a1 0 010-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  Location
                  {sortConfig.key === "location" && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 ${
                        sortConfig.direction === "ascending" ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.415l-4 4a 1 0 01-1.414 0l-4-4a1 0 010-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort("applicationDate")}
                >
                  Application Date
                  {sortConfig.key === "applicationDate" && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 ${
                        sortConfig.direction === "ascending" ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.415l-4 4a 1 0 01-1.414 0l-4-4a1 0 010-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortConfig.key === "status" && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 ${
                        sortConfig.direction === "ascending" ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.415l-4 4a 1 0 01-1.414 0l-4-4a1 0 010-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((application) => (
                <tr key={application._id} className="border-b">
                  <td className="py-3 px-4 text-sm">{application.name}</td>
                  <td className="py-3 px-4 text-sm">{application.industry}</td>
                  <td className="py-3 px-4 text-sm">{application.location}</td>
                  <td className="py-3 px-4 text-sm">{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative inline-block text-left">
                      <div>
                        {application.status === "pending" ? (
                          <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            id="options-menu"
                            onClick={() => handleDropdownClick(application._id)}
                          >
                            Pending
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.292 7.707a1 1 0 011.414 0L10 11.001l3.293-3.294a1 1 0 011.414 1.415l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.415z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        ) : (
                          application.status
                        )}
                      </div>
                      {openDropdown === application._id && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 z-20 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => handleApprove(application._id)}
                              className="block px-4 py-2 text-sm text-green-700 hover:bg-green-100"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(application._id)}
                              className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No applications available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredApplications.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Applications;
