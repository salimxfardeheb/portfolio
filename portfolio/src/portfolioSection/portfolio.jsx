import React from "react";
import { GrFormNextLink } from "react-icons/gr";

import EasyAcademia from "../images/EasyAcademia.png";
import TenueTendance from "../images/TenueTendance.png";
import FlexFret from "../images/FlexFret.png";

const Portfolio = () => {
  const handleLearnMore = () => {
    alert("Comming Soon !");
  };
  return (
    <div className="my-[100px] mx-[12%] flex flex-col justify-center items-center gap-12">
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center">
        <p className=" text-redOrange text-MobileHeader5 md:text-Header5">
          Case Studies
        </p>
        <p className="text-MobileHeader2 md:text-Header2">My Portfolio</p>
      </div>
      <div className="flex flex-col gap-24">
        {/* Easy Academia */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6">
          {/* image */}
          <div>
            <img
              src={EasyAcademia}
              alt=""
              className=" w-[566px] object-contain"
            />
          </div>
          {/* description */}
          <div className="md:w-1/2 flex flex-col gap-6 items-start">
            <p className=" text-Header3">Easy Academia</p>
            <p className="text-p text-nevada">
              Experience an educational revolution with our all-in-one app.
              Simplify school management, provide full visibility, and transform
              the educational process. From transparent financial statistics to
              online bookings for students, our platform rethinks the way we
              think about teaching and school management. Explore an innovative
              educational experience today.
            </p>
            <button
              className="flex items-center cursor-pointer hover:text-redOrange text-Header5 hover:scale-105 duration-200"
              onClick={handleLearnMore}
            >
              Learn More
              <GrFormNextLink />
            </button>
          </div>
        </div>
        {/* FlexFret */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* image */}
          <div>
            <img src={FlexFret} alt="" className=" w-[566px] object-contain" />
          </div>
          {/* description */}
          <div className="md:w-1/2 flex flex-col gap-6 items-start">
            <p className=" text-Header3">FlexFret</p>
            <p className="text-p text-nevada">
              Our website is distinguished by a sleek and modern design,
              offering a captivating visual experience. Intuitive interfaces
              guide users through smooth navigation, while dynamic graphical
              elements highlight the key benefits of our platform. The
              responsive design guarantees perfect adaptability on all devices,
              offering a neat aesthetic and flawless functionality, thus
              underlining our commitment to innovation and friendliness.
            </p>
            <button
              className="flex items-center cursor-pointer hover:text-redOrange text-Header5 hover:scale-105 duration-200"
              onClick={handleLearnMore}
            >
              Learn More
              <GrFormNextLink />
            </button>
          </div>
        </div>
        {/* TenuTendance */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6">
          {/* image */}
          <div>
            <img
              src={TenueTendance}
              alt=""
              className=" w-[566px] object-contain"
            />
          </div>
          {/* description */}
          <div className="md:w-1/2 flex flex-col gap-6 items-start">
            <p className=" text-Header3">Tenue Tendance</p>
            <p className="text-p text-nevada">
              Discover the elegance redefined with our latest design project!
              Our e-commerce website offers a seamless shopping experience,
              showcasing classic menswear. A sleek interface, captivating
              visuals, and a streamlined ordering process await you. Explore
              style with ease.
            </p>
            <button
              className="flex items-center cursor-pointer hover:text-redOrange text-Header5 hover:scale-105 duration-200"
              onClick={handleLearnMore}
            >
              Learn More
              <GrFormNextLink />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
