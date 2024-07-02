import { useState } from "react"

 const PostInternshipForm = () => {
   
    const [internship,setInternship]=useState({
        title:"",
        description:"",
        duration:"",
        location:"",
        skills:[],
        company:'',



    })
    const handleSubmit=(event)=>{
        event.preventDefault()
        const skillsArray = internship.skills.split(',').map(skill => skill.trim());
        const updatedInternship = { ...internship, skills: skillsArray };
        console.log(updatedInternship);
    }
    const handleChange=(event)=>{
        setInternship((prev)=>(
            {
                ...prev,[event.target.name]:event.target.value
            }
        ))
        console.log("this is change")
    }
    
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
                required
                className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
                required
                className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="description" className="mb-1">Description</label>
            <textarea
               type="text"
                name="description"
                placeholder="Enter internship description"
                value={internship.description}
                onChange={handleChange}
                required
                className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="duration" className="mb-1">Duration</label>
            <input
                type="date"
                
                name="duration"
                placeholder="Enter internship duration"
                value={internship.duration}
                onChange={handleChange}
                required
                className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="location" className="mb-1">Location</label>
            <input
                type="text"
                
                name="location"
                placeholder="Enter internship location"
                value={internship.location}
                onChange={handleChange}
                required
                className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="skills" className="mb-1">Skills</label>
            <textarea
               type="text"
                name="skills"
                placeholder="Enter internship skills"
                value={internship.skills}
                onChange={handleChange}
                required
               
                className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">Submit</button>
    </form>
</div>
  )
}
export default PostInternshipForm

