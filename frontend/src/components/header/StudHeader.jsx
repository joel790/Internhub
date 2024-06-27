import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdLogin, MdPerson } from 'react-icons/md';
import Logo from "../../assets/Logo1.png"
const StudHeader = () => {
  const topData = [
    { path: '/', text: 'Home', icon: null },
    { path: '/internship', text: 'Internship', icon: null },
    { path: '/company', text: 'Company', icon: null },
    { path: '/study', text: 'Study', icon: null },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleMenuItemClick = (index) => {
    setSelected(index);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };


  return (
    <>
      <header className='top-header  bg-gray-50 z-50 fixed top-0 right-0 left-0 h-16 flex items-center pl-10 justify-between'>
        <div className='flex gap-2 items-center '>
          <img src={Logo} alt="Logo"  className='h-[60px]'/>
          <h1 className='text-blue-500 text-lg font-bold'>Intern-Hub</h1>
        </div>

        <div className='flex items-center pr-5 md:hidden'>
          {menuOpen ? (
            <MdClose
              className='text-red-300 cursor-pointer'
              size={24}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <MdMenu
              className='text-blue-500 cursor-pointer'
              size={24}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        <nav className='hidden md:flex items-center'>
          {topData.map((item, index) => (
            <>
              <Link
                key={index}
                to={item.path}
                className={`nav-text ${selected === index ? '  text-blue-500  font-serif ' : ''}`}
                onClick={() => handleMenuItemClick(index)}
              >
                {item.text}
              </Link>
            </>
          ))}
        </nav>
        <nav className='nav-link hidden md:flex gap-4'>
          <Link to='/student' className='nav-text text-white hover:text-white  bg-blue-500 '>Dashboard</Link>
        </nav>
      </header>
      {menuOpen && (
        <div className='md:hidden  py-6 px-6 mr-6 bg-gray-50 border-sky-400 border rounded-xl fixed top-16 left-0  w-full z-20  '>
          {topData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className='nav-text'
              onClick={() => handleMenuItemClick(index)}
            >
              {item.text}
            </Link>
          ))}
          <hr />
          <Link to='/student' className='nav-text '><MdPerson size={23} />Dashboard</Link>
        </div>
      )}
      <div className='pt-16'></div>
    </>
  );
};

export default StudHeader;
