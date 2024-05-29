/* eslint-disable react/prop-types */
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const CompanyComponent = ({id, logo, name, industry, location, description, num }) => {
  
    
  return (
    <div className="border border-slate-300 rounded-lg p-4">
      <img src={logo} className="w-32 px-4 h-16 object-contain  mb-4" alt="Company Logo" />
      <h2 className="text-xl px-4 font-bold mb-2">{name}</h2>
      <p className="text-sm text-blue-700 mb-2 px-4 font-bold">{industry}</p>
      <div className="flex items-center px-4 mb-2">
        <CiLocationOn className="text-rose-600 mr-1" />
        <p className="text-sm">{location}</p>
      </div>
      <p className="text-sm mb-2 px-4">{description}</p>
      <p className="text-sm text-sky-700 mb-4 px-4">{num} internships available</p>
     <Link to={`/company/${id}`}>  <button className="w-full text-white bg-blue-700 py-1  rounded-lg hover:bg-blue-800 focus:outline-none focus:bg-blue-800 items-end ">View More</button>
</Link>
    </div>
  );
};

export default CompanyComponent;