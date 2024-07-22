// components/CompanyInternships.jsx
import React, { useEffect, useState } from 'react';
import internshipService from '../../../services/InternshipService';
import { CiLocationOn } from 'react-icons/ci';
import Slider from 'react-slick';
import { useNavigate } from 'react-router';
import Loader from '../../../components/loader/Loader';

const CompanyInternships = ({ companyId }) => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const data = await internshipService.getInternshipsOfCompany(companyId);
                setInternships(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, [companyId]);

    if (loading) return <div><Loader/> </div>;
    if (error) return <p className='text-red-500'> {error}</p>;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="flex flex-col gap-4">
            {internships.length === 0 ? (
                <p className='text-red-500'>No internships found</p>
            ) : (
                <Slider {...settings}>
                    {internships.map((intern) => (
                        <div key={intern._id} className="p-2">
                            <div className="border rounded-lg p-4 bg-white shadow-sm">
                                <div className="flex mb-2">
                                    {intern.logo && (
                                        <img src={intern.logo} className="w-8 h-8 mr-2" alt="Company Logo" />
                                    )}
                                    <h3 className="font-bold text-lg text-gray-700">
                                        {intern.title}
                                    </h3>
                                </div>
                                <p className="text-blue-600">{intern.role}</p>
                                <p className="text-gray-900 font-medium">
                                    Duration: {intern.duration}
                                </p>
                                <p className="text-gray-600 font-medium">
                                    Location: {intern.location}
                                </p>
                                <p className="text-gray-600 line-clamp-3">{intern.description}</p>
                                <p className="text-gray-600 font-medium">
                                    Deadline: {intern.deadline}
                                </p>
                                <button
                                    className="bg-blue-600 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
                                    onClick={() => navigate(`/internship/${intern._id}`)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default CompanyInternships;
