import React from "react";
import Link from "next/link";

const Myworks = () => {
  return (
    <div
      className="my-[100px] mx-[12%] flex flex-col justify-center items-center min-h-screen"
      id="portfolio"
    >
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center">
        <p className=" text-redOrange text-MobileHeader5 md:font-Header5 font-MobileHeader5 md:text-Header5">
          Works
        </p>
        <p className="text-MobileHeader2 font-MobileHeader2 md:text-Header2 md:font-Header2">
          My Portfolio
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-10 w-full">
        <div className="text-MobileHeader2 font-MobileHeader2 md:text-Header2 md:font-Header2 text-center text-redOrange">
          <p>As Full-Stack developer</p>
        </div>
        <div className="md:hidden">
          <img src="/images/portfolio_dev.png" alt="Dev" />
        </div>
        <div className="mx-auto">
          <Link href="/portfolio">
            <div className="relative w-[420px] h-[520px] group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out hidden md:block">
              <img
                src="/images/My_Portfolio_website.png"
                alt="Top image"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-in-out scale-105 group-hover:translate-x-[10%] group-hover:brightness-110"
              />
              <img
                src="/images/FlexFret.png"
                alt="Bottom image"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-in-out scale-105 group-hover:translate-x-[70%] group-hover:rotate-2 group-hover:brightness-110"
              />
              <img
                src="/images/location-costume.png"
                alt="Bottom image"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-in-out scale-105 group-hover:-translate-x-[70%] group-hover:-rotate-2 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/portfolio">
            <button className="px-9 py-5 text-black hover:text-white text-MobileHeader4  border-2 hover:bg-redOrange duration-200">
              See My Works
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Myworks;
