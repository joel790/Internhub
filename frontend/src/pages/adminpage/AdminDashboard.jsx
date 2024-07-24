import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./AdminDashboard/Sidebar";
import Header from "./AdminDashboard/Header";
import Applications from "./AdminDashboard/Applications";
import PricingPlan from "./AdminDashboard/PricingPlan";
import Companies from "./AdminDashboard/Companies";
import TableCard from "./AdminDashboard/TableCard";
import RecentApplications from "./AdminDashboard/RecentApplications";
import ActiveInternships from "./AdminDashboard/ActiveInternships";
import {
  FaHome,
  FaEnvelope,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaThumbsUp,
  FaIndustry,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/profile"
      );
      const userData = response.data;
      setUserName(userData.name);
      setUserRole(userData.role);
      setUserEmail(userData.email);
      setUserAvatar(userData.avatar); // Assuming the API provides an avatar URL
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const navigationList = [
    { title: "Dashboard", icon: FaHome },
    { title: "Applications", icon: FaThumbsUp },
    { title: "Companies", icon: FaIndustry },
    { title: "PricingPlan", icon: FaMoneyCheckAlt },
    { title: "Profiles", icon: FaEnvelope },
 
  ];

  const footerNavigation = [
    { path: "/logout", title: "Logout", icon: FaSignOutAlt },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Applications":
        return <Applications />;
      case "PricingPlan":
        return <PricingPlan />;
      case "Companies":
        return <Companies />;
      case "Dashboard":
      default:
        return (
          <>
            <TableCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentApplications />
              <ActiveInternships />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        openSideBar={openSideBar}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        setOpenSideBar={setOpenSideBar}
        navigationList={navigationList}
        footerNavigation={footerNavigation}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="flex flex-col flex-1">
        <Header
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          adminName={userName}
          userRole={userRole}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
        <div className="p-6 space-y-6 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
