import { useEffect, useState } from "react";
import PostInternshipForm from "./PostInternshipForm";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';
import { useNavigate } from "react-router";

const PostedInternship = () => {
  const [add, setAdd] = useState(false);
  const [internshipForCompany, setInternshipForCompany] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDelete,setShoweDelete]=useState(false)
  const [internshipToDelete, setInternshipToDelete] = useState(null);

  const [currentInternship, setCurrentInternship] = useState({
    id: "",
    title: "",
    description: "",
    duration: "",
    location: "",
    skills: "",
    deadline: "",
    benefit: "",
    responsibilities: "",
    requirements: "",
    type: "remote",
    payment: "free",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentInternship({ ...currentInternship, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = currentInternship.skills.split(',').map(skill => skill.trim());
    const responsibilityArray = currentInternship.responsibilities.split(',').map(responsibility => responsibility.trim());
    const requirementArray = currentInternship.requirements.split(',').map(requirement => requirement.trim());
    const updatedIntern = { ...currentInternship, skills: skillsArray, responsibilities: responsibilityArray, requirements: requirementArray };

    try {
      await axios.put(`http://localhost:5000/api/company/internship/${currentInternship.id}`, updatedIntern);
      setShowModal(false);
      const response = await axios.get("http://localhost:5000/api/company/internship/my-internship");
      setInternshipForCompany(response.data);
    } catch (error) {
      console.error("Error updating internship", error);
    }
  };

  const handleEdit = (internshipId) => {
    const internship = internshipForCompany.find((intern) => intern._id === internshipId);
    if (internship) {
      setCurrentInternship({
        id: internship._id,
        title: internship.title,
        description: internship.description,
        duration: internship.duration,
        location: internship.location,
        skills: internship.skills.join(", "),
        responsibilities: internship.responsibilities.join(", "),
        requirements: internship.requirements.join(", "),
        deadline: internship.deadline,
        benefit: internship.benefit,
        type: internship.type,
        payment: internship.payment,
      });
      setShowModal(true);
    }
  };

  const handleView = (internshipId) => {
    navigate('/managerhome/appliedinternship', { state: internshipId });
  };

  const handleDelete = async () => {
    if (!internshipToDelete) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/company/internship/${internshipToDelete}`);
      const response = await axios.get("http://localhost:5000/api/company/internship/my-internship");
      setInternshipForCompany(response.data);
      setShoweDelete(false);
      setInternshipToDelete(null);
    } catch (error) {
      console.log("Error deleting internship", error);
    }
  };

  const columns = ["Name", "Benefit", "Type", "Duration", "Deadline"];
  const data = internshipForCompany.map((intern) => ({
    id: intern._id,
    Name: intern.title,
    Benefit: intern.benefit,
    Type: intern.type,
    Duration: intern.duration,
    Deadline:new Date(intern.deadline).toLocaleString()
  }));

  const handleAddClick = () => {
    setAdd(!add);
  };
  const handledeleteShow = (internshipId) => {
    setInternshipToDelete(internshipId);
    setShoweDelete(true);
  };
  const handleCancel = () => {
    setShoweDelete(false);
    setInternshipToDelete(null);
  };

  useEffect(() => {
    const getInternship = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/company/internship/my-internship");
        if (response.status === 200) {
          setInternshipForCompany(response.data);
        } else {
          console.log("You cannot fetch the internships");
        }
      } catch (error) {
        console.error("An error occurred while fetching the internships:", error);
      }
    };

    getInternship();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full  p-4 md:p-8 bg-white  rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center md:pl-52 mb-4">
          <button
            className="text-white bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 transition"
            onClick={handleAddClick}
          >
            {add ? "Close Form" : "Add Internship"}
          </button>
        </div>
        {add && (
          <div className="mb-4">
            <PostInternshipForm />
          </div>
        )}
        {!add && (
          <div className="relative">
            <div className="md:pl-52">  
              <DataTable columns={columns} data={data} onEdit={handleEdit}  ondeleteShow={handledeleteShow}  onView={handleView} />
               </div>
            <Modal show={showModal} size="lg" onClose={() => setShowModal(false)} popup>
              <ModalHeader className="bg-blue-600 text-white">
                <span>Update Internship</span>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <label htmlFor="title" className="mb-1 font-semibold text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter internship title"
                        value={currentInternship.title}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="description" className="mb-1 font-semibold text-gray-700">Description</label>
                      <textarea
                        type="text"
                        name="description"
                        placeholder="Enter internship description"
                        value={currentInternship.description}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500 h-32"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="duration" className="mb-1 font-semibold text-gray-700">Duration</label>
                      <input
                        type="date"
                        name="duration"
                        placeholder="Enter internship duration"
                        value={currentInternship.duration}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="deadline" className="mb-1 font-semibold text-gray-700">Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        placeholder="Enter internship deadline"
                        value={currentInternship.deadline}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="benefit" className="mb-1 font-semibold text-gray-700">Benefit</label>
                      <input
                        type="text"
                        name="benefit"
                        placeholder="Enter internship benefit"
                        value={currentInternship.benefit}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="location" className="mb-1 font-semibold text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter internship location"
                        value={currentInternship.location}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="type" className="mb-1 font-semibold text-gray-700">Type</label>
                      <select
                        name="type"
                        value={currentInternship.type}
                        onChange={handleChange}
                        required
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        <option value="remote">Remote</option>
                        <option value="part time">Part Time</option>
                        <option value="full time">Full Time</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="skills" className="mb-1 font-semibold text-gray-700">Skills</label>
                      <textarea
                        type="text"
                        name="skills"
                        placeholder="Enter internship skills"
                        value={currentInternship.skills}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500 h-24"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="responsibilities" className="mb-1 font-semibold text-gray-700">Responsibilities</label>
                      <textarea
                        type="text"
                        name="responsibilities"
                        placeholder="Enter internship responsibilities"
                        value={currentInternship.responsibilities}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500 h-24"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="requirements" className="mb-1 font-semibold text-gray-700">Requirements</label>
                      <textarea
                        type="text"
                        name="requirements"
                        placeholder="Enter internship requirements"
                        value={currentInternship.requirements}
                        onChange={handleChange}
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500 h-24"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="payment" className="mb-1 font-semibold text-gray-700">Payment</label>
                      <select
                        name="payment"
                        value={currentInternship.payment}
                        onChange={handleChange}
                        required
                        className="py-2 px-4 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setShowModal(false)} className="mr-2 bg-gray-400 text-white hover:bg-gray-500">
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>
        )}
      </div>
      {showDelete&&  <div className="md:w-1/3 fixed top-44 left-1/2 transform -translate-x-1/2 p-4 bg-red-200 h-40 items-center rounded-lg">
    <h1 className="text-red-700 mb-4 text-center">Are you sure you want to delete?</h1>
    <div className="flex justify-around">
      <Button className="bg-gray-400 text-white hover:bg-gray-500" onClick={handleCancel}>
        Cancel
      </Button>
      <Button className="bg-red-700 text-white hover:bg-red-800" onClick={handleDelete}>
        Yes
      </Button>
    </div>
  </div>}
     
    </div>
  );
};

export default PostedInternship;