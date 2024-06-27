import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const ApplicationForm = ({ internship, closeModal }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    resume: null,
    coverLetter: "",
    portfolioUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    } else if (!isNaN(formData.firstName)) {
      newErrors.firstName = "First Name should be a string";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    } else if (!isNaN(formData.lastName)) {
      newErrors.lastName = "Last Name should be a string";
    }

    if (!formData.email) {
      newErrors.email = "Email address is required";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number should be a number";
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload your resume";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setShowSuccessMessage(true); // Show success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        resume: null,
        coverLetter: "",
        portfolioUrl: "",
      }); // Clear form data
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false); // Close only the success message
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white  ">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Application form For {internship.title}
        </h1>
        {isSubmitted && showSuccessMessage ? (
          <div className="flex flex-col items-center justify-center h-full ">
            <div className="text-5xl text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <p className="text-xl text-blue-600">
              Application submitted successfully!
            </p>
            <button
              onClick={closeSuccessMessage} // Close only the success message
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="example1@gmail.com"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="input"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Upload resume</label>
              <input
                type="file"
                name="resume"
                className="input"
                onChange={handleFileChange}
              />
              {errors.resume && <p className="text-red-500">{errors.resume}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Cover letter</label>
              <textarea
                name="coverLetter"
                placeholder="Cover letter"
                className="input"
                value={formData.coverLetter}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Portfolio url</label>
              <input
                type="url"
                name="portfolioUrl"
                placeholder="Portfolio url"
                className="input"
                value={formData.portfolioUrl}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
