// import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../components/internship/CustomArrows";
import { internshipData } from "../../data/internshipdata/InternshipData";
import { useNavigate } from "react-router";

const FeaturedInternships = () => {
  const navigate = useNavigate();

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
    <section className="my-8">
      <h2 className="text-3xl font-bold text-blue-600 text-center">
        Featured Internships
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Explore the following featured internships. These are the most applied
        internships.
      </p>
      <div className="relative p-20">
        <Slider {...settings}>
          {internshipData.map((internship, index) => (
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
                  onClick={() => navigate(`/internship/${internship.id}`)}
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
