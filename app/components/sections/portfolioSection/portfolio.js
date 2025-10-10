import React from "react";
import Link from "next/link";

const Myworks = () => {
  return (
    <div
      className="my-[100px] mx-[12%] flex flex-col justify-center items-center gap-20"
      id="portfolio"
    >
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center">
        <p className=" text-redOrange text-MobileHeader5 md:text-Header5">
          Case Studies
        </p>
        <p className="text-MobileHeader2 md:text-Header2">My Portfolio</p>
      </div>
      <div className="flex flex-col gap-32">
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
        <div>
          <Link href="/portfolio">
          <img src="./images/portfolio_design.png" /></Link>
        </div>
        <div className="text-MobileHeader2 md:text-Header2 text-center text-redOrange flex flex-col justify-center items-center h-fit my-auto mx-auto gap-10 ">
          <div>
            <Link href="/portfolio/graphicdesign">
              <button className="px-9 py-5 text-black hover:text-white text-MobileHeader4  border-2 hover:bg-redOrange hover:scale-105 duration-200">
                See My Works
              </button>
            </Link>
          </div>
          <p>As Graphic designer</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse justify-between gap-10 w-full">
        <div className="mx-auto">
          <Link href="/portfolio">
          <img src="./images/portfolio_dev.png" className="max-w-72 md:max-w-2xl"/></Link>
        </div>
        <div className="text-MobileHeader2 md:text-Header2 text-center text-redOrange flex flex-col justify-center items-center h-fit my-auto mx-auto gap-10 ">
          <div>
            <Link href="/portfolio/fullstack">
              <button className="px-9 py-5 text-black hover:text-white text-MobileHeader4  border-2 hover:bg-redOrange hover:scale-105 duration-200">
                See My Works
              </button>
            </Link>
          </div>
          <p>As Full-Stack developer</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Myworks;
