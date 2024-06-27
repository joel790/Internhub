import { useState, useEffect } from "react";
import axios from "axios";
import CompanyComponent from "../../components/company/CompanyComponent";
import OtherPartner from "./otherPartner/OtherPartner";
import { CiSearch } from "react-icons/ci";

const CompanyHome = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all-categories");

  useEffect(() => {
    // Fetch companies from the backend
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/companies"); // Adjust the API endpoint as needed
        setCompanies(response.data.companies);
        setFilteredCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    const searchterm = searchTerm.toLowerCase().trim();

    if (!searchterm) {
      setFilteredCompanies(companies);
      filteredIndustry(selectedIndustry);
    } else {
      const searched = companies.filter(company =>
        company.name.toLowerCase().includes(searchterm)
      );

      setFilteredCompanies(searched);
    }
  };

  const handleSelect = (value) => {
    setSelectedIndustry(value);
    filteredIndustry(value);
  };

  const filteredIndustry = (industry) => {
    if (industry === "all-categories") {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.industry === industry
      );
      setFilteredCompanies(filtered);
    }
  };

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
          <button onClick={() => handleSearch(search)} className='ml-3 bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 sm:mt-3'>
            Search
          </button>
        </div>
        <div className='sm:w-1/2 md:w-1/3 p-3'>
          <select onChange={(e) => handleSelect(e.target.value)} className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500'>
            <option value="all-categories">All Categories</option>
            <option value="Finance">Finance</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 px-10 mt-4">
        {filteredCompanies.map((company) => (
          <CompanyComponent
            id={company._id}
            key={company._id}
            logo={company.logoCompany}
            name={company.companyDetails.name}
            industry={company.companyDetails.industry}
            location={company.companyDetails.location}
            description={company.companyDetails.description}
            num={company.companyDetails.internships.length}
          />
        ))}
      </div>
      <OtherPartner />
    </div>
  );
};

export default CompanyHome;
