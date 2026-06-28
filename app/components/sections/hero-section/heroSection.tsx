"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

const highlight = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="text-redOrange">
        {part}
      </span>
    ) : (
      part
    )
  );

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-hero relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center overflow-hidden">
      {/* Calque de contraste pour la lisibilité + profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80 pointer-events-none" />

      <div className="hero-animate relative z-10 flex flex-col items-center text-center text-white px-6 max-w-4xl mx-auto gap-6 md:gap-8 pt-28 pb-20">
        {/* Badge de réassurance */}
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2 text-MobileHeader5 font-MobileHeader4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-redOrange opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-redOrange" />
          </span>
          {t.hero.badge}
        </span>

        {/* Titre */}
        <h1 className="text-MobileHeader1 md:text-Header1 font-MobileHeader1 md:font-Header1 leading-[1.1] tracking-tight">
          {highlight(t.hero.title)}
        </h1>

        {/* Sous-titre */}
        <p className="max-w-2xl text-MobileHeader4 md:text-Header4 font-MobileHeader4 text-white/80 leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* CTA — primaire (plein) vs secondaire (contour) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full sm:w-auto">
          <ScrollLink
            to="portfolio"
            smooth={true}
            duration={600}
            offset={-80}
            className="w-full sm:w-fit"
          >
            <button className="group flex items-center justify-center gap-2.5 w-full sm:w-fit px-8 py-4 bg-redOrange text-white text-MobileHeader4 font-MobileHeader4 rounded-md shadow-lg shadow-redOrange/30 hover:scale-105 hover:shadow-redOrange/50 duration-200">
              {t.hero.cta}
              <FaArrowRight className="group-hover:translate-x-1 duration-200" />
            </button>
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={600}
            offset={-80}
            className="w-full sm:w-fit"
          >
            <button className="w-full sm:w-fit px-8 py-4 border-2 border-white/40 text-white text-MobileHeader4 font-MobileHeader4 rounded-md hover:border-white hover:bg-white/10 duration-200">
              {t.hero.cta2}
            </button>
          </ScrollLink>
        </div>
      </div>

      {/* Indice de scroll */}
      <ScrollLink
        to="about"
        smooth={true}
        duration={600}
        offset={-80}
        className="absolute bottom-8 z-10 cursor-pointer"
        aria-label="Scroll to next section"
      >
        <FaChevronDown className="h-6 w-6 text-white/60 hover:text-white animate-bounce duration-200" />
      </ScrollLink>
    </div>
  );
};

export default HeroSection;
