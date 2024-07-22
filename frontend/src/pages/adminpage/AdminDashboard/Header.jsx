// Header.jsx
import React from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";

const Header = ({ showMenu, setShowMenu, adminName }) => {
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="pt-5 pl-8 pr-7 py-5 bg-white flex justify-between gap-2">
      <div className="hidden sm:flex max-w-2xl justify-between w-full">
        <div className="flex flex-col">
          <span className="text-base md:text-xl text-[#212B36] font-semibold">
            Hello {adminName}!
          </span>
          <span className="text-sm font-normal">
            Welcome back to the admin dashboard.
          </span>
        </div>
        <div className="lg:max-w-sm w-2/5 lg:w-full border focus-within:border-blue-600 rounded-lg border-[#E7E7E7] py-3 px-4 justify-between items-center max-h-12 hidden md:flex">
          <input
            type="text"
            className="outline-none w-9/12"
            placeholder="Search..."
          />
          <FaSearch />
        </div>
      </div>
      <div className="flex gap-2 items-center sm:hidden">
        <FaBars onClick={toggleMenu} />
        <span className="text-xl font-semibold">Intern-Hub</span>
      </div>
      <div className="hidden sm:flex gap-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-[#E7E7E7] relative cursor-pointer group">
          <FaBell className="text-gray-400" />
          <div className="w-5 h-5 rounded-full bg-[#f82e2e] absolute -top-2.5 -right-1.5 text-white text-center text-xs font-medium flex justify-center items-center">
            4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
