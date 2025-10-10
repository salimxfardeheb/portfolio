import React from "react";
import { TypeAnimation } from "react-type-animation";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Link from "next/link";

const HeroSection = () => {
  return (
    // background image
    <div className="bg-hero md:h-screen bg-cover bg-center flex flex-col justify-center items-center">
      {/* short description */}
      <div className="flex flex-col items-center text-white gap-10 lg:gap-4 text-center my-[30%] md:my-[10%] md:space-y-12">

        <div className="flex flex-col p-10 md:p-4">
          <span className="text-MobileHeader4 md:text-Header4">I'm </span>
          <span className=" text-MobileHeader2 md:text-Header2">
            Salim FARDEHEB
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:gap-14 gap-20 justify-center items-center md:mx-[5%] lg:mx-[12%]">
          <div className="hero_container md:flex-row-reverse">
            <div>
              <img src="./images/design.png" />
            </div>
            <p>
              A designer specializing in graphics for both web and mobile
              platforms
            </p>
          </div>
          <div className="hero_container md:flex-row ">
            <div>
              <img src="./images/dev.png" />
            </div>
            <p className="text-5xl">Fullstack web developper with Fast and modern tools.</p>
          </div>
        </div>
              {/* CTA Button (see my works) */}
      <div className="mt-9">
        <AnchorLink href="/portfolio">
          <button className="px-9 py-5 text-white text-MobileHeader4 border-2 hover:bg-redOrange hover:scale-105 duration-200">
            See My Works
          </button>
        </AnchorLink>
      </div>
      </div>

    </div>
  );
};

export default HeroSection;
