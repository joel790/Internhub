import { useEffect, useState } from "react";
import PostInternshipForm from "./PostInternshipForm";
import DataTable from "../../../components/tables/DataTable";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';



const PostedInternship = () => {
  const [add, setAdd] = useState(false);
  const [internshipforCompany,setInternshipforCompany]=useState([])
  const [showModal, setShowModal] = useState(false);
    const [currentInternship, setCurrentInternship] = useState({
        title:"",
        description:"",
        duration:"",
        location:"",
        skills:[],
        company:'',
        deadline: '',
        benefit: '',
    responsibilities: [''],
    requirements: [''],
    type: 'remote',
    payment: 'free',



    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCurrentInternship({ ...currentInternship, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const skillsArray = currentInternship.skills.split(',').map(skill => skill.trim());
      const responsibilityArray=currentInternship.responsibilities.split(",").map(responsibilities=>responsibilities.trim())
      const requirementArray=currentInternship.requirements.split(',').map(requirements=>requirements.trim())
      const updatedIntern={...currentInternship,skills:skillsArray,responsibilities:responsibilityArray,requirements:requirementArray}
      try {
          await axios.put(`http://localhost:5000/api/company/internship/${currentInternship.id}`, updatedIntern);
          setShowModal(false);
      } catch (error) {
          console.log("Error updating internship", error);
      }
  };
  const handleEdit = (internship) => {
    setCurrentInternship(internship);
    setShowModal(true);
};

const handleDelete = async (internshipId) => {
    try {
        await axios.delete(`http://localhost:5000/api/company/internship/${internshipId}`);
    } catch (error) {
        console.log("Error deleting internship", error);
    }
};

  const columns = ["Name", "Position", "Status"];
  const data = [
    { Name: "Neil Sims", Position: "React Developer", Status: "Online" },
    { Name: "Bonnie Green", Position: "Designer", Status: "Online" },
    { Name: "Jese Leos", Position: "Vue JS Developer", Status: "Online" },
    { Name: "Thomas Lean", Position: "UI/UX Engineer", Status: "Online" },
    { Name: "Leslie Livingston", Position: "SEO Specialist", Status: "Offline" }
  ];
  // const actions = [
  //   { label: "Edit", onClick: (row) => console.log("Edit", row) }
  // ];

  const handleAddClick = () => {
    setAdd(!add);
  };
  useEffect(()=>{
    const getInternship=async()=>{
      const token="hhhhfdd848y4yrhffhr"
      const response=await axios.get("http://localhost:5000/api/company/internship/my-internship",{
        headers:{
          'Authorization':`Bearer ${token}`
        }

      })
      if(response.status===200){
        setInternshipforCompany(response.data)
      }
      else{
        console.log("you cannot fetch the internships")
      }

    }
    getInternship()

  },[])
  console.log(internshipforCompany)

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-4 md:p-8 rounded-lg ">
       
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <button
            className="text-white bg-sky-600 rounded px-4 py-2 hover:bg-green-600 transition"
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
        <div>
        {!add&& <DataTable columns={columns} data={data}   onEdit={handleEdit} onDelete={handleDelete} />

        
}
<Modal show={showModal} size="lg"  onClose={() => setShowModal(false)} popup>
                    <ModalHeader>
                        <span>Update Internship</span>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                            <div className="flex flex-col">
            <label htmlFor="company" className="mb-1">Company</label>
            <input
                type="text"
               
                name="company"
                placeholder="Enter company name"
                value={currentInternship.company}
                onChange={handleChange}
               
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="mb-1">Title</label>
            <input
                type="text"
               
                name="title"
                placeholder="Enter internship title"
                value={currentInternship.title}
                onChange={handleChange}
                
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
            <label htmlFor="description" className="mb-1">Description</label>
            <textarea
               type="text"
                name="description"
                placeholder="Enter internship description"
                value={currentInternship.description}
                onChange={handleChange}
                
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
            <label htmlFor="duration" className="mb-1">Duration</label>
            <input
                type="date"
                
                name="duration"
                placeholder="Enter internship duration"
                value={currentInternship.duration}
                onChange={handleChange}
                
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
        <label htmlFor="deadline" className="mb-1"> Deadline</label>
        
        <input 
        type="date" 
        name="deadline" 
        placeholder="Enter internship deadline"

        value={currentInternship.deadline} 
        onChange={handleChange} 
        
        className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"

         />
     

        </div>
        <div className="flex flex-col">
        <label htmlFor="benefit" className="mb-1">Benefit</label>
            <input
                type="text"
               
                name="benefit"
                placeholder="Enter internship benefit"
                value={currentInternship.benefit}
                onChange={handleChange}
                
                className="py-2 px-3 border mt-3 rounded-lg focus:outline-none focus:border-blue-500"
            />


        </div>
        <div className="flex flex-col">
            <label htmlFor="location" className="mb-1">Location</label>
            <input
                type="text"
                
                name="location"
                placeholder="Enter internship location"
                value={currentInternship.location}
                onChange={handleChange}
                
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
        <label htmlFor="type" className="mb-1">Type</label>

       
        <select name="type" value={currentInternship.type} onChange={handleChange} required                 
        className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
>
          <option value="remote">Remote</option>
          <option value="part time">Part Time</option>
          <option value="full time">Full Time</option>
        </select>
     
        </div>
        <div className="flex flex-col">
            <label htmlFor="skills" className="mb-1">Skills</label>
            <textarea
               type="text"
                name="skills"
                placeholder="Enter internship skills"
                value={currentInternship.skills}
                onChange={handleChange}
                
               
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
            <label htmlFor="responsibilities" className="mb-1">Responsibilities</label>
            <textarea
               type="text"
                name="responsibilities"
                placeholder="Enter internship responsibilities"
                value={currentInternship.responsibilities}
                onChange={handleChange}
                
               
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
            <label htmlFor="requirements" className="mb-1">Requirements</label>
            <textarea
               type="text"
                name="requirements"
                placeholder="Enter internship requirements"
                value={currentInternship.requirements}
                onChange={handleChange}
               
               
                className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

        </div>
        <div className="flex flex-col">
        <label htmlFor="payment" className="mb-1">Payment</label>

        <select name="payment" value={currentInternship.payment} onChange={handleChange} 
        required
        className="py-2 px-3 mt-3 border rounded-lg focus:outline-none focus:border-blue-500"

        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
     

        </div>
                                <div className="flex justify-end">
                                    <Button onClick={() => setShowModal(false)} className="mr-2 bg-sky-600">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className='bg-sky-600' >
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
</div>
      
      </div>
    </div>
  );
};

export default PostedInternship;