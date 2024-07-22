// eslint-disable-next-line no-unused-vars
import React from "react";
import intern from "../../assets/intern1.jfif";

import FeaturedInternships from "./FeaturedInternships";
import FindInternships from "./FindInternships";

const InternHome = () => {
  return (
    <div>
      <div className="lg:py-16 lg:px-12 relative lg:h-[600px] flex flex-col lg:flex-row bg-white">
        <div className="flex flex-col justify-center lg:w-1/2 p-8 lg:p-16 bg-white rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-blue-600 mb-6 lg:mb-8 leading-tight">
            Explore Internship <br />
            Opportunities
          </h1>
          <p className="text-base lg:text-lg text-gray-700 lg:w-3/4">
            We partner with numerous companies across various industries, offering internship opportunities that help university students and recent graduates gain valuable experience, secure jobs, and advance their careers.
          </p>
        </div>
        <div className="flex justify-center items-center lg:w-1/2 p-5">
          <div className="relative w-full h-60 lg:h-[500px] bg-white rounded-xl p-4 flex justify-center items-center">
            <img
              src={intern}
              className="w-full h-full object-cover rounded-xl"
              alt="Explore internships"
              style={{ maxWidth: '90%', maxHeight: '90%' }}
            />
          </div>
        </div>
      </div>
      <FeaturedInternships />
      <FindInternships />
      <div className="container mx-auto px-4"></div>
    </div>
  );
};

export default InternHome;
