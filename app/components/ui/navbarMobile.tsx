"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scroller } from "react-scroll";
import { FaArrowRight } from "react-icons/fa";
import { menuItems } from "@/app/variables";
import { useLanguage } from "@/app/context/LanguageContext";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, lang, toggleLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The layout keeps this component mounted across pages, so close on navigation.
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const goToContact = () => {
    setIsOpen(false);
    // Wait for the scroll lock to lift before scrolling.
    setTimeout(
      () => scroller.scrollTo("contact", { smooth: true, duration: 600, offset: -80 }),
      50
    );
  };

  const solid = scrolled || isOpen;

  return (
    <div className="md:hidden">
      {/* Top bar — transparent over the hero, solid once the page scrolls */}
      <div
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid
            ? "bg-black/85 backdrop-blur-md border-white/10"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between mx-5 sm:mx-[8%]">
          <Link href="/" aria-label="Salim Fardeheb">
            <img src="/images/logo-SF.png" alt="logo" className="h-10 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="h-11 min-w-11 px-3 rounded-lg border border-white/25 text-white text-sm font-medium active:scale-95 transition"
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            <button
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="relative h-11 w-11 rounded-lg border border-white/25 text-white active:scale-95 transition"
            >
              {/* Two bars that cross into an X */}
              <span
                className={`absolute left-1/2 top-1/2 -mt-px h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 -mt-px h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ${
                  isOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex h-full flex-col pt-[104px] pb-8 mx-5 sm:mx-[8%]">
          <p className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
            {t.nav.menu}
          </p>
          <ul className="flex flex-col">
            {menuItems.map((item, i) => {
              const active = pathname === item.link;
              return (
                <li key={item.id} className="border-b border-white/10">
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between py-4 transition-all duration-500 ${
                      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                    style={{ transitionDelay: isOpen ? `${80 + i * 45}ms` : "0ms" }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-5 text-xs tabular-nums text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[28px] font-semibold leading-none ${
                          active ? "text-redOrange" : "text-white"
                        }`}
                      >
                        {t.nav[item.key]}
                      </span>
                    </span>
                    <FaArrowRight
                      className={`text-sm transition-transform duration-200 group-active:translate-x-1 ${
                        active ? "text-redOrange" : "text-white/30"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button type="button" onClick={goToContact} className="btn-primary group mt-auto w-full">
            {t.nav.getInTouch}
            <FaArrowRight className="group-hover:translate-x-1 duration-200" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default NavbarMobile;
