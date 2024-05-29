// import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from './CustomArrows';
import { initialInternships } from '../../data/internshipdata/InitialInternships';
 


const FeaturedInternships = () => {
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold text-blue-600 text-center">Featured Internships</h2>
      <p className="text-center text-gray-600 mb-4">Explore the following featured internships. These are the most applied internships.</p>
      <div className="relative p-20">
        <Slider {...settings}>
          {initialInternships.map((initialInternship, index) => (
            <div key={index} className="p-2">
              <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex">
                  <img src={initialInternship.logo} className="w-8  mr-1" alt="logo" />
                <h3 className="font-bold text-lg text-gray-700">{initialInternship.title}</h3>
                </div>
                <p className="text-blue-600">{initialInternship.role}</p>
                <p className="text-gray-900 font-medium">Duration: {initialInternship.duration}</p>
                <p className="text-gray-600 font-medium">Location: {initialInternship.location}</p>
                <p className="text-gray-600">{initialInternship.description}</p>
                <p className="text-gray-600 font-medium">Deadline: {initialInternship.deadline}</p>
                <button className="bg-blue-600 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">View</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedInternships;
