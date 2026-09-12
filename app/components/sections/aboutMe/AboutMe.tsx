"use client";
import React from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import {
  FaArrowRight,
  FaBrain,
  FaCalendarCheck,
  FaChartLine,
  FaCloud,
  FaCogs,
  FaPlug,
  FaShoppingCart,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Translations } from "@/app/i18n/translations";
import Reveal from "@/app/components/ui/Reveal";

// Labels live in translations (about.expertise); this list sets the order and icons.
const expertise: { key: keyof Translations["about"]["expertise"]; Icon: IconType }[] = [
  { key: "saas", Icon: FaCloud },
  { key: "business", Icon: FaChartLine },
  { key: "ecommerce", Icon: FaShoppingCart },
  { key: "ai", Icon: FaBrain },
  { key: "booking", Icon: FaCalendarCheck },
  { key: "api", Icon: FaPlug },
  { key: "automation", Icon: FaCogs },
];

// Bold keywords in the brand red.
const highlightBold = (text: string, strongClass: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className={`font-semibold ${strongClass}`}>
        {part}
      </strong>
    ) : (
      part
    )
  );

interface Props {
  /** "light" for the white homepage, "dark" for the black /about page. */
  variant?: "light" | "dark";
}

const themes = {
  light: {
    title: "text-black",
    role: "text-black/55",
    body: "text-black/65",
    strong: "text-redOrange",
    hairline: "border-black/10",
    chip: "bg-black/[0.04] text-black/75",
    photoRing: "ring-black/5",
    plate: "bg-black text-white shadow-black/25",
  },
  dark: {
    title: "text-white",
    role: "text-white/55",
    body: "text-white/70",
    strong: "text-redOrange",
    hairline: "border-white/10",
    chip: "bg-white/[0.07] text-white/80",
    photoRing: "ring-white/10",
    plate: "bg-white text-black shadow-black/40",
  },
};

const AboutMe = ({ variant = "light" }: Props) => {
  const { t } = useLanguage();
  const theme = themes[variant];

  return (
    <section className="mb-16 pt-16 md:mb-[100px] md:pt-[100px]" id="about">
      <Reveal className="section-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 lg:gap-x-20 md:items-center">
          {/* Portrait: between the heading and the bio on phones, left column from md up */}
          <figure className="order-2 md:order-1 md:col-span-5 lg:col-span-4">
            <div
              className={`relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl ring-1 ${theme.photoRing}`}
            >
              <Image
                src="/images/profile_picture.png"
                alt={t.about.title}
                fill
                priority={variant === "dark"}
                sizes="(max-width: 900px) 90vw, (max-width: 1441px) 32vw, 24vw"
                className="object-cover object-top grayscale-[15%] hover:grayscale-0 transition-[filter] duration-500"
              />
            </div>
            {/* Experience plate overlapping the portrait's lower edge */}
            <div
              className={`relative -mt-10 ml-4 sm:ml-6 inline-flex items-center gap-4 rounded-xl px-5 py-4 shadow-xl ${theme.plate}`}
            >
              <span className="text-[2.75rem] font-extrabold leading-none tracking-tight tabular-nums text-redOrange">
                {t.about.expValue}
              </span>
              <span className="text-sm font-medium leading-snug whitespace-nowrap">
                {t.about.expLabel}
              </span>
            </div>
          </figure>

          {/* On phones this wrapper dissolves so the portrait can sit between its two blocks */}
          <div className="contents md:flex md:flex-col md:order-2 md:col-span-7 lg:col-span-8">
            <header className="order-1 md:order-none flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-redOrange" />
                <p className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5 uppercase tracking-widest">
                  {t.about.label}
                </p>
              </div>
              <h2
                className={`text-MobileHeader2 md:text-Header2 font-MobileHeader2 md:font-Header2 leading-tight tracking-tight ${theme.title}`}
              >
                {t.about.title}
              </h2>
              <p className={`text-MobileHeader4 md:text-Header4 font-medium ${theme.role}`}>
                {t.about.role}
              </p>
            </header>

            <div
              className={`order-3 md:order-none md:mt-8 flex flex-col gap-5 max-w-[62ch] text-[1.0625rem] md:text-lg leading-relaxed md:leading-[1.8] ${theme.body}`}
            >
              <p>{highlightBold(t.about.bio1, theme.strong)}</p>
              <p>{highlightBold(t.about.bio2, theme.strong)}</p>
            </div>
          </div>
        </div>

        {/* Expertise + CTA: a full-width closing row under both columns */}
        <div
          className={`mt-10 md:mt-14 pt-8 border-t ${theme.hairline} flex flex-col md:flex-row md:items-center md:justify-between gap-6`}
        >
          <ul className="flex flex-wrap gap-2 md:flex-1 md:min-w-0">
            {expertise.map(({ key, Icon }) => (
              <li
                key={key}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ${theme.chip}`}
              >
                <Icon aria-hidden className="text-[14px] shrink-0 opacity-70" />
                {t.about.expertise[key]}
              </li>
            ))}
          </ul>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={600}
            offset={-80}
            className="w-full sm:w-fit shrink-0"
          >
            <button className="btn-primary group w-full sm:w-auto whitespace-nowrap">
              {t.about.cta}
              <FaArrowRight className="group-hover:translate-x-1 duration-200" />
            </button>
          </ScrollLink>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutMe;
