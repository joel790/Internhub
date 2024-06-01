import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ApplicationForm = () => {
  const { internshipTitle } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Application form For {internshipTitle}
        </h1>
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-5xl text-blue-600 mb-4">
             
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <p className="text-xl text-blue-600">
              Application submitted successfully!
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="example1@gmail.com"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Upload resume</label>
              <input
                type="file"
                name="resume"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Cover letter</label>
              <textarea
                name="coverLetter"
                placeholder="Cover letter"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Portfolio url</label>
              <input
                type="url"
                name="portfolioUrl"
                placeholder="Portfolio url"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
