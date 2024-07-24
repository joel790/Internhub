import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FindInternships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/internships");
        setInternships(response.data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  const handleSeeAllClick = () => {
    navigate("/internship/all-internships");
  };

  const initialDisplayCount = 8;
  const displayedInternships = internships.slice(0, initialDisplayCount);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mx-20">
        <h2 className="text-3xl font-bold text-blue-600 mt-8">
          Find Internships That Favor You
        </h2>
        <button
          className="text-gray-800 underline text-2xl font-serif hover:text-gray-600"
          onClick={handleSeeAllClick}
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mx-20 mt-8">
        {displayedInternships.map((internship, index) => {
          const companyDetails = internship.company?.companyDetails;
          const companyLogo = companyDetails ? `http://localhost:5000/${companyDetails.logo}` : "default-logo-path"; // Provide a default path if logo is not available

          return (
            <div key={index} className="p-4">
              <div className="border border-slate-300 rounded-lg bg-white shadow-lg shadow-gray-200 overflow-hidden">
                <div className="flex items-center p-4 gap-2">
                  <img
                    src={companyLogo}
                    className="w-20 h-20 object-cover mx-auto mb-4 rounded-full shadow-md"
                    alt="Company Logo"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{internship.title}</h3>
                    <p className="text-blue-600 text-sm">{internship.role}</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-gray-900 font-medium">Duration: <span className="font-normal">{internship.duration}</span></p>
                  <p className="text-gray-900 font-medium">Location: <span className="font-normal">{internship.location}</span></p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {internship.description}
                  </p>
                  <p className="text-gray-900 font-medium mt-2">Deadline: <span className="font-normal">{internship.deadline}</span></p>
                </div>
                <div className="px-4 pb-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-lg font-medium hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate(`/internship/${internship._id}`, { state: { logo: companyLogo } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FindInternships;
