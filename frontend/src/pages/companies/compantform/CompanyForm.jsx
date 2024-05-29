import { useState } from "react"

 const CompanyForm = () => {
    const [companyInfo,setCompanyInfo]=useState({
        companyName:"",
        location:"",
        slogan:"",
        description:"",
        industry:"select industry",
        managerName:"",
        jobTitle:"",
        email:"",
        twitter:"",
        phone:"",
    });

    const [documents,setDocuments]=useState({
        companyDocument:"",
        companyLogo:""

    })
    const [errors,setErrors]=useState({})
    const handleChange=(event)=>{
        setCompanyInfo((prev)=>(
            {...prev,[event.target.name]:event.target.value}
        ))
    }
    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setDocuments((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      };
      const validate=()=>{
        const newErrors={};

        if(!companyInfo.companyName) newErrors.companyName="company name is required"
        if(!companyInfo.description) newErrors.description="description is required"
        if(!companyInfo.email) newErrors.email="email is required"
        if(!companyInfo.industry) newErrors.industry ="industry is required"
        if(!companyInfo.jobTitle) newErrors.jobTitle="jobTitle is required"
        if(!companyInfo.location) newErrors.location="location is required"
        if(!companyInfo.managerName) newErrors.managerName="managerName is required"
        if(!companyInfo.phone) newErrors.phone="phone is required"
        if(!companyInfo.slogan) newErrors.slogan="slogan is required"
        if(!companyInfo.twitter) newErrors.twitter="twitter is required"
        if(!documents.companyDocument) newErrors.companyDocument="companyDocument is required"
        if(!documents.companyLogo) newErrors.companyLogo="companyLogo is required"
  return newErrors;
      }

const handleSubmit=(event)=>{
    event.preventDefault();
    const validationErrors=validate()
    if(Object.keys(validationErrors).length!==0 ){
        setErrors(validationErrors)

        
    }
        const formData = {
            companyName:companyInfo.companyName,
            location:companyInfo.location,
            slogan:companyInfo.slogan,
            description:companyInfo.description,
            industry:companyInfo.industry,
            managerName:companyInfo.managerName,
            jobTitle:companyInfo.jobTitle,
            email:companyInfo.email,
            twitter:companyInfo.twitter,
            phone:companyInfo.phone,
            companyDocument:documents.companyDocument,
            companyLogo:documents.companyLogo
        };
        console.log(formData)
   }
    


  return (
    <div className="flex flex-col items-start justify-start w-full  md:items-center  md:justify-center sm:px-20  md:px-10 mt-5" >

        <h1 className="text-blue-600 font-bold text-2xl pl-20">Please fill the following form</h1>
       
        
        <form onSubmit={handleSubmit} className="flex flex-col px-10 mt-5 py-6  ">
        <h1 className=" text-black font-bold text-2xl mt-5 ">Company Information</h1>
        <hr className=" border-blue-700 "></hr>
            <div className="flex sm:flex-col md:flex-row gap-5 w-full mt-6">

            <div className="flex flex-col gap-4 w-full sm:w-full md:w-1/2">
             <label className="font-bold text-xl" htmlFor="company name ">company name</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="company name" name="companyName" value={companyInfo.companyName} onChange={handleChange}/>
            {errors.companyName && <span className="text-red-500">{errors.companyName}</span>}

            </div>
            <div  className="flex flex-col gap-4 w-full sm:w-full md:w-1/2">

            <label className="font-bold text-xl" htmlFor="location">location</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="location" name="location" value={companyInfo.location} onChange={handleChange}/>
            {errors.location && <span className="text-red-500">{errors.location}</span>}

            </div>
            </div>
            <div  className="flex flex-col gap-4 w-full mt-5">

            <label className="font-bold text-xl" htmlFor="slogan">slogan</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="slogan" name="slogan" value={companyInfo.slogan} onChange={handleChange}/>
            {errors.slogan && <span className="text-red-500">{errors.slogan}</span>}

            </div>
            <div  className="flex flex-col gap-4 w-full mt-5">

<label className="font-bold text-xl" htmlFor="description">description</label>
<textarea className="px-4 py-1 h-28 border border-neutral-400 rounded-lg" type="text" placeholder="description" name="description" value={companyInfo.description} onChange={handleChange}/>
{errors.description && <span className="text-red-500">{errors.description}</span>}

</div>
<div  className="flex flex-col gap-2 w-1/2 mt-5">

<label className="font-bold text-xl" htmlFor="industry">industry</label>
<select onChange={handleChange} name="industry" className=' px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500'>
                        <option  value="all-categories">{companyInfo.industry}</option>
                        <option value="Finance">Finance</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Health</option>
                        <option value="Education">Education</option>

                    </select>
</div>
         <h1 className=" text-black font-bold text-2xl mt-16">Manager Information</h1>
          <hr className="w-full border-blue-700 "></hr>
          <div className="flex flex-col mt-10">
          <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="manager name ">Manager name</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="manager name" name="managerName" value={companyInfo.managerName} onChange={handleChange}/>
            {errors.managerName && <span className="text-red-500">{errors.managerName}</span>}

            </div> 
            <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="job title ">Jon title</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="job title" name="jobTitle" value={companyInfo.jobTitle} onChange={handleChange}/>
            {errors.jobTitle && <span className="text-red-500">{errors.jobTitle}</span>}

            </div> 
          </div>
          <h1 className=" text-black font-bold text-2xl mt-16">Contact Information</h1>
          <hr className="w-full border-blue-700 "></hr>

          <div className="flex flex-col gap-4 w-full mt-6">
             <label className="font-bold text-xl" htmlFor="email address ">Email Address</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="email" placeholder="assegagebeyehu21@gmail.com" name="email" value={companyInfo.email} onChange={handleChange}/>
            {errors.email && <span className="text-red-500">{errors.email}</span>}

            </div>   
            <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="twitter ">Twitter</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="twitter" name="twitter" value={companyInfo.twitter} onChange={handleChange}/>
            {errors.twitter && <span className="text-red-500">{errors.twitter}</span>}

            </div>  
            <h1 className=" text-black font-bold text-2xl mt-16">Documents</h1>
          <hr className="w-full border-blue-700 "></hr>  
          <div className="flex flex-col gap-4 w-full mt-6">
             <label className="font-bold text-xl" htmlFor="Company Document ">Company Document</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="file" name="companyDocument"  onChange={handleFileChange}/>
            {errors.companyDocument && <span className="text-red-500">{errors.companyDocument}</span>}

            </div> 
            <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="company logo ">company Logo</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="file" placeholder="company logo" name="companyLogo"  onChange={handleFileChange}/>
            {errors.companyLogo && <span className="text-red-500">{errors.companyLogo}</span>}

            </div> 
            <button  className="bg-blue-700 text-white p-2 mt-5" type="submit">Submit Application</button>
        </form>
    </div>
  )
}

export default CompanyForm
