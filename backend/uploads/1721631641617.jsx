import axios from "axios"
import { useEffect, useState } from "react"

    const CompanyDashboard = () => {
    const [allInternship,setAllInternship]=useState([])
    const [totalApplications,setTotalApplications]=useState(0)
    useEffect(() => {
    const getInternship = async () => {
    try {
    const response = await axios.get("http://localhost:5000/api/company/internship/my-internship");
    if (response.status === 200) {
     setAllInternship(response.data);
        } else {
          console.log("You cannot fetch the internships");
        }
      } catch (error) {
        console.error("An error occurred while fetching the internships:", error);
      }
    };

    getInternship();
  }, []);


useEffect(() => {
  // Calculate total number of applications whenever allInternship changes
  const total = allInternship.reduce((acc, curr) => acc + curr.applications.length, 0);
  setTotalApplications(total);
}, [allInternship]);
  
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-green-300">
        <h2 className="text-xl font-semibold mb-2">Total Applicants</h2>
        <p className="text-2xl font-bold">{totalApplications}</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-green-300">
        <h2 className="text-xl font-semibold mb-2">Total Internships</h2>
        <p className="text-2xl font-bold">{allInternship.length}</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-green-300">
        <h2 className="text-xl font-semibold mb-2">Accepted Internships</h2>
        <p className="text-2xl font-bold">3</p>
      </div>
    </div>
  </div>
  )
}
export default CompanyDashboard
