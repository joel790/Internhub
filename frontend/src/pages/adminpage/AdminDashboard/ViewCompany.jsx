/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import photo from "../../../assets/company.png";
import CompanyInternships from './CompanyIntern';

const ViewCompany = ({ companyDetail, onClose }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!companyDetail) {
    return <div>No company found</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto p-6 relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          <img src={photo} alt="Company Photo" className="w-full md:w-1/2 object-cover" />
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-row gap-4 items-center mb-4">
                <img src={companyDetail.logo} alt="Company Logo" className="w-28 h-16 object-contain" />
                <div>
                  <h1 className="text-sky-600 text-2xl font-bold">{companyDetail.name}</h1>
                  <h2 className="text-sky-600 text-xl">{companyDetail.slogan}</h2>
                </div>
              </div>
              <div className="relative">
                <p className={`transition-all duration-500 ${showFullDescription ? 'max-h-full' : 'max-h-20 overflow-hidden'}`}>
                  {companyDetail.description}
                </p>
                <button
                  className="absolute bottom-0 right-0 bg-gradient-to-t from-white to-transparent pt-4 text-sky-600 flex items-center"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show Less' : 'Show More'} {showFullDescription ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">Internship Opportunities</h1>
          <div className="px-4">
            <CompanyInternships internships={companyDetail.internships} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCompany;
