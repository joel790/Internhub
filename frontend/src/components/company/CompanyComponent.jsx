import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const CompanyComponent = ({ id, logo, name, industry, location, description, internships }) => {
  return (
    <div className="border border-slate-300 rounded-lg p-6 shadow-lg bg-white flex flex-col justify-between h-full">
      <div>
        <img
          src={logo}
          className="w-20 h-20 object-cover mx-auto mb-4 rounded-full shadow-md"
          alt="Company Logo"
        />
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">{name}</h2>
        <p className="text-md text-blue-700 mb-2 text-center font-semibold">{industry}</p>
        <div className="flex items-center justify-center mb-2">
          <CiLocationOn className="text-rose-600 mr-1" />
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div className="px-4">
          <p className="text-sm text-gray-600 mb-2 line-clamp-3">
            {description}
          </p>
        </div>
        <p className="text-sm text-sky-700 mb-4 text-center">{internships.length} internships available</p>
      </div>
      <Link to={`/company/${id}`}>
        <button className="w-full text-white bg-blue-700 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:bg-blue-800 mt-auto">
          View More
        </button>
      </Link>
    </div>
  );
};

export default CompanyComponent;
