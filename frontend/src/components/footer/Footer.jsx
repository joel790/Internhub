import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white rounded-lg shadow-md m-2">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="http://localhost:5173/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <div className="rounded-full p-1">
              <img src={Logo} className="h-8 rounded-full" alt="Tourism Logo" />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Intern-Hub</span>
          </Link>
          <ul className="flex flex-wrap items-center text-sm text-gray-200">
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">Terms and use</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-200 sm:text-center">© 2024 
          <Link to="http://localhost:5173/" className="hover:underline"> Intern-Hub</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
