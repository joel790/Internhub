import axios from "axios"
import { useEffect, useState } from "react"

    const CompanyDashboard = () => {
    const [allInternship,setAllInternship]=useState([])
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
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Total Students</h2>
        <p className="text-2xl font-bold">10</p>
      </div>
      <div className="bg-red-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Total Internships</h2>
        <p className="text-2xl font-bold">{allInternship.length}</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Accepted Internships</h2>
        <p className="text-2xl font-bold">3</p>
      </div>
    </div>
  </div>
  )
}
export default CompanyDashboard
