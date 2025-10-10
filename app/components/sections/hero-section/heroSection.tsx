"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
  return (
    <div className="bg-hero h-screen bg-cover bg-center flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-16 text-white text-center my-[40%] md:my-[10%]">
        <div className="flex flex-col p-4 md:p-4">
          <span className="text-MobileHeader4 md:text-Header4">I'm </span>
          <span className=" text-MobileHeader2 md:text-Header2 md:font-Header2 font-MobileHeader2">
            Salim FARDEHEB
          </span>
        </div>
        <div className=" flex flex-col md:flex-row justify-start md:justify-center lg:justify-between mx-[12%] gap-12">
          <p className="md:text-5xl text-4xl text-start md:w-1/2 md:text-Header3 text-MobileHeader2 w-full">
            Fullstack web developper with Fast and modern tools.
          </p>
          <ScrollLink to="portfolio" smooth={true} duration={600} offset={-80} className="w-fit">
            <button className="px-9 py-5 text-white text-MobileHeader4 border-2 hover:bg-redOrange hover:scale-105 duration-200">
              See My Works
            </button>
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
