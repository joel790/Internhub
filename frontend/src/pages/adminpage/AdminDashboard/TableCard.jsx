import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TableCard = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [applicationStatusData, setApplicationStatusData] = useState([]);
  const [internshipData, setInternshipData] = useState([]);

  useEffect(() => {
    fetchApplicationData();
    // fetchCompaniesData();
    fetchApplicationStatusData();
    fetchInternshipData();
  }, []);

  const fetchApplicationData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/applications/over-time"
      );
      const backendData = response.data.map((item) => ({
        name: item.month,
        applications: item.count,
      }));
      setApplicationData(backendData);
    } catch (error) {
      console.error("Error fetching application data:", error);
    }
  };

  const fetchCompaniesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/companies/over-time"
      );
      const backendData = response.data.map((item) => ({
        name: item.month,
        companies: item.count,
      }));
      setCompaniesData(backendData);
    } catch (error) {
      console.error("Error fetching companies data:", error);
    }
  };

  const fetchApplicationStatusData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/applications/status-counts"
      );
      const backendData = response.data.map((item) => ({
        name: item.status,
        value: item.count,
      }));
      setApplicationStatusData(backendData);
    } catch (error) {
      console.error("Error fetching application status data:", error);
    }
  };

  const fetchInternshipData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/internships/over-time"
      );
      const backendData = response.data.map((item) => ({
        name: item.month,
        internships: item.count,
      }));
      setInternshipData(backendData);
    } catch (error) {
      console.error("Error fetching internship data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="chart-card bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">Applications Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={applicationData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">
          Companies Registered Over Time
        </h2>
        {/* <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companiesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Bar dataKey="companies" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
      <div className="chart-card bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">Applications Status</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={applicationStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {applicationStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "approved"
                      ? "#82ca9d"
                      : entry.name === "rejected"
                      ? "#ff0000"
                      : "#ffbb28"
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-card bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">Internships Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={internshipData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Line type="monotone" dataKey="internships" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TableCard;
