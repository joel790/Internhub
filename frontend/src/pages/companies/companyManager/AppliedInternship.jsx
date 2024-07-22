
import { useLocation } from "react-router";
import ProductTable from "./ProductTable";

 const AppliedInternship = () => {
  
  const location=useLocation()
  const internshipId=location.state||{}
  console.log(internshipId)
  
 

  return (
    
  <div className="overflow-x-auto bg-white min-h-screen">
  
  <ProductTable  internId={internshipId}/>
</div>
  )
}

export default AppliedInternship