// import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { internshipData } from "../../data/internshipdata/InternshipData";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = internshipData.find((item) => item.id === parseInt(id));

  const handleApplyClick = () => {
    navigate(`/apply/${internship.title}`);
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
          className="bg-blue-600 w-full text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700"
          onClick={handleApplyClick}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default InternshipDetail;
