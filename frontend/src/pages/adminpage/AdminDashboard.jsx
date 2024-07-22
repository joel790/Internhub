import { useState } from "react";
import Sidebar from "./AdminDashboard/Sidebar";
import Header from "./AdminDashboard/Header";
import Card from "./AdminDashboard/Card";
import Messages from "./AdminDashboard/Messages";
import RecentOrders from "./AdminDashboard/RecentOrders";
import Applications from "./AdminDashboard/Applications";
import PricingPlan from "./AdminDashboard/PricingPlan";
import Companies from "./AdminDashboard/Companies";
import {
  FaChartLine,
  FaChartPie,
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

  const navigationList = [
    { title: "Dashboard", icon: FaHome },
    { title: "Applications", icon: FaThumbsUp },
    { title: "Companies", icon: FaIndustry },
    { title: "PricingPlan", icon: FaMoneyCheckAlt },
    { title: "Profiles", icon: FaEnvelope },
    { title: "Payments", icon: FaCog },
    { title: "Help", icon: FaQuestionCircle },
  ];

  const footerNavigation = [
    { path: "/logout", title: "Logout", icon: FaSignOutAlt },
  ];

  const messages = [
    {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "John Doe",
      message: "Hey, I need some help!",
      time: "2 hours ago",
    },
    {
      image: "https://randomuser.me/api/portraits/men/31.jpg",
      name: "John Doe",
      message: "Hey, I need some help!",
      time: "1 hours ago",
    },
    {
      image: "https://randomuser.me/api/portraits/men/30.jpg",
      name: "John Doe",
      message: "Hey, I need some help!",
      time: "4 hours ago",
    },
  ];

  const approvals = [
    {
      applicationId: "123",
      company: "Tech Corp",
      date: "2023-07-20",
      status: "Approved",
    },
    {
      applicationId: "346",
      company: "Future tech",
      date: "2023-07-23",
      status: "Rejected",
    },
    {
      applicationId: "124",
      company: "New Tech",
      date: "2023-07-16",
      status: "Approved",
    },
  ];

  const adminStats = [
    {
      type: "Companies",
      percentage: "10",
      arrow: "up",
      count: 120,
      graph: <FaChartLine />,
    },
    {
      type: "Internships",
      percentage: "5",
      arrow: "down",
      count: 200,
      graph: <FaChartPie />,
    },
    {
      type: "Applications",
      percentage: "15",
      arrow: "up",
      count: 300,
      graph: <FaChartLine />,
    },
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
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {adminStats.map((stat, index) => (
                <Card
                  key={index}
                  type={stat.type}
                  percentage={stat.percentage}
                  arrow={stat.arrow}
                  count={stat.count}
                  graph={stat.graph}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Messages messages={messages} />
              <RecentOrders approvals={approvals} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex">
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
      <div className="flex flex-col flex-1 bg-[#F9FAFB] relative">
        <Header
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          adminName="Admin"
        />
        <div className="p-6 space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
