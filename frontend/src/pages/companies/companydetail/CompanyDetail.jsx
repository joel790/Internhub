/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../../../components/footer/Footer";
import photo from "../../../assets/company.png";
import CompanyInternships from './CompanyInternships';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CompanyDetail = () => {
  const { id } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/companies/${id}`);
        setCompanyDetail(response.data.companyDetails);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetail();
  }, [id]);

  if (!companyDetail) {
    return <div>No company found</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 md:px-10 py-6">
        <div className="bg-white shadow-lg border border-sky-100 rounded-lg overflow-hidden">
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
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">Internship Opportunities</h1>
          <div className="px-4">
            <CompanyInternships companyId={id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CompanyDetail;
