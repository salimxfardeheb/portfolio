import React from "react";
import PortfolioCard from "./portfolioCard";

const Portfolio = () => {
  return (
    <div className="my-[100px] mx-[12%] flex flex-col justify-center items-center gap-12">
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center">
        <p className=" text-redOrange text-MobileHeader5 md:text-Header5">
          Case Studies
        </p>
        <p className="text-MobileHeader2 md:text-Header2">My Portfolio</p>
      </div>
      <PortfolioCard />
    </div>
  );
};

export default Portfolio;
