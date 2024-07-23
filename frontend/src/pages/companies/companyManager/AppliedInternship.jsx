
import { useLocation } from "react-router";
import ProductTable from "./ProductTable";

 const AppliedInternship = () => {
  
  const location=useLocation()
  const internshipId=location.state||{}
  
 

  return (
    
  <div className="overflow-x-auto bg-white min-h-screen">
  
  <ProductTable  internId={internshipId}/>
</div>
  )
}

export default AppliedInternship