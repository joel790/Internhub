/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Sidebar = ({data}) => {
  



  return (
   
    <div className="bg-black h-full w-full fixed top-0 md:w-1/4">
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
  );
};

export default Sidebar;