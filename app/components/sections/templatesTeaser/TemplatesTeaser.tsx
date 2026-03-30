"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

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
    <section className="bg-black py-[100px]">
      <div className="mx-[12%] flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5">
              {t.templates.teaserLabel}
            </p>
            <h2 className="text-white text-MobileHeader2 md:text-Header2 md:font-Header2 font-MobileHeader2">
              {t.templates.teaserTitle}
            </h2>
            <p className="text-nevada max-w-md text-p">
              {t.templates.teaserSubtitle}
            </p>
          </div>
          <Link href="/templates" className="shrink-0">
            <button className="px-9 py-4 text-white border-2 border-white hover:bg-white hover:text-black transition-colors duration-200 text-MobileHeader4 whitespace-nowrap">
              {t.templates.teaserCta} →
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previews.map((p) => (
            <Link key={p.name} href="/templates">
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
      </div>
    </section>
  );
};

export default TemplatesTeaser;
