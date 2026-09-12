"use client";
import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import Reveal from "@/app/components/ui/Reveal";
import SectionHeading from "@/app/components/ui/SectionHeading";

const enc = (folder: string, name: string) =>
  `/images/maquette/${folder}/${encodeURIComponent(name)}`;

const previews = [
  {
    name: "Le Gourmet",
    category: { en: "Restaurant", fr: "Restaurant" },
    accent: "#C97D4E",
    image: enc(
      "resto",
      "FireShot Capture 002 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png"
    ),
    mobile: enc("resto", "IMG_1761.PNG"),
  },
  {
    name: "Hotel Oasis",
    category: { en: "Hotel", fr: "Hôtel" },
    accent: "#2D7BB5",
    image: enc(
      "hotel",
      "FireShot Capture 007 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png"
    ),
    mobile: enc("hotel", "IMG_1750.PNG"),
  },
  {
    name: "Elegance Store",
    category: { en: "Clothing Boutique", fr: "Boutique de Vêtements" },
    accent: "#8B7355",
    image: enc(
      "cloth",
      "FireShot Capture 013 - Elegance Store — Boutique de Mode à Oran - [127.0.0.1].png"
    ),
    mobile: enc("cloth", "IMG_1756.PNG"),
  },
];

const TemplatesTeaser = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="bg-black py-16 md:py-[100px]">
      <Reveal className="section-x grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-10 md:gap-y-16 md:gap-x-6">
        {/* Header */}
        <div className="md:col-start-1 md:row-start-1">
          <SectionHeading
            variant="dark"
            align="left"
            label={t.templates.teaserLabel}
            title={t.templates.teaserTitle}
            subtitle={t.templates.teaserSubtitle}
          />
        </div>

        {/* CTA — below the cards on phones, beside the heading from md up */}
        <Link
          href="/templates"
          className="order-last md:order-none md:col-start-2 md:row-start-1 md:self-end"
        >
          <button className="btn-primary group whitespace-nowrap w-full md:w-auto">
            {t.templates.teaserCta}
            <FaArrowRight className="group-hover:translate-x-1 duration-200" />
          </button>
        </Link>

        {/* Cards — swipe row on phones, 3-column grid from md up */}
        <div className="md:col-span-2 md:row-start-2 min-w-0 flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-5 sm:scroll-px-0 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {previews.map((p) => (
            <Link
              key={p.name}
              href="/templates"
              className="w-[82%] sm:w-[46%] md:w-auto shrink-0 snap-start"
            >
              <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                {/* Desktop screenshot */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-[220px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Mobile preview — peeks in from bottom-right on hover */}
                <img
                  src={p.mobile}
                  alt={`${p.name} mobile`}
                  className="absolute bottom-0 right-4 w-[72px] h-[110px] object-cover object-top rounded-t-xl shadow-2xl border-2 border-white/20
                             translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit"
                    style={{ backgroundColor: p.accent + "44", color: p.accent }}
                  >
                    {p.category[lang]}
                  </span>
                  <h3 className="text-white text-MobileHeader4 md:text-Header4 font-semibold">
                    {p.name}
                  </h3>
                </div>

                {/* Accent border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: p.accent }}
                />
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default TemplatesTeaser;
