"use client";
import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import Reveal from "@/app/components/ui/Reveal";
import SectionHeading from "@/app/components/ui/SectionHeading";
import portfolioData from "@/app/portfolio.json";

const Myworks = () => {
  const { t } = useLanguage();
  const featured = portfolioData.slice(0, 3);

  return (
    <Reveal
      className="py-[100px] mx-[12%] flex flex-col justify-center items-center gap-14"
      id="portfolio"
    >
      <SectionHeading
        label={t.portfolio.label}
        title={t.portfolio.title}
        subtitle={t.portfolio.asFullstack}
      />

      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {featured.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Permanent gradient keeps the title readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            {/* Title + reveal-on-hover CTA */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-1.5">
              <h3 className="text-white text-MobileHeader4 md:text-Header4 font-semibold">
                {project.title}
              </h3>
              <span className="flex items-center gap-2 text-redOrange text-p font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {t.portfolio.visitProject}
                <FaArrowRight className="text-sm" />
              </span>
            </div>
            {/* Brand ring on hover */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-redOrange/0 group-hover:ring-redOrange/70 transition-all duration-300 pointer-events-none" />
          </a>
        ))}
      </div>

      {/* CTA */}
      <Link href="/portfolio">
        <button className="btn-primary group">
          {t.portfolio.cta}
          <FaArrowRight className="group-hover:translate-x-1 duration-200" />
        </button>
      </Link>
    </Reveal>
  );
};

export default Myworks;
