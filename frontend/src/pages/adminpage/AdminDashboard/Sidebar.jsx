/* eslint-disable react/prop-types */
import React from "react";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({
  openSideBar,
  showMenu,
  setShowMenu,
  setOpenSideBar,
  navigationList,
  footerNavigation,
  setActiveTab,
  activeTab,
}) => {
  const toggleSidebar = () => setOpenSideBar(!openSideBar);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div
      className={`transition-all duration-1000 ease-in-out z-50 bg-white sm:relative sm:flex sm:flex-col gap-2 sm:gap-16 rounded-br-xl h-screen min-h-[600px] py-6 absolute top-0 sm:left-0 ${
        showMenu ? "left-0 h-screen overflow-y-auto px-5" : "-left-72 sm:left-0"
      } ${openSideBar ? "w-72 px-5" : "w-72 sm:w-24"} overflow-hidden`}
    >
      <div
        className={`transition-all duration-500 delay-700 ease-in-out flex gap-2 justify-start items-center ${
          openSideBar ? "sm:justify-start" : "sm:justify-center"
        } cursor-pointer relative z-30`}
      >
        <FaBars
          className={`h-7 cursor-pointer sm:hidden left-5 relative ${
            showMenu ? "block" : "hidden"
          }`}
          onClick={toggleMenu}
        />
        <Link
          to="/"
          className={`text-blue-500 text-2xl font-bold ${
            openSideBar ? "block" : "block sm:hidden"
          }`}
        >
          Intern-Hub
        </Link>
        <FaTimes
          className={`h-7 cursor-pointer sm:hidden left-5 relative ${
            showMenu ? "block" : "hidden"
          }`}
          onClick={toggleMenu}
        />
        <div
          className={`h-10 w-10 pr-3 rounded-full bg-white absolute top-0 sm:flex justify-center items-center cursor-pointer hidden ${
            openSideBar ? "rotate-[180deg] -right-3" : "rotate-0 -right-3"
          }`}
          onClick={toggleSidebar}
        >
          <FaArrowRight size={25} className="text-blue-600" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 sm:justify-between h-full mt-10 sm:mt-0">
        <ul
          className={`flex flex-col gap-2.5 px-4 sm:px-0 h-full ${
            openSideBar ? "w-full" : "sm:items-center"
          }`}
        >
          {navigationList.map(({ title, icon }, index) => (
            <li
              key={index}
              className={`group cursor-pointer flex items-center gap-3.5 py-3.5 px-4 w-full rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-50 ${
                activeTab === title ? "bg-blue-50 text-blue-500" : ""
              }`}
              onClick={() => setActiveTab(title)}
            >
              {React.createElement(icon, { size: 18 })}
              <span
                className={`${
                  openSideBar ? "block" : "hidden sm:group-hover:block"
                } text-sm font-medium ${
                  activeTab === title ? "text-blue-500" : "text-black"
                }`}
              >
                {title}
              </span>
            </li>
          ))}
        </ul>
        <ul
          className={`flex flex-col gap-2.5 px-4 sm:px-0 ${
            openSideBar ? "w-full" : "sm:items-center "
          }`}
        >
          {footerNavigation.map(({ path, title, icon }, index) => (
            <li
              key={index}
              className="group cursor-pointer flex items-center gap-3.5 py-3.5 px-4 w-full rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200"
            >
              <Link
                to={path}
                className={`flex items-center gap-4 bg-blue-500 w-full p-3 justify-center rounded-md text-white font-bold`}
              >
                {React.createElement(icon, { size: 18 })}
                <span
                  className={`${
                    openSideBar ? "block" : "hidden sm:group-hover:block"
                  } text-sm font-medium `}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
