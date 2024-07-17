/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";


const Sidebar = ({data,toggleShow,setToggleShow}) => {
  const handleToggle = () => {
    setToggleShow(false);
  };

  return (
    <div className="relative">
      {toggleShow && (
        <div className="absolute top-4 right-4 md:hidden">
          <IoReorderThreeOutline onClick={handleToggle} className="text-3xl text-white cursor-pointer" />
        </div>
      )}
      <div className={`bg-black h-full ${toggleShow ? 'w-64' : 'w-72'}`}>
        <ul className="flex flex-col">
          {data.map((item, index) => (
            <li key={index} className="py-2">
              <Link
                to={item.link}
                className="flex items-center text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <span className="mr-2 text-xl">{item.icon}</span>
                <span className="text-lg">{item.heading}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;