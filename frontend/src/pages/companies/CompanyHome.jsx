import { useState } from "react";
import CompanyComponent from "../../components/company/CompanyComponent";
import { companyData } from "../../data/companydata/CompanyData";
import OtherPartner from "./otherPartner/OtherPartner";
import { CiSearch } from "react-icons/ci";

const CompanyHome = () => {
  const [company, setCompany] = useState(companyData);
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all-categories");

const handleChange=(event)=>{
  setSearch(event.target.value)
  handleSearch();

}
const handleSearch=()=>{
  const searchterm = search.toLowerCase().trim();

  if (!searchterm) {
    setCompany(companyData);
    filteredIndustry(selectedIndustry)
  } else {
    const searched = companyData.filter(company =>
      company.name.toLowerCase().includes(searchterm)
    );
  
    if (searched.length === 0) {
      return <p>There are no companies with this name</p>;
    } else {
      setCompany(searched);
    }
  }

}
const handleSelect=(value)=>{
  setSelectedIndustry(value)
  filteredIndustry(value)
  console.log("handele select is clicked")
}

const filteredIndustry=(industry)=>{
  if(industry==="all-categories"){
    setCompany(companyData)
  }
  else{
    const fiterCompanyByindustry=companyData.filter(company=>(
      company.industry===industry
    ))
    setCompany(fiterCompanyByindustry)
  }


}

  return (
    <div className="flex flex-col px-10">
    
        <div className='flex flex-row px-10 w-full mt-4'>
                <div className="relative sm:w-1/2 md:w-2/3">
                    <input
                        type="text"
                        placeholder="Search Companies"
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        value={search}
                        onChange={handleChange}
                    />
                    <CiSearch className="absolute top-0 left-0 mt-4 sm:mt-3 md:mt-6  ml-3 text-gray-400 " />
                    <button onClick={handleSearch} className='ml-3 bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 sm:mt-3'>Search</button>
                </div>
                <div className='sm:w-1/2 md:w-1/3 p-3'>
                    <select onChange={(e)=>handleSelect(e.target.value)} className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500'>
                        <option  value="all-categories">All Categories</option>
                        <option value="Finance">Finance</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Health</option>
                        <option value="Education">Education</option>

                    </select>
                </div>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 px-10 mt-4">
      {company.map((company) => (
        <CompanyComponent
        id={company.id}
          key={company.id}
          logo={company.logoCompany}
          name={company.name}
          industry={company.industry}
          location={company.location}
          description={company.description}
          num={company.internships.length}
          // handleViewDetail={()=>handleViewDetail(company.id)}
        
        />
      ))}
   
    
      </div>
      <OtherPartner/>

      
      
    </div>
    
  );
};

export default CompanyHome;