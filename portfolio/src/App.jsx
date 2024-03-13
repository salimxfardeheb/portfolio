import React from "react";
import NavbarDesktop from "./navbar/navbarDesktop";
import NavbarMobile from "./navbar/navbarMobile";
import HeroSection from "./hero-section/heroSection";
import Card from "./cards/cards";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./portfolioSection/portfolio";
import Footer from "./footer/Footer";

import Professional from "./images/rating-cards/Professional.png";
import Fast from "./images/rating-cards/Fast.png";
import Communication from "./images/rating-cards/Communications.png";

import ScreenIcon from './images/Services/Devices.png'
import Design_system from './images/Services/designSystem.png'
import figmaIcone from './images/Services/Figma.png'

const descriptionsAdv = [
  "A seasoned professional in my field, I bring expertise and dedication to ensure top-tier work.",
  "Swift and efficient, I prioritize timely project delivery without compromising quality.",
  "Adept at clear and open communication, I foster collaboration for successful project outcomes.",
];

const descriptionServices = [
  "I design captivating interfaces for desktop and mobile platforms, prioritizing seamless user experiences across devices.",
  "I create prototypes using Figma and Adobe XD, bringing designs to life with interactive and user-friendly experiences.",
  "I employ a design system to streamline and enhance the consistency of my creations, ensuring a cohesive and polished aesthetic in my designs."
]

const App = () => {
  return (
    <>
      <div className="relative md:mb-[25%] mb-[200%] sm:mb-[100%] lg:mb-[12%]">
        <NavbarDesktop />
        <NavbarMobile />
        <HeroSection />
        <div className="flex flex-col md:flex-row mx-[12%] gap-12 absolute top-[90%]">
          <Card
            icon={Professional}
            title="Professional"
            description={descriptionsAdv[0]}
          />
          <Card icon={Fast} title="Fast" description={descriptionsAdv[1]} />
          <Card
            icon={Communication}
            title="Communication"
            description={descriptionsAdv[2]}
          />
        </div>
      </div>
      <AboutMe />
      <Portfolio />
      <div className="flex flex-col md:flex-row mx-[12%] gap-12 my-24">
          <Card
            icon={ScreenIcon}
            title="Desktop & Mobile Screens"
            description={descriptionServices[0]}
          />
          <Card icon={Design_system} title="Design System" description={descriptionServices[1]} />
          <Card
            icon={figmaIcone}
            title="Figma & adobe XD Prototype"
            description={descriptionServices[2]}
          />
        </div>
        <Footer/>
    </>
  );
};

export default App;
