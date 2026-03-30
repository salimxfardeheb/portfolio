"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { FaTimes, FaChevronLeft, FaChevronRight, FaDesktop, FaMobileAlt, FaCheck } from "react-icons/fa";
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
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <FaTimes size={28} />
          </button>
          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors p-4"
            onClick={(e) => { e.stopPropagation(); lbPrev(); }}
          >
            <FaChevronLeft size={32} />
          </button>
          <img
            src={lightbox.images[lightbox.index]}
            alt="Preview"
            className="max-h-[88vh] max-w-[85vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors p-4"
            onClick={(e) => { e.stopPropagation(); lbNext(); }}
          >
            <FaChevronRight size={32} />
          </button>
          <p className="absolute bottom-5 text-gray-400 text-sm">
            {lightbox.index + 1} / {lightbox.images.length}
          </p>
        </div>
      )}

      {/* Page header */}
      <div className="pt-48 lg:pt-32 pb-16 mx-[12%] text-center">
        <p className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5 mb-4">
          {t.templates.pageLabel}
        </p>
        <h1 className="text-MobileHeader2 md:text-Header2 md:font-Header2 font-MobileHeader2 mb-6">
          {t.templates.pageTitle}
        </h1>
        <p className="text-nevada max-w-2xl mx-auto text-p">
          {t.templates.pageSubtitle}
        </p>
      </div>

      {/* Template sections */}
      <div className="flex flex-col gap-32 pb-24 mx-[12%]">
        {templates.map((tpl, ti) => {
          const tab = activeTabs[ti];
          const activeIdx = activeIndexes[ti];
          const images = tab === "desktop" ? tpl.desktop : tpl.mobile;
          const mainImg = images[activeIdx];

          return (
            <section key={tpl.id}>
              {/* Template header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
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
                <div className="flex gap-2">
                  <button
                    onClick={() => setTab(ti, "desktop")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border transition-colors duration-200 ${
                      tab === "desktop"
                        ? "text-white border-white"
                        : "text-nevada border-nevada hover:border-white hover:text-white"
                    }`}
                  >
                    <FaDesktop size={13} /> {t.templates.desktop}
                  </button>
                  <button
                    onClick={() => setTab(ti, "mobile")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border transition-colors duration-200 ${
                      tab === "mobile"
                        ? "text-white border-white"
                        : "text-nevada border-nevada hover:border-white hover:text-white"
                    }`}
                  >
                    <FaMobileAlt size={13} /> {t.templates.mobile}
                  </button>
                </div>
              </div>

              {/* Main content: gallery + info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
                        tab === "mobile" ? "max-h-[500px] object-top" : "h-[380px] lg:h-[440px]"
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                        Agrandir
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto pb-1">
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
                      className="w-full py-4 text-white font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
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
