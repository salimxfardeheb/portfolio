import React from "react";
import { string } from "prop-types";



const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white md:w-1/3 flex flex-col items-center gap-4 px-5 pt-4 pb-7 rounded-2xl shadow-xl">
      <div>
        <img src={icon} alt={`${title} icon`} />{" "}
      </div>
      <div>
        <p className=" text-MobileHeader4 lg:text-Header4">{title}</p>
      </div>
      <div>
        <p className="text-MobileHeader5 lg:text-Header5 text-nevada text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

Card.defaultProps = {
    icon: string,
    title: string,
    description: string,
  };

export default Card;
