// import React from "react";
import intern from "../../assets/explore.png";
import SearchField from "../../components/internship/SearchField";

import FeaturedInternships from "./FeaturedInternships";
import FindInternships from "./FindInternships";

const InternHome = () => {
  return (
    <div>
      <div className="lg:py-10 lg:px-10 relative lg:h-[500px] flex flex-col lg:flex-row">
        <div className="justify-center items-center lg:w-1/2 p-10">
          <h1 className="text-3xl lg:text-6xl font-bold mb-6 text-blue-500">
            Explore Internship <br />
            Opportunities
          </h1>
          <p className="text-xl lg:text-xl mb-8 text-gray-500">
            We have many companies in various industries that offer internship
            opportunities for university students and recent graduates to help
            them gain experience, secure jobs, and develop their careers.
          </p>
        </div>
        <div className="flex justify-center lg:w-1/2">
          <img
            src={intern}
            className="w-full lg:w-4/5 lg:max-h-full"
            alt="explore"
          />
        </div>
      </div>
      <SearchField />
      <FeaturedInternships />
      <FindInternships />
      <div className="container mx-auto px-4"></div>
    </div>
  );
};

export default InternHome;
