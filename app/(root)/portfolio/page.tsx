"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaArrowRight,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import BrowserFrame from "@/app/components/ui/BrowserFrame";
import { portfolioProjects } from "@/app/data/portfolio";
import type { Shot } from "@/app/data/projects/types";

type LightboxState = { shots: Shot[]; index: number } | null;

const PortfolioPage = () => {
  const { t, lang } = useLanguage();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox(
        (lb) =>
          lb && { ...lb, index: (lb.index - 1 + lb.shots.length) % lb.shots.length }
      ),
    []
  );
  const next = useCallback(
    () => setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.shots.length }),
    []
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <div className="min-h-screen bg-black text-white lg:py-12 pt-48 pb-24">
      {/* ---------- Page header ---------- */}
      <div className="mx-[8%] lg:mx-[12%] flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-redOrange" />
          <span className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5 uppercase tracking-widest">
            {t.portfolio.pageLabel}
          </span>
          <span className="h-[2px] w-8 bg-redOrange" />
        </div>
        <h1 className="text-MobileHeader1 font-MobileHeader1 md:text-Header1 md:font-Header1 leading-tight">
          {t.portfolio.pageTitle}
        </h1>
        <p className="text-p text-white/60 max-w-2xl leading-relaxed">
          {t.portfolio.pageSubtitle}
        </p>

        {/* Jump links */}
        <nav className="flex flex-wrap justify-center gap-3 pt-2">
          {portfolioProjects.map((project, i) => (
            <a
              key={project.slug}
              href={`#${project.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-MobileHeader5 hover:border-redOrange hover:text-redOrange transition-colors duration-200"
            >
              <span className="text-white/40 tabular-nums text-[12px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {project.name}
            </a>
          ))}
        </nav>
      </div>

      {/* ---------- Case studies ---------- */}
      <div className="mx-[8%] lg:mx-[12%] flex flex-col gap-28 mt-24">
        {portfolioProjects.map((project, index) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-32 flex flex-col gap-10"
          >
            {/* Heading */}
            <header className="flex flex-col gap-4 border-t border-white/10 pt-10">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white/25 text-MobileHeader3 font-MobileHeader3 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.07] text-white/75 text-[12px] font-medium tracking-wide">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  {project.category[lang]}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-MobileHeader1 font-MobileHeader1 md:text-Header2 md:font-Header2 leading-tight">
                    {project.name}
                  </h2>
                  <p className="text-redOrange text-MobileHeader4 font-MobileHeader4">
                    {project.tagline[lang]}
                  </p>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group shrink-0 !text-MobileHeader5 !py-3 !px-6"
                  >
                    {t.portfolio.visitProject}
                    <FaExternalLinkAlt className="text-[12px] group-hover:translate-x-0.5 duration-200" />
                  </a>
                )}
              </div>

              {/* Meta strip */}
              <dl className="grid sm:grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 mt-2">
                <div className="flex flex-col gap-1">
                  <dt className="text-[11px] uppercase tracking-widest text-white/40">
                    {t.portfolio.duration}
                  </dt>
                  <dd className="text-p">{project.duration[lang]}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[11px] uppercase tracking-widest text-white/40">
                    {t.portfolio.role}
                  </dt>
                  <dd className="text-p">{project.role[lang]}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[11px] uppercase tracking-widest text-white/40">
                    {t.portfolio.stack}
                  </dt>
                  <dd className="flex flex-wrap gap-2 pt-0.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/[0.07] text-[12px] text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </header>

            {/* Cover */}
            <BrowserFrame host={project.host ?? project.name} accent={project.accent} variant="dark">
              <button
                type="button"
                onClick={() =>
                  project.gallery[0] &&
                  setLightbox({ shots: project.gallery[0].shots, index: 0 })
                }
                className="block w-full cursor-zoom-in"
                aria-label={project.name}
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={project.cover}
                    alt={project.name}
                    fill
                    sizes="(max-width: 900px) 84vw, 76vw"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                </div>
              </button>
            </BrowserFrame>

            {/* Summary */}
            <p className="text-MobileHeader4 font-MobileHeader5 text-white/85 leading-relaxed max-w-4xl">
              {project.summary[lang]}
            </p>

            {/* Challenge / Solution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 flex flex-col gap-3">
                <h3 className="text-redOrange text-[11px] uppercase tracking-widest">
                  {t.portfolio.challenge}
                </h3>
                <p className="text-p text-white/70 leading-relaxed">
                  {project.challenge[lang]}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 flex flex-col gap-3">
                <h3 className="text-redOrange text-[11px] uppercase tracking-widest">
                  {t.portfolio.solution}
                </h3>
                <p className="text-p text-white/70 leading-relaxed">
                  {project.solution[lang]}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-5">
              <h3 className="text-MobileHeader3 font-MobileHeader3 md:text-Header4 md:font-Header4">
                {t.portfolio.highlights}
              </h3>
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                {project.highlights[lang].map((item) => (
                  <li key={item} className="flex gap-3 text-p text-white/75 leading-relaxed">
                    <FaCheck className="text-redOrange mt-1.5 shrink-0 text-[12px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            {project.gallery.length > 0 && (
            <div className="flex flex-col gap-8">
              <h3 className="text-MobileHeader3 font-MobileHeader3 md:text-Header4 md:font-Header4">
                {t.portfolio.gallery}
              </h3>

              {project.gallery.map((group) => (
                <div key={group.title.en} className="flex flex-col gap-4">
                  <p className="text-[11px] uppercase tracking-widest text-white/40">
                    {group.title[lang]}
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {group.shots.map((shot, i) => (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setLightbox({ shots: group.shots, index: i })}
                        className="group text-left flex flex-col gap-3 cursor-zoom-in"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-redOrange/60 transition-colors duration-300">
                          <Image
                            src={shot.src}
                            alt={shot.caption[lang]}
                            fill
                            sizes="(max-width: 600px) 84vw, (max-width: 900px) 42vw, 28vw"
                            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>
                        <p className="text-MobileHeader5 text-white/55 leading-snug group-hover:text-white/80 transition-colors duration-200">
                          {shot.caption[lang]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            )}
          </article>
        ))}
      </div>

      {/* ---------- Closing CTA ---------- */}
      <div className="mx-[8%] lg:mx-[12%] mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-10 md:p-14 flex flex-col items-center text-center gap-5">
        <h2 className="text-MobileHeader2 font-MobileHeader2 md:text-Header3 md:font-Header3">
          {t.portfolio.ctaTitle}
        </h2>
        <p className="text-p text-white/60 max-w-xl leading-relaxed">
          {t.portfolio.ctaSubtitle}
        </p>
        <a href="#contact" className="btn-primary group">
          {t.nav.getInTouch}
          <FaArrowRight className="group-hover:translate-x-1 duration-200" />
        </a>
      </div>

      {/* ---------- Lightbox ---------- */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/[0.97] backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 shrink-0">
            <p className="text-MobileHeader5 text-white/70 truncate">
              {lightbox.shots[lightbox.index].caption[lang]}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-MobileHeader5 text-white/40 tabular-nums">
                {lightbox.index + 1} / {lightbox.shots.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                aria-label={t.portfolio.close}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FaTimes className="text-white text-lg" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto px-4 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.shots[lightbox.index].src}
              alt={lightbox.shots[lightbox.index].caption[lang]}
              className="w-full max-w-5xl mx-auto h-auto rounded-xl"
            />
          </div>

          {lightbox.shots.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={t.portfolio.previous}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/15 hover:border-redOrange transition-colors"
              >
                <FaChevronLeft className="text-white" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={t.portfolio.next}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/15 hover:border-redOrange transition-colors"
              >
                <FaChevronRight className="text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
