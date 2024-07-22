// DashboardLayout.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import DashboardHeader from "./header/DashboardHeader";
import {
  companySidebarData,
  studentSideBardata,
  adminSidebarData,
} from "../data/Data";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import imagegeb from "../assets/gebbbb.jpg";
import { IoReorderThreeOutline } from "react-icons/io5";
import imageportal from "../assets/images.png";
import "./animations.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
export const DashboardLayout = ({ children, usertype }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  console.log(userInfo.user.name);

  const getSidebarData = () => {
    switch (usertype) {
      case "company":
        return companySidebarData;
      case "admin":
        return adminSidebarData;
      default:
        return studentSideBardata;
    }
  };

  const sidebardata = getSidebarData();
  const [toggleShow, setToggleShow] = useState(window.innerWidth >= 768);
  // eslint-disable-next-line no-unused-vars
  const [isOpening, setIsOpening] = useState(true);
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
    localStorage.removeItem("token"); // Clear token on logout
    navigate("/auth/login");
  };

  const handleToggleShow = () => {
    setIsOpening(!toggleShow);
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
    <div className="flex w-full">
      <div
        className={`bg-black min-h-screen fixed top-0 left-0 ${
          toggleShow
            ? isLargeScreen
              ? "w-64 sm:w-64"
              : "w-64 sm:w-64 animate-slideInFromLeft"
            : "hidden"
        } md:block md:w-64`}
      >
        <Sidebar
          data={sidebardata}
          toggleShow={toggleShow}
          setToggleShow={setToggleShow}
        />
      </div>

      <div className="md:hidden sm:flex">
        <IoReorderThreeOutline
          className="text-3xl cursor-pointer m-4"
          onClick={handleToggleShow}
        />
      </div>

      <div className="flex flex-col w-full bg-gray-100">
        <div className="flex items-center justify-between w-full bg-gray-100 p-2">
          <div className="flex items-center">
            <img
              src={imageportal}
              alt="Logo"
              className="w-10 h-10 object-cover mr-4"
            />
          </div>
          <DashboardHeader
            image={imagegeb}
            name={userInfo.user.name}
            dropdown={dropdowns}
          />
        </div>

        <div className="w-full min-h-screen bg-zinc-300 p-4 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
