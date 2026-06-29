"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import Reveal from "@/app/components/ui/Reveal";

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "Python"];

const highlightBold = (text: string) => {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="text-redOrange font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

interface Props {
  /** "light" for the white homepage, "dark" for the black /about page. */
  variant?: "light" | "dark";
}

const AboutMe = ({ variant = "light" }: Props) => {
  const { t } = useLanguage();
  const isDark = variant === "dark";

  const cardClasses = isDark
    ? "bg-white/5 border border-white/10 backdrop-blur-sm"
    : "bg-white border border-black/5";
  const titleColor = isDark ? "text-white" : "text-black";
  const textColor = isDark ? "text-white/75" : "text-nevada";
  const chipClasses = isDark
    ? "bg-white/10 text-white/85 border border-white/15"
    : "bg-black/[0.04] text-nevada border border-black/10";

  return (
    <div className="mb-[100px] pt-[100px]" id="about">
      <Reveal className="mx-[12%]">
        <div
          className={`flex flex-col md:flex-row items-center gap-14 md:gap-16 rounded-[2rem] shadow-2xl p-8 md:p-12 lg:p-16 ${cardClasses}`}
        >
          {/* Photo — framed, with brand glow + floating stat */}
          <div className="relative shrink-0">
            {/* Offset accent frame */}
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl border-2 border-redOrange/60" />
            {/* Soft brand glow */}
            <div className="absolute -inset-3 rounded-full bg-redOrange/20 blur-2xl" />
            <img
              src="/images/profile_picture.png"
              alt={t.about.title}
              className="relative w-[280px] md:w-[330px] aspect-[3/4] object-cover object-top rounded-3xl shadow-xl grayscale-[15%] hover:grayscale-0 transition-all duration-500"
            />
            {/* Floating experience badge */}
            <div className="absolute -bottom-5 -right-5 flex flex-col items-center justify-center bg-redOrange text-white rounded-2xl px-5 py-3 shadow-xl shadow-redOrange/40">
              <span className="text-Header3 font-Header2 leading-none">
                {t.about.expValue}
              </span>
              <span className="text-MobileHeader5 leading-tight text-center max-w-[6.5rem] mt-1">
                {t.about.expLabel}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Eyebrow with accent dash */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-redOrange" />
              <p className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5 uppercase tracking-widest">
                {t.about.label}
              </p>
            </div>

            {/* Title + role */}
            <div className="flex flex-col gap-1.5">
              <h2
                className={`text-MobileHeader2 md:text-Header2 lg:font-Header2 font-MobileHeader2 leading-tight ${titleColor}`}
              >
                {t.about.title}
              </h2>
              <p className="text-redOrange text-MobileHeader4 md:text-Header4 font-Header4">
                {t.about.role}
              </p>
            </div>

            {/* Bio */}
            <div className={`aboutme_text ${textColor} flex flex-col gap-4`}>
              <p>{highlightBold(t.about.bio1)}</p>
              <p>{highlightBold(t.about.bio2)}</p>
            </div>

            {/* Tech stack chips */}
            <div className="flex flex-wrap gap-2.5 mt-1">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-1.5 rounded-full text-MobileHeader5 transition-colors duration-200 ${chipClasses}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <ScrollLink
              to="contact"
              smooth={true}
              duration={600}
              offset={-80}
              className="w-fit mt-3"
            >
              <button className="btn-primary group">
                {t.about.cta}
                <FaArrowRight className="group-hover:translate-x-1 duration-200" />
              </button>
            </ScrollLink>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AboutMe;
