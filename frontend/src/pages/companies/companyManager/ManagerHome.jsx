import CompanyDashboard from "./CompanyDashboard"
import AppliedInternship from "./AppliedInternship"
import PostedInternship from "./PostedInternship"
// import { companySidebarData } from "../../../data/Data"
import { DashboardLayout } from "../../../components/DashboardLayout"
import { Route, Routes } from "react-router"
const ManagerHome = () => {
  return (
    <div>
      <DashboardLayout usertype="company">
        <Routes>
          <Route path="companydashboard" element={<CompanyDashboard />} />
          <Route path="appliedinternship" element={<AppliedInternship />} />
          <Route path="postedinternship" element={<PostedInternship />} />
        </Routes>
      </DashboardLayout>
    </div>
  )
}
export default ManagerHome
