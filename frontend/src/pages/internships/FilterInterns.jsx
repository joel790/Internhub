import { useState } from "react";
import propTypes from "prop-types";

const FilterInterns = ({ onFilter, onClear }) => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    company: "",
    industry: "",
    type: {
      fullTime: false,
      partTime: false,
      remote: false,
    },
    payment: {
      free: false,
      paid: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const [category, key] = name.split(".");
    setFilters({
      ...filters,
      [category]: { ...filters[category], [key]: checked },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({
      title: "",
      location: "",
      company: "",
      industry: "",
      type: {
        fullTime: false,
        partTime: false,
        remote: false,
      },
      payment: {
        free: false,
        paid: false,
      },
    });
    onClear();
  };

  return (
    <div className="p-4 border rounded-lg bg-white ">
      <h3 className="font-bold text-xl mb-4">Filter out interns</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Tech Innovation"
            value={filters.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <select
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
          >
            <option value="">Select location</option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Bahir Dar">Bahir Dar</option>
            <option value="Dire Dawa">Dire Dawa</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="company"
          >
            Company
          </label>
          <select
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            name="company"
            value={filters.company}
            onChange={handleInputChange}
          >
            <option value="">Select company</option>
            {/* <option value="Kuraz Tech">Kuraz Tech</option> */}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="industry"
          >
            Industry
          </label>
          <select
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="industry"
            name="industry"
            value={filters.industry}
            onChange={handleInputChange}
          >
            <option value="">Select field</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Networking">Networking</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Type</label>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="fullTime"
              name="type.fullTime"
              checked={filters.type.fullTime}
              onChange={handleCheckboxChange}
            />
            <label className="text-gray-700" htmlFor="fullTime">
              Full time
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="partTime"
              name="type.partTime"
              checked={filters.type.partTime}
              onChange={handleCheckboxChange}
            />
            <label className="text-gray-700" htmlFor="partTime">
              Part time
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="remote"
              name="type.remote"
              checked={filters.type.remote}
              onChange={handleCheckboxChange}
            />
            <label className="text-gray-700" htmlFor="remote">
              Remote
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Payment</label>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="free"
              name="payment.free"
              checked={filters.payment.free}
              onChange={handleCheckboxChange}
            />
            <label className="text-gray-700" htmlFor="free">
              Free
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="paid"
              name="payment.paid"
              checked={filters.payment.paid}
              onChange={handleCheckboxChange}
            />
            <label className="text-gray-700" htmlFor="paid">
              Paid
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Filter
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            type="button"
            onClick={handleClear}
          >
            Clear filter
          </button>
        </div>
      </form>
    </div>
  );
};

FilterInterns.propTypes = {
  onFilter: propTypes.func.isRequired,
  onClear: propTypes.func.isRequired,
};

export default FilterInterns;
