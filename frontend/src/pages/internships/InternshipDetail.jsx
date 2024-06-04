// import React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { internshipData } from "../../data/internshipdata/InternshipData";
import ApplicationForm from "./ApplicationForm";

const InternshipDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const internship = internshipData.find((item) => item.id === parseInt(id));

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!internship) {
    return <div>Internship not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-blue-600">{internship.role}</h2>
      <div className="flex items-center mt-4">
        <img src={internship.logo} alt="logo" className="w-16 h-16 mr-4" />
        <div>
          <p className="text-xl text-gray-700 font-semibold">
            Company name: {internship.title}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Duration: </span>
            {internship.duration}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Location: </span>
            {internship.location}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">Description</h3>
        <p className="text-gray-600">{internship.description}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">Responsibilities</h3>
        <ul className="list-disc list-inside ml-6">
          {internship.responsibilities.map((resp, index) => (
            <li key={index} className="text-gray-600">
              {resp}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">Requirements</h3>
        <ul className="list-disc list-inside ml-6">
          {internship.requirements.map((req, index) => (
            <li key={index} className="text-gray-600">
              {req}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">Benefits</h3>
        <ul className="list-disc list-inside ml-6">
          {internship.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-600">
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <p className="font-semibold">
        Application Deadline: {internship.deadline}
      </p>
      <div className="flex justify-center mt-8">
        <button
          onClick={openModal}
          className="bg-blue-600 w-full text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
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
            <ApplicationForm
              internshipTitle={internship.title}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipDetail;
