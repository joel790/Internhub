// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SuccessPopup from '../../../components/popups/successPrompt'; // Adjust the import path as needed

const CompanyForm = () => {
  const { planId } = useParams();

  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    location: "",
    slogan: "",
    description: "",
    industry: "select industry",
    managerName: "",
    jobTitle: "",
    email: "",
    website: "",
    contactNumber: "",
  });

  const [documents, setDocuments] = useState({
    license: null,
    logo: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setCompanyInfo((prev) => (
      { ...prev, [event.target.name]: event.target.value }
    ));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setDocuments((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!companyInfo.name) newErrors.name = "Company name is required";
    if (!companyInfo.description) newErrors.description = "Description is required";
    if (!companyInfo.email) newErrors.email = "Email is required";
    if (!companyInfo.industry || companyInfo.industry === "select industry") newErrors.industry = "Industry is required";
    if (!companyInfo.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!companyInfo.location) newErrors.location = "Location is required";
    if (!companyInfo.managerName) newErrors.managerName = "Manager name is required";
    if (!companyInfo.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!companyInfo.slogan) newErrors.slogan = "Slogan is required";
    if (!companyInfo.website) newErrors.website = "Website is required";
    if (!documents.license) newErrors.license = "Company document is required";
    if (!documents.logo) newErrors.logo = "Company logo is required";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.set("name", companyInfo.name);
    formData.set("location", companyInfo.location);
    formData.set("slogan", companyInfo.slogan);
    formData.set("description", companyInfo.description);
    formData.set("industry", companyInfo.industry);
    formData.set("managerName", companyInfo.managerName);
    formData.set("jobTitle", companyInfo.jobTitle);
    formData.set("contactNumber", companyInfo.contactNumber);
    formData.set("website", companyInfo.website);
    formData.set("license", documents.license);
    formData.set("logo", documents.logo);

    try {
      const response = await axios.post(`http://localhost:5000/api/student/${planId}/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      setSuccess(true); // Show success popup
    } catch (error) {
      console.error('Error applying to company:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full md:items-center md:justify-center sm:px-20 md:px-10 mt-5">
      <h1 className="text-blue-600 font-bold text-2xl pl-20">Please fill the following form</h1>

      <form onSubmit={handleSubmit} className="flex flex-col px-10 mt-5 py-6">
        <h1 className="text-black font-bold text-2xl mt-5">Company Information</h1>
        <hr className="border-blue-500" />
        <div className="flex sm:flex-col md:flex-row gap-5 w-full mt-6">
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-1/2">
            <label className="font-bold text-xl" htmlFor="name">Company Name</label>
            <input
              className="input "
              type="text"
              placeholder="Company name"
              name="name"
              value={companyInfo.name}
              onChange={handleChange}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-1/2">
            <label className="font-bold text-xl" htmlFor="location">Location</label>
            <input
              className="input"
              type="text"
              placeholder="Location"
              name="location"
              value={companyInfo.location}
              onChange={handleChange}
            />
            {errors.location && <span className="text-red-500">{errors.location}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full mt-5">
          <label className="font-bold text-xl" htmlFor="slogan">Slogan</label>
          <input
            className="input"
            type="text"
            placeholder="Slogan"
            name="slogan"
            value={companyInfo.slogan}
            onChange={handleChange}
          />
          {errors.slogan && <span className="text-red-500">{errors.slogan}</span>}
        </div>
        <div className="flex flex-col gap-4 w-full mt-5">
          <label className="font-bold text-xl" htmlFor="description">Description</label>
          <textarea
            className="px-4 py-1 h-28 border border-neutral-400 rounded-lg"
            placeholder="Description"
            name="description"
            value={companyInfo.description}
            onChange={handleChange}
          />
          {errors.description && <span className="text-red-500">{errors.description}</span>}
        </div>
        <div className="flex flex-col gap-2 w-1/2 mt-5">
          <label className="font-bold text-xl" htmlFor="industry">Industry</label>
          <select onChange={handleChange} name="industry" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500">
            <option value="select industry">Select Industry</option>
            <option value="Finance">Finance</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.industry && <span className="text-red-500">{errors.industry}</span>}
        </div>
        <h1 className="text-black font-bold text-2xl mt-16">Manager Information</h1>
        <hr className="w-full border-blue-700" />
        <div className="flex flex-col mt-10">
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-full">
            <label className="font-bold text-xl" htmlFor="managerName">Manager Name</label>
            <input
              className="input "
              type="text"
              placeholder="Manager Name"
              name="managerName"
              value={companyInfo.managerName}
              onChange={handleChange}
            />
            {errors.managerName && <span className="text-red-500">{errors.managerName}</span>}
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-full mt-5">
            <label className="font-bold text-xl" htmlFor="jobTitle">Job Title</label>
            <input
              className="input"
              type="text"
              placeholder="Job Title"
              name="jobTitle"
              value={companyInfo.jobTitle}
              onChange={handleChange}
            />
            {errors.jobTitle && <span className="text-red-500">{errors.jobTitle}</span>}
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-full mt-5">
            <label className="font-bold text-xl" htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              value={companyInfo.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-full mt-5">
            <label className="font-bold text-xl" htmlFor="contactNumber">Contact Number</label>
            <input
              className="input"
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              value={companyInfo.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && <span className="text-red-500">{errors.contactNumber}</span>}
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-full md:w-full mt-5">
            <label className="font-bold text-xl" htmlFor="website">Website</label>
            <input
              className="input"
              type="text"
              placeholder="Website"
              name="website"
              value={companyInfo.website}
              onChange={handleChange}
            />
            {errors.website && <span className="text-red-500">{errors.website}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-full md:w-full mt-5">
          <label className="font-bold text-xl" htmlFor="license">Company Document (license)</label>
          <input
            className="input"
            type="file"
            name="license"
            onChange={handleFileChange}
          />
          {errors.license && <span className="text-red-500">{errors.license}</span>}
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-full md:w-full mt-5">
          <label className="font-bold text-xl" htmlFor="logo">Company Logo</label>
          <input
            className="input"
            type="file"
            name="logo"
            onChange={handleFileChange}
          />
          {errors.logo && <span className="text-red-500">{errors.logo}</span>}
        </div>
        <button
          type="submit"
          className="btn-primary w-full bg-blue-500 text-white font-bold py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Apply
        </button>
      </form>

      {success && (
        <SuccessPopup
          message="Your application has been successfully submitted."
          onClose={() => setSuccess(false)}
        />
      )}
    </div>
  );
};

export default CompanyForm;