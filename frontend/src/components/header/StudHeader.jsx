import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import logo from "../../assets/Logo1.png";
import axios from "axios"
import { toast } from 'react-toastify';
const TopNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [userName, setUserName] = useState(''); // Add state for user name
  const navigate = useNavigate();
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
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


  useEffect(() => {
    const fetchUserData = async () => {

        try {
            const response = await axios.get('http://localhost:5000/api/users/profile')

            const data = response.data;
            setUserName(data.email);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, []);


const handleLogout = async () => {
  try {
    await axios.post('http://localhost:5000/api/users/logout', {}, {
      withCredentials: true, // Ensure cookies are sent with the request
    });
    toast.success('Logout successful');
    navigate('/auth/login');
  } catch (error) {
    console.error('Error during logout:', error);
    toast.error('Failed to logout');
  }
};

  return (
    <nav className={`bg-white shadow-md text-black p-4 flex justify-between z-30 items-center transition-transform duration-300 ${isScrollingUp ? 'sticky top-0' : ''}`}>
      <div className="flex items-center space-x-2">
        <img src={logo} alt="logo" className="h-10 w-10" />
        <Link to="/" className="text-lg font-bold text-blue-600">Intern-Hub</Link>
      </div>
      <div className="flex justify-center flex-grow space-x-4">
        <Link to="/student" className="hover:text-blue-600">Home</Link>
        <Link to="/student/applications" className="hover:text-blue-600">Applications</Link>
        <Link to="/student/internships" className="hover:text-blue-600">Internships</Link>
        <Link to="/student/companies" className="hover:text-blue-600">Companies</Link>
      </div>
      <div className="relative flex items-center space-x-2">
        <span className="text-black font-semibold">{userName}</span> {/* Display user name */}
        <button
          className="flex items-center space-x-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaUserCircle size={24} />
          <HiChevronDown size={24} />
        </button>
        {dropdownOpen && (
          <div className="absolute border right-0 z-10 mt-56 w-48 bg-white text-black rounded-md shadow-lg py-2">
            <Link to="/student/profile" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Profile</Link>
            <Link to="/student/dashboard" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Dashboard</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-400 hover:text-white">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
