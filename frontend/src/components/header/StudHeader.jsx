import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';

const TopNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    navigate('/auth/login');
  };

  return (
    <>
      <nav className="bg-blue-500 text-white p-4 flex justify-between  items-center">
        <div className="flex space-x-4">
          <Link to index className="hover:underline">Dashboard</Link>
          <Link to="/applications" className="hover:underline">Applications</Link>
          <Link to="/internships" className="hover:underline">Internships</Link>
        </div>
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle size={24} />
            <HiChevronDown size={24} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 bg-blue-100 text-black rounded-md shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
              <Link to="/student/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default TopNav;
