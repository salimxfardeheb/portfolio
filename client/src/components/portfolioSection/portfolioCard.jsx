import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import { motion as m } from "framer-motion";
import handleclick from "../../handleclick";

import EasyAcademia from "../../images/EasyAcademia.png";
import TenueTendance from "../../images/TenueTendance.png";
import FlexFret from "../../images/FlexFret.png";

const ItemsPortfolio = [
  {
    id: 1,
    title: "Easy Academia",
    image: EasyAcademia,
    description:
      "Experience an educational revolution with our all-in-one app. Simplify school management, provide full visibility, and transform the educational process. From transparent financial statistics to online bookings for students, our platform rethinks the way we think about teaching and school management. Explore an innovative educational experience today.",
  },
  {
    id: 2,
    title: "FlexFret",
    image: FlexFret,
    description:
      "Our website is distinguished by a sleek and modern design, offering a captivating visual experience. Intuitive interfaces guide users through smooth navigation, while dynamic graphical elements highlight the key benefits of our platform. The responsive design guarantees perfect adaptability on all devices, offering a neat aesthetic and flawless functionality, thus underlining our commitment to innovation and friendliness.",
  },
  {
    id: 3,
    title: "Tenue Tendance",
    image: TenueTendance,
    description:
      "Discover the elegance redefined with our latest design project! Our e-commerce website offers a seamless shopping experience, showcasing classic menswear. A sleek interface, captivating visuals, and a streamlined ordering process await you. Explore style with ease.",
  },
];

const portfolioCard = () => {


  return (
    <div className="flex flex-col gap-24 snap-mandatory snap-y scroll-p-12">
      {ItemsPortfolio.map((data) => (
        <div
          key={data.id}
          className={data.id % 2 === 0 ? `flex flex-col md:flex-row-reverse items-center justify-between gap-6 snap-always snap-center`: "flex flex-col md:flex-row items-center justify-between gap-6 snap-always snap-center" }
        >
          {/* image */}
          <div>
            <img
              src={data.image}
              alt=""
              className=" w-[566px] object-contain"
            />
          </div>
          {/* description */}
          <m.div
            className="md:w-1/2 flex flex-col gap-6 items-start"
            initial={{ opacity: 0, translateY: 100, scale: 0.95 }}
            whileInView={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ duration: 0.75 }}
          >
            <p className=" text-Header3">{data.title}</p>
            <p className="text-p text-nevada">{data.description}</p>
            <button
              className="flex items-center cursor-pointer hover:text-redOrange text-Header5 hover:scale-105 duration-200"
              onClick={handleclick}
            >
              Learn More
              <GrFormNextLink />
            </button>
          </m.div>
        </div>
      ))}
    </div>
  );
};

export default portfolioCard;
