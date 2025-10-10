'use client'
import React from "react";
import NavbarDesktop from "./components/ui/navbarDesktop";
import NavbarMobile from "./components/ui/navbarMobile";
import HeroSection from "./components/sections/hero-section/heroSection";
import Portfolio from "./components/sections/portfolioSection/portfolio";

const page = () => {
  return (
    <div>
      <header>
        <NavbarDesktop />
        <NavbarMobile />
        <HeroSection/>
      </header>
      <Portfolio/>
    </div>
  );
};

export default page;
