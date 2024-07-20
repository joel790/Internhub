import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import ApplicationForm from './ApplicationForm';

const InternshipDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/company/internships/${id}`);
        setInternship(response.data);
      } catch (error) {
        console.error('Error fetching internship:', error);
      }
    };

    fetchInternship();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!internship) {
    return <div className="text-center text-gray-700">Internship not found</div>;
  }

  return (
    <div className="container mx-auto p-10 lg:pl-24   rounded-lg   shadow-lg">
      <h2 className="text-4xl font-bold text-blue-600">{internship.title}</h2>
      <hr className='mt-4 '/>
      <div className="flex items-center mt-6">
        <img src={internship.logo} alt="logo" className="w-20 h-20 rounded-full shadow-md mr-6" />
        <div>
          {/* <p className="text-xl text-gray-800 font-semibold">
            Company name: {internship.company.companyDetailes.name}
          </p> */}
          <p className="text-gray-700">
            <span className="font-semibold">Duration: </span>
            {internship.duration}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Location: </span>
            {internship.location}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Description</h3>
        <p className="text-gray-700 mt-2">{internship.description}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Responsibilities</h3>
        <ul className="list-disc list-inside ml-6 mt-2">
          {internship.skills.map((skill, index) => (
            <li key={index} className="text-gray-700">{skill}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Requirements</h3>
        <ul className="list-disc list-inside ml-6 mt-2">
          {internship.requirements.map((req, index) => (
            <li key={index} className="text-gray-700">{req}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Benefits</h3>
        <p className="text-gray-700 mt-2">{internship.benefit}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Application Deadline</h3>
        <p className="font-semibold text-gray-700 mt-2">{internship.deadline}</p>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={openModal}
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Now
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white relative rounded-lg shadow-lg p-6 w-full max-w-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-4xl font-bold text-red-600 hover:text-red-900"
            >
              &times;
            </button>
            <ApplicationForm internship={internship} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipDetail;
