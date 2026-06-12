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

import {
  FaChevronUp,
  FaUserTie,
  FaBolt,
  FaComments,
  FaCode,
  FaServer,
  FaDatabase,
} from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

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
            icon={<FaUserTie />}
            title={t.cards.professional}
            description={t.cards.professionalDesc}
            color="blue"
          />
          <Card
            icon={<FaBolt />}
            title={t.cards.fast}
            description={t.cards.fastDesc}
            color="yellow"
          />
          <Card
            icon={<FaComments />}
            title={t.cards.communication}
            description={t.cards.communicationDesc}
            color="green"
          />
        </div>
      </header>
      <AboutMe />
      <Portfolio />
      <div
        className="flex flex-col items-center gap-12 mx-[12%] my-[100px]"
        id="services"
      >
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <Card
            icon={<FaCode />}
            title={t.services.webInterface}
            description={t.services.webInterfaceDesc}
            color="cyan"
          />
          <Card
            icon={<FaServer />}
            title={t.services.serverWeb}
            description={t.services.serverWebDesc}
            color="indigo"
          />
          <Card
            icon={<FaDatabase />}
            title={t.services.database}
            description={t.services.databaseDesc}
            color="yellow"
          />
        </div>
        <Link href="/services">
          <button className="px-9 py-5 text-black hover:text-white text-MobileHeader4 border-2 hover:bg-redOrange duration-200">
            {t.services.cta}
          </button>
        </Link>
      </div>
      <TemplatesTeaser />
      <Toolkit />
    </div>
  );
};

export default page;
