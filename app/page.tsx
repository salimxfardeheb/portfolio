'use client'
import React from "react";
import NavbarDesktop from "./components/ui/navbarDesktop";
import NavbarMobile from "./components/ui/navbarMobile";
import HeroSection from "./components/sections/hero-section/heroSection";
import Portfolio from "./components/sections/portfolioSection/portfolio";
import Card from "./components/ui/cards";
import { descriptionsAdv } from "./variables";
import AboutMe from "./components/sections/aboutMe/AboutMe";

const page = () => {
  return (
    <div>
      <header className="relative md:mb-[25%] lg:mb-[12%]">
        <NavbarDesktop />
        <NavbarMobile />
        <HeroSection/>
        <div className="flex flex-col md:flex-row mx-[12%] gap-12 md:absolute top-[90%] my-20 md:my-4 lg:my-0">
          <Card
            icon="/images/rating-cards/Professional.png"
            title="Professional"
            description={descriptionsAdv[0]}
          />
          <Card
            icon="/images/rating-cards/Fast.png"
            title="Fast"
            description={descriptionsAdv[1]}
          />
          <Card
            icon="/images/rating-cards/Communications.png"
            title="Communication"
            description={descriptionsAdv[2]}
          />
        </div>
      </header>
      <AboutMe/>
      <Portfolio/>
    </div>
  );
};

export default page;
