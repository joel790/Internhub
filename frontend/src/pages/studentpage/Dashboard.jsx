import React from 'react';

const Dashboard = () => {
  // Dummy data
  const statistics = {
    totalInternships: 10,
    activeApplications: 3,
    completedInternships: 2,
    rejectedApplications: 1
  };

  const appliedInternships = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Software Developer Intern',
      status: 'Active',
      appliedDate: '2024-06-01'
    },
    {
      id: 2,
      company: 'Innovate Solutions',
      position: 'Data Analyst Intern',
      status: 'Completed',
      appliedDate: '2024-05-15'
    },
    {
      id: 3,
      company: 'Future Tech',
      position: 'UX/UI Designer Intern',
      status: 'Rejected',
      appliedDate: '2024-04-20'
    }
  ];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 bg-white border-blue-200 border shadow-md rounded cursor-pointer">
          <h2 className="text-xl font-semibold">Total Internships</h2>
          <p className="text-2xl">{statistics.totalInternships}</p>
        </div>
        <div className="card p-4 bg-white shadow-md rounded border-blue-200 border cursor-pointer">
          <h2 className="text-xl font-semibold">Active Applications</h2>
          <p className="text-2xl">{statistics.activeApplications}</p>
        </div>
        <div className="card p-4 bg-white shadow-md rounded border-blue-200 border cursor-pointer">
          <h2 className="text-xl font-semibold">Completed Internships</h2>
          <p className="text-2xl">{statistics.completedInternships}</p>
        </div>
        <div className="card p-4 bg-white shadow-md rounded border-blue-200 border cursor-pointer">
          <h2 className="text-xl font-semibold">Rejected Applications</h2>
          <p className="text-2xl">{statistics.rejectedApplications}</p>
        </div>
      </div>
      <div className="applied-internships">
        <h2 className="text-xl font-bold mb-4">Applied Internships</h2>
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">Company</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Position</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Status</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {appliedInternships.map((internship) => (
              <tr key={internship.id}>
                <td className="py-2 px-4 border-b">{internship.company}</td>
                <td className="py-2 px-4 border-b">{internship.position}</td>
                <td className="py-2 px-4 border-b">{internship.status}</td>
                <td className="py-2 px-4 border-b">{internship.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
