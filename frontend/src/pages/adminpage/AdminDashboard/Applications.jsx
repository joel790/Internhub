import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

   
const staticData = [
    {
      _id: "1",
      name: "TechCorp",
      slogan: "Innovating the Future",
      description: "A leading tech company focused on AI and machine learning.",
      industry: "Technology",
      location: "San Francisco, CA",
      managerName: "Alice Smith",
      jobTitle: "CTO",
      contactNumber: ["123-456-7890"],
      website: "www.techcorp.com",
      license: "ABC123",
      logo: "techcorp-logo.png",
      subscriptionPlan: "Gold",
      status: "pending",
      createdAt: "2024-07-15T00:00:00.000Z",
    },
    {
      _id: "2",
      name: "HealthPlus",
      slogan: "Healthcare Reimagined",
      description: "Dedicated to improving healthcare through technology.",
      industry: "Healthcare",
      location: "New York, NY",
      managerName: "Bob Johnson",
      jobTitle: "CEO",
      contactNumber: ["987-654-3210"],
      website: "www.healthplus.com",
      license: "XYZ789",
      logo: "healthplus-logo.png",
      subscriptionPlan: "Silver",
      status: "pending",
      createdAt: "2024-07-16T00:00:00.000Z",
    },
  ];

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/applications");
      if (Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        console.error("Invalid response format");
        setApplications(staticData);
      }
    } catch (error) {
      console.error("Error fetching applications", error);
      setApplications(staticData);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/admin/company/application/${id}/approve`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error approving application", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/admin/company/application/${id}/reject`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting application", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Company Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div
                key={app._id}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={app.logo || "default-logo.png"}
                    alt={`${app.name} logo`}
                    className="w-16 h-16 mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{app.name}</h2>
                    <p className="text-gray-600">{app.slogan}</p>
                  </div>
                </div>
                <p>
                  <strong>Description:</strong> {app.description}
                </p>
                <p>
                  <strong>Industry:</strong> {app.industry}
                </p>
                <p>
                  <strong>Location:</strong> {app.location}
                </p>
                <p>
                  <strong>Manager:</strong> {app.managerName}
                </p>
                <p>
                  <strong>Contact:</strong> {app.contactNumber.join(", ")}
                </p>
                <p>
                  <strong>Website:</strong> {app.website}
                </p>
                <p>
                  <strong>License:</strong> {app.license}
                </p>
                <p>
                  <strong>Plan:</strong> {app.subscriptionPlan}
                </p>
                <p>
                  <strong>Status:</strong> {app.status}
                </p>
                <div className="flex mt-4">
                  <button
                    className="p-2 bg-green-500 text-white rounded mr-2 flex items-center"
                    onClick={() => handleApprove(app._id)}
                  >
                    <FaCheck className="mr-2" /> Approve
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded flex items-center"
                    onClick={() => handleReject(app._id)}
                  >
                    <FaTimes className="mr-2" /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No applications available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
