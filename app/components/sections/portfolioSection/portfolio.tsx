"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import portfolioData from "@/app/portfolio.json";

const Myworks = () => {
  const { t } = useLanguage();
  const featured = portfolioData.slice(0, 3);

  return (
    <div
      className="py-[100px] mx-[12%] flex flex-col justify-center items-center gap-14"
      id="portfolio"
    >
      {/* Header */}
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center text-center">
        <p className="text-redOrange text-MobileHeader5 md:font-Header5 font-MobileHeader5 md:text-Header5">
          {t.portfolio.label}
        </p>
        <p className="text-MobileHeader2 font-MobileHeader2 md:text-Header2 md:font-Header2">
          {t.portfolio.title}
        </p>
        <p className="text-MobileHeader2 font-MobileHeader2 md:text-Header2 md:font-Header2 text-redOrange">
          {t.portfolio.asFullstack}
        </p>
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {featured.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[280px] object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 gap-3">
              <h3 className="text-white text-MobileHeader4 md:text-Header4 font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {project.title}
              </h3>
              <span className="text-redOrange text-p font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {t.portfolio.visitProject} →
              </span>
            </div>
            {/* Always-visible title on mobile */}
            <div className="md:hidden bg-black/70 px-4 py-3">
              <h3 className="text-white text-MobileHeader4 font-semibold">{project.title}</h3>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <Link href="/portfolio">
        <button className="px-9 py-5 text-black hover:text-white text-MobileHeader4 border-2 hover:bg-redOrange duration-200">
          {t.portfolio.cta}
        </button>
      </Link>
    </div>
  );
};

export default Myworks;
