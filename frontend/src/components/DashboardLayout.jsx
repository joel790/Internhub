import { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import DashboardHeader from "./header/DashboardHeader";
import { companySidebarData, studentSideBardata } from "../data/Data";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import imagegeb from "../assets/gebbbb.jpg";
import { IoReorderThreeOutline } from "react-icons/io5";
import logo from "../assets/Logo1.png";
import { Link } from "react-router-dom";
import "./animations.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const DashboardLayout = ({ children, usertype }) => {
  // Get userInfo from the Redux store
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  // console.log(userInfo.user.name);

  const sidebardata =
    usertype === "company" ? companySidebarData : studentSideBardata;
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile"
        );
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    console.log("Profile is clicked");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token"); // Clear token on logout
    navigate("/auth/login");
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
    <div className="flex w-full ">
      <div
        className={`bg-zinc-100 min-h-screen fixed top-14 left-0 ${
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

      <div className="md:hidden flex w-full">
        <IoReorderThreeOutline
          className="text-3xl cursor-pointer m-4"
          onClick={handleToggleShow}
        />
      </div>

      <div className="flex flex-col w-full bg-gray-100">
        <div className="flex items-center justify-between w-full fixed bg-gray-100 p-2">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="h-10 w-10" />
              <Link to="/" className="text-lg font-bold text-blue-600">
                Intern-Hub
              </Link>
            </div>
          </div>
          <DashboardHeader
            image={imagegeb}
            name={userName}
            dropdown={dropdowns}
          />
        </div>

        <div className="w-full min-h-screen bg-white p-4 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
