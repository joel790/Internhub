/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';


const DashboardHeader = ({ name, dropdown }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer">
        {/* <img
          src={image}
          alt="User Profile"
          className="object-cover rounded-full h-10 w-10"
        /> */}
         <h1 className="text-lg font-semibold">{name}</h1>
        <FaUserCircle/>
       
      </div>
      <div className="relative">
        <IoIosArrowDown
          className="text-lg cursor-pointer"
          onClick={handleToggleDropdown}
        />
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white text-center rounded-lg  py-2 z-20">
            <ul>
              {dropdown.map((drop, index) => (
                <li
                  key={index}
                  onClick={drop.onClick}
                  className="cursor-pointer hover:text-gray-700 py-2 px-4"
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">{drop.icon}</span>
                    <h3 className="text-sm">{drop.label}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
