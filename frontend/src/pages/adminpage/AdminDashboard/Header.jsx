/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { FaBars, FaBell, FaSearch } from "react-icons/fa";

const Header = ({
  showMenu,
  setShowMenu,
  adminName,
  userRole,
  userEmail,
  userAvatar,
}) => {
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
      </div>
      <div className="flex gap-2 items-center sm:hidden">
        <FaBars onClick={toggleMenu} />
        <span className="text-xl font-semibold">Intern-Hub</span>
      </div>
      <div className="hidden sm:flex gap-4 items-center">
        <div className="flex items-center space-x-4">
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold">{userRole}</span>
            <span className="text-sm text-gray-500">{userEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
