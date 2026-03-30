"use client";
import React from "react";
import { menuItems } from "@/app/variables";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { useLanguage } from "@/app/context/LanguageContext";

interface Props {
  absolute?: boolean;
}

const NavbarDesktop = ({ absolute = true }: Props) => {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <div className={`${absolute && "w-full absolute top-0"}`} id="up">
      <div className="md:flex justify-between mx-[5%] lg:mx-[12%] pt-[30px] items-baseline hidden">
        <div>
          <Link href="/">
            <img
              src="/images/logo-SF.png"
              alt="logo"
              className="h-[75px] object-contain"
            />
          </Link>
        </div>
        <div>
          <ul className="md:flex lg:gap-16 md:gap-10">
            {menuItems.map((data) => (
              <li key={data.id} className="relative">
                <Link
                  href={data.link}
                  className="text-white lg:text-Header5 text-p hover:text-redOrange"
                >
                  {t.nav[data.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-white text-p border border-white px-3 py-1 hover:border-redOrange hover:text-redOrange transition-colors duration-200"
            aria-label="Toggle language"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
          <ScrollLink to="contact" smooth={true} duration={600} offset={-80}>
            <button className="lg:px-5 px-3 py-2 lg:py-2 bg-redOrange text-white text-p hover:bg-opacity-0 hover:border-2">
              {t.nav.getInTouch}
            </button>
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
