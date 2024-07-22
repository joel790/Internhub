import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import DashboardHeader from "./header/DashboardHeader";
import { companySidebarData, studentSideBardata } from "../data/Data";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import imagegeb from "../assets/gebbbb.jpg";
import { IoReorderThreeOutline } from "react-icons/io5";
import imageportal from "../assets/images.png";
import "./animations.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export const DashboardLayout = ({ children, usertype }) => {
  const navigate = useNavigate();
  const sidebardata = usertype === "company" ? companySidebarData : studentSideBardata;
  const [toggleShow, setToggleShow] = useState(window.innerWidth >= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProfileClick = () => {
    console.log("Profile is clicked");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Clear token on logout
    navigate('/auth/login');
  };

  const handleToggleShow = () => {
    setToggleShow(!toggleShow);
  };

  const dropdowns = [
    {
      label: "Profile",
      icon: <CgProfile />,
      onClick: handleProfileClick,
    },
    {
      label: "Logout",
      icon: <IoIosLogOut />,
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar data={sidebardata} toggleShow={toggleShow} setToggleShow={setToggleShow} />

      <div className="md:hidden flex w-full">
        <IoReorderThreeOutline
          className="text-3xl cursor-pointer m-4"
          onClick={handleToggleShow}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full bg-white shadow-md p-4">
          <div className="flex items-center">
            <img src={imageportal} alt="Logo" className="w-12 h-12 object-cover mr-4" />
            <span className="font-bold text-xl text-gray-800">Dashboard</span>
          </div>
          <DashboardHeader image={imagegeb} dropdown={dropdowns} />
        </div>
        <div className="w-full p-4 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
