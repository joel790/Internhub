import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import logo from "../../assets/Logo1.png"
const TopNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const navigate = useNavigate();
  let lastScrollTop = 0;
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Downscroll
        setIsScrollingUp(false);
      } else {
        // Upscroll
        setIsScrollingUp(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Implement logout functionality here
    navigate('/auth/login');
  };

  return (
    <nav className={`bg-white shadow-md text-black p-4 flex justify-between z-30 items-center transition-transform duration-300 ${isScrollingUp ? 'sticky top-0' : ''}`}>
      <div className="flex items-center space-x-2">
        <img src={logo} alt="logo" className="h-10 w-10" />
        <Link to="/" className="text-lg font-bold  text-blue-600">Intern-Hub</Link>
      </div>
      <div className="flex justify-center flex-grow space-x-4">
        <Link to="/applications" className="hover:text-blue-600">Applications</Link>
        <Link to="/internship" className="hover:text-blue-600">Internships</Link>
        <Link to="/company" className="hover:text-blue-600">Companies</Link>
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
          <div className="absolute right-0 z-10 mt-2 w-48 bg-blue-50 text-black rounded-md shadow-lg py-2">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
            <Link to="/student/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
