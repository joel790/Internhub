import React, { useState } from "react";
import propTypes from "prop-types";

const FilterInterns = ({ onFilter, onClear }) => {
  const [filters, setFilters] = useState({
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
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="font-bold text-xl mb-4">Filter Internships</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
            Location
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
          >
            <option value="">Select Location</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            name="company"
            value={filters.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="industry">
            Industry
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="industry"
            name="industry"
            value={filters.industry}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Type</label>
          <div className="flex flex-wrap">
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox"
                name="type.fullTime"
                checked={filters.type.fullTime}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Full Time</span>
            </label>
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox"
                name="type.partTime"
                checked={filters.type.partTime}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Part Time</span>
            </label>
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox"
                name="type.remote"
                checked={filters.type.remote}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Remote</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Payment</label>
          <div className="flex flex-wrap">
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox"
                name="payment.free"
                checked={filters.payment.free}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Free</span>
            </label>
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox"
                name="payment.paid"
                checked={filters.payment.paid}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Paid</span>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
            onClick={handleClear}
          >
            Clear Filters
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
