"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import Reveal from "@/app/components/ui/Reveal";
import SectionHeading from "@/app/components/ui/SectionHeading";
import BrowserFrame from "@/app/components/ui/BrowserFrame";
import { homeProjects } from "@/app/data/portfolio";

const Myworks = () => {
  const { t, lang } = useLanguage();

  if (homeProjects.length === 0) return null;

  return (
    <section
      className="py-16 md:py-[100px] section-x flex flex-col justify-center items-center gap-12 md:gap-20"
      id="portfolio"
    >
      <Reveal className="w-full flex justify-center">
        <SectionHeading
          label={t.portfolio.label}
          title={t.portfolio.title}
          subtitle={t.portfolio.sectionSubtitle}
        />
      </Reveal>

      <div className="flex flex-col gap-16 md:gap-28 w-full">
        {homeProjects.map((project, index) => {
          const flipped = index % 2 === 1;

          return (
            <Reveal
              key={project.slug}
              className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center w-full"
            >
              {/* Screenshot */}
              <Link
                href={`/portfolio#${project.slug}`}
                aria-label={project.name}
                className={`block ${flipped ? "md:order-2" : ""}`}
              >
                <BrowserFrame host={project.host ?? project.name} accent={project.accent}>
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src={project.cover}
                      alt={project.name}
                      fill
                      sizes="(max-width: 900px) 88vw, 44vw"
                      className="object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              </Link>

              {/* Explanation */}
              <div className={`flex flex-col gap-5 ${flipped ? "md:order-1" : ""}`}>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-nevada/50 text-MobileHeader3 font-MobileHeader3 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] text-black/70 text-[12px] font-medium tracking-wide">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    {project.category[lang]}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-MobileHeader2 font-MobileHeader2 md:text-Header3 md:font-Header3 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-redOrange text-MobileHeader4 font-MobileHeader4">
                    {project.tagline[lang]}
                  </p>
                </div>

                <p className="text-p text-nevada leading-relaxed">
                  {project.summary[lang]}
                </p>

                <ul className="hidden md:flex flex-col gap-2.5">
                  {project.highlights[lang].slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-3 text-p leading-relaxed">
                      <FaCheck className="text-redOrange mt-1.5 shrink-0 text-[12px]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <dl className="hidden md:flex flex-wrap gap-x-10 gap-y-3 pt-1">
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-[11px] uppercase tracking-widest text-nevada/70">
                      {t.portfolio.duration}
                    </dt>
                    <dd className="text-p font-medium">{project.duration[lang]}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5 max-w-xs">
                    <dt className="text-[11px] uppercase tracking-widest text-nevada/70">
                      {t.portfolio.role}
                    </dt>
                    <dd className="text-p font-medium">{project.role[lang]}</dd>
                  </div>
                </dl>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-4 pt-2">
                  <Link
                    href={`/portfolio#${project.slug}`}
                    className="btn-primary group !text-MobileHeader5 !py-3 !px-6 w-full sm:w-auto"
                  >
                    {t.portfolio.caseStudy}
                    <FaArrowRight className="group-hover:translate-x-1 duration-200" />
                  </Link>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-p font-medium border-b-2 border-transparent hover:border-redOrange hover:text-redOrange transition-colors duration-200 py-3 sm:py-1"
                    >
                      {t.portfolio.visitProject}
                      <FaExternalLinkAlt className="text-[12px]" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="w-full sm:w-auto">
        <Link href="/portfolio" className="block">
          <button className="btn-primary group w-full sm:w-auto">
            {t.portfolio.cta}
            <FaArrowRight className="group-hover:translate-x-1 duration-200" />
          </button>
        </Link>
      </Reveal>
    </section>
  );
};

export default Myworks;
