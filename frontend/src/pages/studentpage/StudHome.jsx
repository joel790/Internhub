import React, { useEffect, useState } from 'react';
import axios from 'axios';
import studentimg from "../../assets/student1.jpg";
import internshipimg from "../../assets/appy.jpg";
import networkingimg from "../../assets/career.jpg";
import Student from "../homepage/howtouse/Student";
import Company from "../homepage/howtouse/Company";
import { PiStudentFill } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import PlanCard from '../../components/paymentPlan/PlanCard';
import paymentimg from '../../assets/payment.png';
import { FaClosedCaptioning } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';

const Home = () => {
    const [selectedTab, setSelectedTab] = useState('Student');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/plans');
                setPlans(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className=''>
            <div className="lg:py-10 lg:px-10 relative lg:h-[500px] flex flex-col lg:flex-row">
                <div className="flex justify-center items-center lg:w-1/2">
                    <div className="w-full lg:w-4/5 p-8">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-blue-500">
                            Welcome Back to Intern-Hub
                        </h1>
                        <p className="text-xl lg:text-xl mb-8 text-gray-500">
                            At InternHub, we are committed to providing you with the best opportunities to gain real-world experience and connect with industry leaders. Now that you're logged in, explore new internships, enhance your skills, and grow your professional network. Your journey towards a successful career continues here.
                        </p>
                        <button
                            onClick={openModal}
                            className="text-center bg-blue-500 text-white p-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                            Apply for company
                        </button>
                    </div>
                </div>
                <div className="flex justify-center lg:w-1/2 relative">
                    <div
                        className="w-full lg:w-4/5 rounded-lg lg:max-h-full overflow-hidden relative"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)' }}
                    >
                        <img src={studentimg} className="w-full h-full object-cover" alt="student" />
                        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
                    </div>
                </div>
            </div>

            <div className="py-10 px-6 lg:px-32">
                <div className='flex flex-col items-center mb-10'>
                    <h1 className="text-4xl mb-4 text-blue-500 font-serif">How to use the system</h1>
                    <p className='text-slate-400'>What is your role?</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex gap-6 h-32 mb-6">
                        <div className={`text-blue-500 w-[250px] border border-gray-300 font-serif flex gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-lg ${selectedTab === 'Student' ? 'bg-blue-400 text-white' : ''}`}
                            onClick={() => setSelectedTab('Student')}
                        >
                            <PiStudentFill size={60} />
                            <h1>Student</h1>
                        </div>

                        <div className={`font-serif border w-[250px] text-blue-500 border-gray-300 flex gap-2 cursor-pointer justify-center items-center px-4 py-2 rounded-lg ${selectedTab === 'Company' ? 'bg-blue-400 text-white' : ''}`}
                            onClick={() => setSelectedTab('Company')}
                        >
                            <GrUserManager size={60} />
                            <h1>Company</h1>
                        </div>
                    </div>
                    <div className="mt-4 w-full rounded-md">
                        {selectedTab === 'Student' && (
                            <Student />
                        )}
                        {selectedTab === 'Company' && (
                            <Company />
                        )}
                    </div>
                </div>
            </div>

            <div className="py-10 px-6 lg:px-32 ">
                <h2 className="text-3xl mb-6 text-blue-500 font-serif text-center">Enhance Your Internship Experience</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
                        <img src={internshipimg} className="w-full h-48 object-cover" alt="internship" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-blue-500">Internship Opportunities</h3>
                            <p className="text-gray-500">
                                Discover a variety of internship opportunities tailored to your field of study and career goals. Gain hands-on experience and make valuable connections.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <img src={networkingimg} className="w-full h-48 object-cover" alt="networking" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-blue-500">Career Development</h3>
                            <p className="text-gray-500">
                                Participate in exclusive networking events and connect with industry professionals. Build relationships that can lead to future career opportunities.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <img src={studentimg} className="w-full h-48 object-cover" alt="skills" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2 text-blue-500">Skill Development</h3>
                            <p className="text-gray-500">
                                Enhance your skills through internships provided by different companies. Stay ahead in your career with continuous learning and development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-50 z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg  pt-6 mt-20 w-full max-w-4xl mx-auto relative">
                        <CgClose onClick={closeModal} className='cursor-pointer mt-8 absolute top-8 right-8 text-red-500 text-xl'/>
                        <div className='flex flex-col  lg:flex-row px-6 py-6 '>
                            <div className="lg:w-1/2 flex items-center justify-center bg-no-repeat bg-center">
                                <img src={paymentimg} alt="payment" className="w-full h-auto" />
                            </div>
                            <div className='text-center lg:w-1/2 px-4'>
                                <h1 className='text-3xl text-blue-500 py-4 font-bold font-serif'>Choose Your Plan</h1>
                                <p className='text-slate-500'>
                                    The higher the plan you choose, the more features of the system you get!
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center pb-6">
                            {isLoading ? (
                                <p>Loading plans...</p>
                            ) : error ? (
                                <p>Error fetching plans: {error}</p>
                            ) : (
                                plans.map((plan) => (
                                    <PlanCard
                                        key={plan._id}
                                        planName={plan.type}
                                        price={plan.price}
                                        features={plan.features}
                                        planId={plan._id}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
