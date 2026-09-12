"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { keepHyphenatedWords } from "@/app/components/ui/SectionHeading";
import { FaTimes, FaChevronLeft, FaChevronRight, FaDesktop, FaMobileAlt, FaCheck, FaExpand } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

const enc = (folder: string, name: string) =>
  `/images/maquette/${folder}/${encodeURIComponent(name)}`;

const templates = [
  {
    id: "resto",
    name: "Le Gourmet",
    category: { en: "Restaurant", fr: "Restaurant" },
    description: {
      en: "Elegant website for a fine dining restaurant. Warm amber tones, full menu section, photo gallery, and direct WhatsApp reservation.",
      fr: "Site vitrine élégant pour un restaurant gastronomique. Tons chauds ambrés, section menu complète, galerie photos et réservation directe via WhatsApp.",
    },
    features: {
      en: ["Hero section with call-to-action", "Full menu display", "Photo gallery", "Customer reviews", "WhatsApp booking button", "Fully responsive"],
      fr: ["Section hero avec appel à l'action", "Affichage menu complet", "Galerie photos", "Avis clients", "Bouton réservation WhatsApp", "Entièrement responsive"],
    },
    accent: "#C97D4E",
    desktop: [
      "FireShot Capture 002 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 003 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 004 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 005 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 006 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 020 - Le Gourmet — Restaurant à Oran, Algérie - [127.0.0.1].png",
    ].map((f) => enc("resto", f)),
    mobile: [
      "IMG_1761.PNG", "IMG_1762.PNG", "IMG_1763.PNG",
      "IMG_1764.PNG", "IMG_1765.PNG", "IMG_1766.PNG", "IMG_1767.PNG",
    ].map((f) => enc("resto", f)),
  },
  {
    id: "hotel",
    name: "Hotel Oasis",
    category: { en: "Hotel", fr: "Hôtel" },
    description: {
      en: "Luxury hotel website with a modern navy blue aesthetic. Room gallery, services, testimonials, and direct WhatsApp booking.",
      fr: "Site hôtel luxueux avec une esthétique bleu nuit moderne. Galerie de chambres, services, témoignages clients et réservation WhatsApp.",
    },
    features: {
      en: ["Immersive hero with booking CTA", "Room gallery", "Services section", "Customer testimonials", "WhatsApp booking", "Fully responsive"],
      fr: ["Hero immersif avec CTA réservation", "Galerie de chambres", "Section services", "Témoignages clients", "Réservation WhatsApp", "Entièrement responsive"],
    },
    accent: "#2D7BB5",
    desktop: [
      "FireShot Capture 007 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 008 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 009 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 010 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 011 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 012 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
      "FireShot Capture 018 - Hotel Oasis — Oran, Algérie - [127.0.0.1].png",
    ].map((f) => enc("hotel", f)),
    mobile: [
      "IMG_1750.PNG", "IMG_1751.PNG", "IMG_1752.PNG",
      "IMG_1753.PNG", "IMG_1754.PNG", "IMG_1755.PNG",
    ].map((f) => enc("hotel", f)),
  },
  {
    id: "cloth",
    name: "Elegance Store",
    category: { en: "Clothing Boutique", fr: "Boutique de Vêtements" },
    description: {
      en: "High-end fashion boutique website with a dark, sophisticated look. Product collection, lookbook gallery, and brand storytelling.",
      fr: "Site boutique de mode haut de gamme avec un look sombre et sophistiqué. Collection de produits, galerie lookbook et mise en avant de la marque.",
    },
    features: {
      en: ["Elegant dark hero", "Product collection grid", "Lookbook gallery", "Brand story section", "Mobile-first design", "Fully responsive"],
      fr: ["Hero sombre et élégant", "Grille de collection", "Galerie lookbook", "Section histoire de marque", "Design mobile-first", "Entièrement responsive"],
    },
    accent: "#8B7355",
    desktop: [
      "FireShot Capture 013 - Elegance Store — Boutique de Mode à Oran - [127.0.0.1].png",
      "FireShot Capture 014 - Elegance Store — Boutique de Mode à Oran - [127.0.0.1].png",
      "FireShot Capture 015 - Elegance Store — Boutique de Mode à Oran - [127.0.0.1].png",
      "FireShot Capture 016 - Elegance Store — Boutique de Mode à Oran - [127.0.0.1].png",
      "FireShot Capture 017 - Elegance Store — Boutique de Mode à Oran - [127.0.0.1].png",
    ].map((f) => enc("cloth", f)),
    mobile: [
      "IMG_1756.PNG", "IMG_1757.PNG", "IMG_1758.PNG",
      "IMG_1759.PNG", "IMG_1760.PNG",
    ].map((f) => enc("cloth", f)),
  },
];

type LightboxState = { images: string[]; index: number } | null;

export default function TemplatesPage() {
  const { t, lang } = useLanguage();
  const [activeTabs, setActiveTabs] = useState<("desktop" | "mobile")[]>(
    templates.map(() => "desktop")
  );
  const [activeIndexes, setActiveIndexes] = useState<number[]>(
    templates.map(() => 0)
  );
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = (images: string[], index: number) =>
    setLightbox({ images, index });

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const lbPrev = useCallback(() =>
    setLightbox((lb) => lb && { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }), []);

  const lbNext = useCallback(() =>
    setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.images.length }), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, lbPrev, lbNext]);

  const setTab = (ti: number, tab: "desktop" | "mobile") => {
    setActiveTabs((prev) => prev.map((t, i) => (i === ti ? tab : t)));
    setActiveIndexes((prev) => prev.map((idx, i) => (i === ti ? 0 : idx)));
  };

  const setIndex = (ti: number, idx: number) =>
    setActiveIndexes((prev) => prev.map((v, i) => (i === ti ? idx : v)));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <FaTimes size={28} />
          </button>
          <button
            className="absolute left-4 bottom-4 md:bottom-auto p-3 md:p-4 rounded-full bg-white/10 md:bg-transparent text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); lbPrev(); }}
          >
            <FaChevronLeft size={32} />
          </button>
          <img
            src={lightbox.images[lightbox.index]}
            alt="Preview"
            className="max-h-[72vh] md:max-h-[88vh] max-w-[92vw] md:max-w-[85vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 bottom-4 md:bottom-auto p-3 md:p-4 rounded-full bg-white/10 md:bg-transparent text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); lbNext(); }}
          >
            <FaChevronRight size={32} />
          </button>
          <p className="absolute bottom-8 md:bottom-5 text-gray-400 text-sm">
            {lightbox.index + 1} / {lightbox.images.length}
          </p>
        </div>
      )}

      {/* Page header */}
      <div className="pt-28 md:pt-16 lg:pt-32 pb-12 md:pb-16 mx-5 sm:mx-[8%] md:mx-[12%] flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-redOrange" />
          <span className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5 uppercase tracking-widest">
            {t.templates.pageLabel}
          </span>
          <span className="h-[2px] w-8 bg-redOrange" />
        </div>
        <h1 className="text-MobileHeader2 md:text-Header2 md:font-Header2 font-MobileHeader2 leading-tight">
          {keepHyphenatedWords(t.templates.pageTitle)}
        </h1>
        <p className="text-white/60 max-w-2xl text-p leading-relaxed">
          {t.templates.pageSubtitle}
        </p>
      </div>

      {/* Template sections */}
      <div className="flex flex-col gap-20 md:gap-32 pb-16 md:pb-24 mx-5 sm:mx-[8%] md:mx-[12%]">
        {templates.map((tpl, ti) => {
          const tab = activeTabs[ti];
          const activeIdx = activeIndexes[ti];
          const images = tab === "desktop" ? tpl.desktop : tpl.mobile;
          const mainImg = images[activeIdx];

          return (
            <section key={tpl.id}>
              {/* Template header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 md:mb-10">
                <div>
                  <span
                    className="text-sm font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: tpl.accent + "33", color: tpl.accent }}
                  >
                    {tpl.category[lang]}
                  </span>
                  <h2
                    className="text-MobileHeader2 md:text-Header2 md:font-Header2 font-MobileHeader2 mt-3"
                    style={{ borderLeft: `4px solid ${tpl.accent}`, paddingLeft: "16px" }}
                  >
                    {tpl.name}
                  </h2>
                </div>
                {/* Tab switcher */}
                <div className="flex gap-1 p-1 rounded-lg border border-white/15 bg-white/[0.04] w-full sm:w-auto">
                  <button
                    onClick={() => setTab(ti, "desktop")}
                    className={`flex flex-1 sm:flex-none items-center justify-center gap-2 h-10 px-4 text-sm rounded-md transition-colors duration-200 ${
                      tab === "desktop"
                        ? "bg-white text-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <FaDesktop size={13} /> {t.templates.desktop}
                  </button>
                  <button
                    onClick={() => setTab(ti, "mobile")}
                    className={`flex flex-1 sm:flex-none items-center justify-center gap-2 h-10 px-4 text-sm rounded-md transition-colors duration-200 ${
                      tab === "mobile"
                        ? "bg-white text-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt size={13} /> {t.templates.mobile}
                  </button>
                </div>
              </div>

              {/* Main content: gallery + info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                {/* Gallery — 2/3 width */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {/* Main image */}
                  <div
                    className="relative overflow-hidden rounded-xl cursor-zoom-in group"
                    onClick={() => openLightbox(images, activeIdx)}
                  >
                    <img
                      src={mainImg}
                      alt={tpl.name}
                      className={`w-full object-cover rounded-xl transition-all duration-500 group-hover:brightness-90 ${
                        tab === "mobile" ? "max-h-[460px] md:max-h-[500px] object-top" : "aspect-[16/10] md:aspect-auto md:h-[380px] lg:h-[440px]"
                      }`}
                    />
                    <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                        {t.templates.zoom}
                      </span>
                    </div>
                    {/* Touch screens have no hover: keep the zoom hint visible */}
                    <span className="md:hidden absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                      <FaExpand size={10} /> {t.templates.zoom}
                    </span>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setIndex(ti, idx)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                          idx === activeIdx
                            ? "ring-2 opacity-100"
                            : "opacity-50 hover:opacity-80"
                        }`}
                        style={idx === activeIdx ? { boxShadow: `0 0 0 2px ${tpl.accent}` } : {}}
                      >
                        <img
                          src={img}
                          alt={`${tpl.name} ${idx + 1}`}
                          className={`object-cover object-top ${
                            tab === "mobile" ? "w-16 h-24" : "w-28 h-16"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info — 1/3 width */}
                <div className="flex flex-col gap-6 lg:pt-2">
                  <p className="text-nevada leading-relaxed text-p">
                    {tpl.description[lang]}
                  </p>

                  <div>
                    <p className="text-white text-sm font-semibold uppercase tracking-wider mb-3">
                      {t.templates.features}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {tpl.features[lang].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-nevada text-p">
                          <FaCheck
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: tpl.accent }}
                            size={13}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ScrollLink to="contact" smooth={true} duration={600} offset={-80}>
                    <button
                      className="w-full py-4 rounded-md text-white font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                      style={{ backgroundColor: tpl.accent }}
                    >
                      {t.templates.cta}
                    </button>
                  </ScrollLink>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
