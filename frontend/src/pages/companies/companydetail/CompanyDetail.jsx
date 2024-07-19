/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../../../components/footer/Footer";
import photo from "../../../assets/company.png";
import { CiLocationOn } from "react-icons/ci";
import "./CompanyDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CompanyDetail = () => {
  const { id } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/companies/${id}`);
        setCompanyDetail(response.data.companyDetails);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetail();
  }, [id]);
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (!companyDetail) {
    return <div>No company found</div>;
  }

  return (
    <>
      {/* <Header /> */}
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row w-full mt-6 px-10">
          <img src={photo} alt="Company Photo" className="w-full md:w-1/2 " />
          <div className="w-full md:w-1/2 flex flex-col  md:pl-4">
            <div className="flex flex-row gap-0 ">
              <img src={companyDetail.logo} alt="Company Logo" className="w-28 h-16 object-contain" />
              <h1 className=" text-sky-600 text-2xl font-bold ">{companyDetail.name}</h1>
              <h1 className=" text-sky-600 text-2xl font-bold ">{companyDetail.slogan}</h1>
            </div>
            <p>{companyDetail.description}</p>
          </div>
        </div> 
        <div className="mt-4 px-10">
          <h1 className="text-2xl font-bold text-blue-600 text-center">Internship Opportunities</h1>
          <div className="px-4 ">
            {companyDetail.internships && companyDetail.internships.length <= 2 ?
              <div className="flex flex-col md:flex-row gap-5 justify-center">
                {companyDetail.internships.map((intern) => (
                  <div key={intern.id} className="mt-4 border border-slate-400 p-4 w-72 rounded-xl h-[350px]">
                    <div className="flex flex-row items-center px-4 gap-1">
                      <img src={companyDetail.logo} alt="Company Logo" className="w-32 h-16 object-contain mb-4 md:mb-0" />
                      <h1 className="font-bold px-4">{intern.name}</h1>
                    </div>
                    <h2 className="font-bold">{intern.title}</h2>
                    <div className="flex flex-col md:flex-row mt-2 items-center">
                      <h2 className="md:mr-4">Duration: {intern.duration}</h2>
                      <h2>Location: {intern.location}</h2>
                    </div>
                    <p className="md:block">{intern.description}</p>
                    <div className="flex flex-col md:flex-row items-center mt-2">
                      <h2 className="md:mr-4">Deadline: {intern.deadline}</h2>
                      <div className="flex items-center">
                        <CiLocationOn className="text-rose-600 mr-1" />
                        <p className="text-sm">{companyDetail.location}</p>
                      </div>
                    </div>
                    <button className="w-full text-white bg-blue-600 items-center rounded-xl">View</button>
                  </div>
                ))}
              </div>
              :
              <Slider {...settings}>
                {companyDetail.internships && companyDetail.internships.map((intern) => (
                  <div key={intern.id} className="mt-4 border border-slate-400 p-4 rounded-xl flex-col h-[350px]">
                    <div className="flex flex-row items-center px-4 gap-1">
                      <img src={companyDetail.logo} alt="Company Logo" className="w-32 h-16 object-contain mb-4 md:mb-0" />
                      <h1 className="font-bold">{intern.title}</h1>
                    </div>
                    <h2 className="font-bold px-4">{intern.title}</h2>
                    <div className="px-4 flex flex-col md:flex-row mt-2 items-center">
                      <h2 className="md:mr-4">Duration: {intern.duration}</h2>
                      <h2>Location: {intern.location}</h2>
                    </div>
                    <p className="px-4 hidden md:block">{intern.description}</p>
                    <div className="px-4 flex flex-col md:flex-row items-center mt-2">
                      <h2 className="md:mr-4">Deadline: {intern.deadline}</h2>
                      <div className="flex items-center">
                        <CiLocationOn className="text-rose-600 mr-1" />
                        <p className="text-sm">{companyDetail.location}</p>
                      </div>
                    </div>
                    <button className="w-full text-white bg-blue-600 mt-5 items-center rounded-xl">View</button>
                  </div>
                ))}
              </Slider>
            }
          </div>
        </div>
        {/* <CompanyContact companyDetail={companyDetail} /> */}
      </div>
      <Footer />
    </>
  );
}

export default CompanyDetail;
