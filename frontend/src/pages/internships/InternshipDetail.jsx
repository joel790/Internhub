import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import ApplicationForm from './ApplicationForm';

const Step = ({ icon, title, description, isLast }) => (
  <div className="relative pl-14 mb-6">
    <div className="absolute left-0 top-0 flex items-center">
      <div className="bg-white border border-gray-300 rounded-full p-2 shadow-md">
        {icon}
      </div>
      {!isLast && <div className="h-full w-px bg-gray-300 ml-3 -mt-2"></div>}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 ml-8">{title}</h3>
    <p className="text-gray-700 mt-1 ml-8">{description}</p>
  </div>
);

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
    return <div className="text-center text-red-700">Internship not found</div>;
  }

  const sections = [
    { 
      title: 'Description', 
      content: internship.description, 
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l-2 2m10-2l-2 2m0 0l2 2m-2-2v8m-4 4h4m0-4h-4m0 4v-4m-4 0H3m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    { 
      title: 'Responsibilities', 
      content: internship.skills.join(', '), 
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    { 
      title: 'Requirements', 
      content: internship.requirements.join(', '), 
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m-4-6a1 1 0 00-1 1v4a1 1 0 001 1h8a1 1 0 001-1v-4a1 1 0 00-1-1H8a1 1 0 00-1 1v4a1 1 0 001 1h8a1 1 0 001-1v-4a1 1 0 00-1-1H8z" />
        </svg>
      )
    },
    { 
      title: 'Benefits', 
      content: internship.benefit, 
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-3-3l-3 3m3-9V4m0 4V4m0 4v8m-4 4h8" />
        </svg>
      )
    },
    { 
      title: 'Application Deadline', 
      content: internship.deadline, 
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3h8v4h-8zM8 21v-8h8v8H8zM5 3H3v18h2V3zm14 0h2v18h-2V3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container  mx-auto p-10 lg:pl-24 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-blue-600">{internship.title}</h2>
      <hr className="mt-4" />
      <div className="flex items-center mt-6">
        <img src={internship.logo} alt="logo" className="w-20 h-20 rounded-full shadow-md mr-6" />
        <div>
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
      <div className="mt-6 space-y-6">
        {sections.map((section, index) => (
          <Step key={index} icon={section.icon} title={section.title} description={section.content} isLast={index === sections.length - 1} />
        ))}
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
