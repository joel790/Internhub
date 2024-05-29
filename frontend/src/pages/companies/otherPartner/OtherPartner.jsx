/* eslint-disable react/prop-types */
import other from "../../../assets/other.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { companyData } from "../../../data/companydata/CompanyData";
const OtherPartner = () => {
  function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
   
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


  return (
    <div className="flex flex-col mt-6 gap-2 px-10">
      <div className="flex flex-col justify-center items-center w-full px-4 mt-2">
      <img
        className="w-64 h-64 md:w-96 md:h-96 px-6   mb-4"
        src={other}
        alt="there is no company image"
      />
      <h1 className="text-2xl text-blue-700 font-bold text-center px-6 mb-2 md:text-3xl">
        What Our Partners Say
      </h1>
      <p className="md:w-1/2 sm:w-full px-6 mt-4">
        At Intern-Hub, we are proud of the impact we have made in connecting
        talented students with leading companies. Dont just take our word for
        it – hear what our partners have to say about their experiences with
        our platform.
      </p>
    </div>
    <div className=" px-5 py-4">
    <Slider {...settings} >
    {companyData.map((company)=>(

<div key={company.id} className="mt-4  border border-slate-400 p-4 w-72 rounded-xl  h-[350px] overflow-y-auto  px-6">
    <img src={company.logoCompany} alt="Company Logo" className="w-32 h-16 object-contain mb-4 md:mb-0" />
    <h1 className="font-bold px-4">{company.name}</h1>
      <p className="sm:w-full">{company.description}</p>
      <p className="flex items-end mt-11 gap-2">
    Manager:<span className="text-2xl font-bold">{company.manager}</span>
  </p>

        




</div>

))}
    </Slider>
    
    

    </div>
    
    </div>
  
  );
};

export default OtherPartner;