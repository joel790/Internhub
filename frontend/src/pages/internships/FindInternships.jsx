import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FindInternships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/company/internships");
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

  const initialDisplayCount = 6;
  const displayedInternships = internships.slice(0, initialDisplayCount);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-blue-600 mt-8 ml-20">
          Find internships that favor you
        </h2>
        <button
          className="text-gray-800 underline text-2xl font-serif hover:text-gray-600 mr-20"
          onClick={handleSeeAllClick}
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-20 pr-20 pt-8">
        {displayedInternships.map((internship, index) => (
          <div key={index} className="p-2">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex">
                <img src={internship.logo} className="w-8  mr-1" alt="logo" />
                <h3 className="font-bold text-lg text-gray-700">
                  {internship.title}
                </h3>
              </div>
              <p className="text-blue-600">{internship.role}</p>
              <p className="text-gray-900 font-medium">
                Duration: {internship.duration}
              </p>
              <p className="text-gray-600 font-medium">
                Location: {internship.location}
              </p>
              <p className="text-gray-600">{internship.description}</p>
              {/* <p className="text-gray-600 font-medium">
                Deadline: {internship.deadline}
              </p> */}
              <button
                className="bg-blue-600 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
                onClick={() => navigate(`/internship/${internship._id}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FindInternships;
