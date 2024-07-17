import { useState } from "react";
import axios from "axios";

const PostInternshipForm = () => {
  const [internship, setInternship] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
    skills: "",
    company: "",
    deadline: "",
    benefit: "",
    responsibilities: "",
    requirements: "",
    type: "remote",
    payment: "free",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!internship.title) newErrors.title = "Title is required";
    if (!internship.description) newErrors.description = "Description is required";
    if (!internship.duration) newErrors.duration = "Duration is required";
    if (!internship.deadline) newErrors.deadline = "Deadline is required";
    if (!internship.benefit) newErrors.benefit = "Benefit is required";
    if (!internship.location) newErrors.location = "Location is required";
    if (!internship.requirements) newErrors.requirements = "Requirement is required";
    if (!internship.responsibilities) newErrors.responsibilities = "Responsibilities is required";
    if (!internship.skills) newErrors.skills = "Skills are required";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length !== 0) {
      setErrors(validateErrors);
      return; // Stop submission if there are errors
    }

    // Convert comma-separated strings to arrays
    const skillsArray = internship.skills.split(",").map((skill) => skill.trim());
    const responsibilityArray = internship.responsibilities.split(",").map((responsibility) => responsibility.trim());
    const requirementArray = internship.requirements.split(",").map((requirement) => requirement.trim());

    const postedInternship = {
      ...internship,
      skills: skillsArray,
      responsibilities: responsibilityArray,
      requirements: requirementArray,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/company/internship", postedInternship);
      console.log("Posted internships:", response.data);
    } catch (error) {
      console.error("Error occurred when posting:", error);
    }
  };

  const handleChange = (event) => {
    setInternship((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Create Internship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="company" className="mb-1">Company</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={internship.company}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter internship title"
            value={internship.title}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter internship description"
            value={internship.description}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.description && <span className="text-red-500">{errors.description}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="duration" className="mb-1">Duration</label>
          <input
            type="date"
            name="duration"
            placeholder="Enter internship duration"
            value={internship.duration}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.duration && <span className="text-red-500">{errors.duration}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="deadline" className="mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            placeholder="Enter internship deadline"
            value={internship.deadline}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.deadline && <span className="text-red-500">{errors.deadline}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="benefit" className="mb-1">Benefit</label>
          <input
            type="text"
            name="benefit"
            placeholder="Enter internship benefit"
            value={internship.benefit}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.benefit && <span className="text-red-500">{errors.benefit}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter internship location"
            value={internship.location}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.location && <span className="text-red-500">{errors.location}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="mb-1">Type</label>
          <select
            name="type"
            value={internship.type}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="remote">Remote</option>
            <option value="part time">Part Time</option>
            <option value="full time">Full Time</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="skills" className="mb-1">Skills</label>
          <textarea
            name="skills"
            placeholder="Enter internship skills (comma-separated)"
            value={internship.skills}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.skills && <span className="text-red-500">{errors.skills}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="responsibilities" className="mb-1">Responsibilities</label>
          <textarea
            name="responsibilities"
            placeholder="Enter internship responsibilities (comma-separated)"
            value={internship.responsibilities}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.responsibilities && <span className="text-red-500">{errors.responsibilities}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="requirements" className="mb-1">Requirements</label>
          <textarea
            name="requirements"
            placeholder="Enter internship requirements (comma-separated)"
            value={internship.requirements}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.requirements && <span className="text-red-500">{errors.requirements}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="payment" className="mb-1">Payment</label>
          <select
            name="payment"
            value={internship.payment}
            onChange={handleChange}
            className="py-2 px-3 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostInternshipForm