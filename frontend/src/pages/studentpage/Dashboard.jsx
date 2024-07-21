import React, { useState } from 'react';
import Sidebar from './StudDashboard/Sidebar';
import Header from './StudDashboard/Header';
import Card from './StudDashboard/Card';
import Messages from './StudDashboard/Messages';
import RecentOrders from './StudDashboard/RecentOrders';
import { FaArrowUp, FaArrowDown, FaChartLine, FaChartPie, FaHome, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaUser, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import TopNav from '../../components/header/StudHeader';

const Dashboard = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const navigationList = [
    { name: 'Dashboard', icon: <FaHome/> },
    { name: 'Applications', icon: <FaThumbsUp /> },
    { name: 'Profiles', icon: <FaEnvelope /> },
    { name: 'Payments', icon: <FaCog /> },
    { name: 'Help', icon: <FaQuestionCircle /> },
  ];

  const footerNavigation = [
    { name: 'Logout', icon: <FaSignOutAlt /> },
  ];

  const messages = [
    {
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'John Doe',
      message: 'Hey, I need some help!',
      time: '2 hours ago',
    },
    // Add more messages here
  ];

  const orders = [
    {
      orderId: '12345',
      product: 'Product A',
      date: '2023-07-20',
      amount: '$100',
      status: 'Pending',
    },
    // Add more orders here
  ];

  return (
    <div className="flex">
      <Sidebar openSideBar={openSideBar} showMenu={showMenu} setShowMenu={setShowMenu} setOpenSideBar={setOpenSideBar} navigationList={navigationList} footerNavigation={footerNavigation} />
      <div className="flex flex-col flex-1 bg-[#F9FAFB] relative">

        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
        <div className="p-6 space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card type="Revenue" percentage="10%" arrow={<FaArrowUp />} price="$10,000" graph={<FaChartLine />} />
            <Card type="Orders" percentage="5%" arrow={<FaArrowDown />} price="100" graph={<FaChartPie />} />
            <Card type="Sales" percentage="15%" arrow={<FaArrowUp />} price="200" graph={<FaChartLine />} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Messages messages={messages} />
            <RecentOrders orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;