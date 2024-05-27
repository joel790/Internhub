import { useState } from "react";
import home from "../../assets/homeillu.png"
import Student from "./howtouse/Student";
import Company from "./howtouse/Company";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('Student'); // Default selected tab

  return (
    <div className=' '  >
      <div className="lg:py-10 lg:px-10 relative lg:h-[500px] flex flex-col lg:flex-row">
        <div className="flex justify-center items-center lg:w-1/2">
          {/* Text Content */}
          <div className="w-full lg:w-4/5  p-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-blue-500">
              Welcome to Intern-Hub
            </h1>
            <p className="text-xl lg:text-xl mb-8 text-gray-500">
            InternHub is dedicated to bridging the gap between academia and industry, ensuring that
             students gain valuable real-world experience while companies
             find the talent they need to thrive. Join us today and take the first step towards 
             a successful future
            </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
               get started
              </button>
          </div>
        </div>
        <div className="flex justify-center lg:w-1/2">
          {/* Travel Image */}
          <img src={home} className="w-full lg:w-4/5 lg:max-h-full" alt="home Logo" />
        </div>
      </div>


      <div className=" ">
        <div className='items-center   flex-col lg:px-32 lg:my-10'>
          <h1 className="text-4xl mb-4 text-blue-500 font-serif">How to use the system</h1>
          <p className='text-slate-400'> What is your role?</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex rounded-full justify-center border bg-slate-100 w-full lg:w-2/3 p-2 shadow-md">
            <ul className="flex gap-4 ">
              {/* the active link Background white */}

              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Student' ? 'bg-white' : ''} transition duration-500`}
                onClick={() => setSelectedTab('Student')}
              >
                Student
              </li>
              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Company' ? 'bg-white' : ''} transition duration-500`}
                onClick={() => setSelectedTab('Company')}
              >
                Company
              </li>
           
            </ul>
          </div>
          <div className="mt-4 w-full px-10 rounded-md">
            {/* Conditionally render the outlet content based on the selected tab */}
            {selectedTab === 'Student' && (
              <Student />
            )}
            {selectedTab === 'Company' && (
              <Company />
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;