import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ApplicationForm = ({ internship, closeModal }) => {
  const [formData, setFormData] = useState({
    coverLetter: "",
    resume: null,
    portfolioUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    if (!formData.coverLetter) {
      newErrors.coverLetter = "Cover Letter is required";
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload your resume";
    }

    if (!formData.portfolioUrl) {
      newErrors.portfolioUrl = "Portfolio URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formDataToSend = new FormData();
      formDataToSend.append("coverLetter", formData.coverLetter);
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("portfolioUrl", formData.portfolioUrl);

      try {
        const response = await axios.post(`/api/internships/${internship._id}/apply`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          setIsSubmitted(true);
          setShowSuccessMessage(true); // Show success message
          setFormData({
            coverLetter: "",
            resume: null,
            portfolioUrl: "",
          }); // Clear form data
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        setErrors({ submit: "Failed to submit application" });
      }
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false); // Close only the success message
    closeModal(); // Also close the modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg border border-indigo-100">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Application Form For {internship.title}
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
                className="w-10 h-10"
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
              onClick={closeSuccessMessage}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Cover Letter</label>
              <textarea
                name="coverLetter"
                placeholder="Cover Letter"
                className="input"
                value={formData.coverLetter}
                onChange={handleChange}
              ></textarea>
              {errors.coverLetter && (
                <p className="text-red-500">{errors.coverLetter}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Upload Resume</label>
              <input
                type="file"
                name="resume"
                className="input"
                onChange={handleFileChange}
              />
              {errors.resume && <p className="text-red-500">{errors.resume}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Portfolio URL</label>
              <input
                type="url"
                name="portfolioUrl"
                placeholder="Portfolio URL"
                className="input"
                value={formData.portfolioUrl}
                onChange={handleChange}
              />
              {errors.portfolioUrl && (
                <p className="text-red-500">{errors.portfolioUrl}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Application
            </button>
            {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
