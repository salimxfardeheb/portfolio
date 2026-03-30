"use client";
import React, { useEffect, useState } from "react";
import NavbarDesktop from "./components/ui/navbarDesktop";
import NavbarMobile from "./components/ui/navbarMobile";
import HeroSection from "./components/sections/hero-section/heroSection";
import Portfolio from "./components/sections/portfolioSection/portfolio";
import Card from "./components/ui/cards";
import AboutMe from "./components/sections/aboutMe/AboutMe";
import Toolkit from "./components/sections/toolkit/toolkit";
import TemplatesTeaser from "./components/sections/templatesTeaser/TemplatesTeaser";
import { useLanguage } from "./context/LanguageContext";

import { FaChevronUp } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

const page = () => {
  const [showButton, setShowButton] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("up");
      if (heroSection) {
        const { top, bottom } = heroSection.getBoundingClientRect();
        setShowButton(bottom <= window.innerHeight && top >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ScrollLink
        to="up"
        smooth={true}
        duration={600}
        offset={-80}
        className="absolute"
      >
        <div
          className={
            showButton ? "ButtonUP -right-96 " : "buttonUP md:right-10 right-5 "
          }
        >
          <FaChevronUp className="text-white md:h-10 md:w-10 h-5 w-5" />
        </div>
      </ScrollLink>
      <header className="relative md:mb-[25%] lg:mb-[12%]">
        <NavbarDesktop />
        <NavbarMobile />
        <HeroSection />
        <div className="flex flex-col md:flex-row mx-[12%] gap-12 md:absolute top-[90%] my-20 md:my-4 lg:my-0">
          <Card
            icon="/images/rating-cards/Professional.png"
            title={t.cards.professional}
            description={t.cards.professionalDesc}
          />
          <Card
            icon="/images/rating-cards/Fast.png"
            title={t.cards.fast}
            description={t.cards.fastDesc}
          />
          <Card
            icon="/images/rating-cards/Communications.png"
            title={t.cards.communication}
            description={t.cards.communicationDesc}
          />
        </div>
      </header>
      <AboutMe />
      <Portfolio />
      <div
        className="flex flex-col md:flex-row mx-[12%] gap-12 my-[100px]"
        id="services"
      >
        <Card
          icon="/images/Services/Devices.png"
          title={t.services.desktopMobile}
          description={t.services.desktopMobileDesc}
        />
        <Card
          icon="/images/Services/webInterface.png"
          title={t.services.webInterface}
          description={t.services.webInterfaceDesc}
        />
        <Card
          icon="/images/Services/ServerWeb.png"
          title={t.services.serverWeb}
          description={t.services.serverWebDesc}
        />
      </div>
      <TemplatesTeaser />
      <Toolkit />
    </div>
  );
};

export default page;
