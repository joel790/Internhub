import React from 'react';
import { FaBars, FaTimes, FaUserCircle, FaHome, FaUser, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaArrowCircleRight, FaArrowAltCircleRight, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ openSideBar, showMenu, setShowMenu, setOpenSideBar, navigationList, footerNavigation }) => {
  const toggleSidebar = () => setOpenSideBar(!openSideBar);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div
      className={`transition-all duration-1000 ease-in-out z-50 bg-white sm:relative sm:flex sm:flex-col gap-2 sm:gap-16 rounded-br-xl  h-screen min-h-[600px] py-6 absolute top-0 sm:left-0 ${showMenu ? "left-0 h-screen overflow-y-auto px-5" : "-left-72 sm:left-0"} ${openSideBar ? "w-72 px-5" : "w-72 sm:w-24"} overflow-hidden`}
    >
      <div className={`transition-all duration-500 delay-700 ease-in-out flex gap-2 justify-start items-center ${openSideBar ? "sm:justify-start" : "sm:justify-center"} cursor-pointer relative z-30`}>
        <FaBars className={`h-7 cursor-pointer sm:hidden left-5 relative ${showMenu ? "block" : "hidden"}`} onClick={toggleMenu} />
        <Link to="/student" className={`text-blue-500 text-2xl font-bold ${openSideBar ? "block" : "block sm:hidden"}`}>Intern-Hub</Link>
        <FaTimes className={`h-7 cursor-pointer sm:hidden left-5 relative ${showMenu ? "block" : "hidden"}`} onClick={toggleMenu} />
        <div className={`h-10 w-10 pr-3 rounded-full bg-white absolute top-0 sm:flex justify-center items-center cursor-pointer hidden ${openSideBar ? "rotate-[180deg] -right-3" : "rotate-0 -right-3"}`} onClick={toggleSidebar}>
          <FaArrowRight size={25} className='text-blue-600' />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 sm:justify-between h-full mt-10 sm:mt-0">
        <div className="md:max-w-[234px]">
          {navigationList.map((data, index) => (
            <div key={index} className={`flex gap-2.5 items-center cursor-pointer py-2 group hover:bg-[#4F80E1]/[12%] group rounded-md overflow-hidden ${openSideBar ? "pl-5 justify-start flex-row" : "pl-5 sm:pl-0 justify-start sm:justify-center sm:flex-col"}`}>
              <div className='group-hover:text-[#4F80E1]'>{data.icon}</div>
              <span className={`font-medium text-base group-hover:text-[#4F80E1] text-[#637381] ${openSideBar ? "block" : "block sm:hidden group-hover:block sm:group-hover:text-xs"}`}>{data.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="max-w-[234px]">
            {footerNavigation.map((data, index) => (
              <div key={index} className={`bg-blue-500 -white flex gap-3 items-center justify-center cursor-pointer py-2 rounded-md group-hover:bg-blue-800 group ${openSideBar ? "pl-5 justify-start flex-row" : "pl-5 sm:pl-0 justify-start sm:justify-center sm:flex-col"}`}>
                <div className='text-white'>{data.icon}</div>
                <span className={`font-bold text-white text-base  ${openSideBar ? "block" : "block sm:hidden group-hover:block sm:group-hover:text-xs"}`}>{data.name}</span>
              </div>
            ))}
          </div>
          <div className={`flex gap-3 ${openSideBar ? "justify-start pl-5" : "justify-center"}`}>
            <FaUserCircle className={`hidden sm:block ${openSideBar ? "h-10 w-10" : "justify-center"}`} />
            <div className={`${openSideBar ? "block" : "hidden"}`}>
              <div className="flex flex-col pr-1">
                <span className="text-[#637381] text-sm xl:text-base font-medium truncate w-full max-w-20 cursor-pointer">Eyuel Joel</span>
                <span className="text-[#637381] text-xs xl:text-sm font-normal truncate w-full max-w-20 cursor-pointer">eyuel@Joel.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
