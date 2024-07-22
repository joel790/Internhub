import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../components/internship/CustomArrows";
import { useNavigate } from "react-router";

const FeaturedInternships = () => {
  const navigate = useNavigate();
  const [featuredInternships, setFeaturedInternships] = useState([]);

  useEffect(() => {
    const fetchFeaturedInternships = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/company/internship/featured');
        setFeaturedInternships(response.data);
      } catch (error) {
        console.error('Error fetching featured internships:', error);
      }
    };

    fetchFeaturedInternships();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <section className="py-12 px-4 md:px-8 bg-white">
      <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-4">
        Featured Internships
      </h2>
      <p className="text-center text-gray-700 mb-8">
        Explore these featured internships – the most popular and sought-after opportunities.
      </p>
      <div className="relative max-w-6xl mx-auto">
        <Slider {...settings}>
          {featuredInternships.map((internship) => (
            <div key={internship._id} className="p-4">
              <div className="border border-slate-300  rounded-lg bg-white shadow-lg shadow-blue-200 overflow-hidden">
                <div className="flex items-center p-4 gap-2">
                  <img
                    src={internship.logo}
                    className="w-20 h-20 object-cover mx-auto mb-4 rounded-full shadow-md"
                    alt="Company Logo"
                  />                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{internship.title}</h3>
                    <p className="text-blue-600 text-sm">{internship.role}</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-gray-900 font-medium">Duration: <span className="font-normal">{internship.duration}</span></p>
                  <p className="text-gray-900 font-medium">Location: <span className="font-normal">{internship.location}</span></p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {internship.description}
                  </p>
                  <p className="text-gray-900 font-medium mt-2">Deadline: <span className="font-normal">{internship.deadline}</span></p>
                </div>
                <div className="px-4 pb-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-lg font-medium hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate(`/internship/${internship._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedInternships;
