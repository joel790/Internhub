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
        const response = await axios.get('http://localhost:5000/api/company/internships/featured');
        setFeaturedInternships(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching featured internships:', error);
      }
    };

    fetchFeaturedInternships();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
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
    <section className="">
      <h2 className="text-3xl font-bold text-blue-600 text-center">
        Featured Internships
      </h2>
      <p className="text-center text-gray-600">
        Explore the following featured internships. These are the mostly applied
        internships.
      </p>
      <div className="relative pl-20 pr-20 pt-5">
        <Slider {...settings}>
          {featuredInternships.map((internship, index) => (
            <div key={index} className="p-2">
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex">
                  <img src={internship.logo} className="w-8  mr-1" alt="logo" />
                  <h3 className="font-bold text-lg text-gray-700">
                    {internship.title}
                  </h3>
                </div>
                <p className="text-blue-600">{internship.role}</p>
                <p className="text-gray-900 font-medium">
                  Duration: {internship.duration}
                </p>
                <p className="text-gray-600 font-medium">
                  Location: {internship.location}
                </p>
                <p className="text-gray-600">{internship.description}</p>
                <p className="text-gray-600 font-medium">
                  Deadline: {internship.deadline}
                </p>
                <button
                  className="bg-blue-600 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
                  onClick={() => navigate(`/internship/${internship._id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedInternships;
