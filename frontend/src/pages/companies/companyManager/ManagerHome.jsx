import CompanyDashboard from "./CompanyDashboard";
import AppliedInternship from "./AppliedInternship";
import PostedInternship from "./PostedInternship";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { Route, Routes, Navigate } from "react-router-dom";
import CompanyProfile from "./CompanyProfile";

const ManagerHome = () => {
  return (
    <div className="bg-zinc-100 min-h-screen">
      <DashboardLayout usertype="company">
        <Routes>
          <Route path="/" element={<Navigate to="companydashboard" />} />
          <Route path="companydashboard" element={<CompanyDashboard />} />
          <Route path="appliedinternship" element={<AppliedInternship />} />
          <Route path="postedinternship" element={<PostedInternship />} />
          <Route path="companyprofile" element={<CompanyProfile/>}/>
        </Routes>
      </DashboardLayout>
    </div>
  );
};

export default ManagerHome;