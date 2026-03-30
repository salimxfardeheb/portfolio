'use client'
import React, { useState } from "react";
import { menuItems } from "@/app/variables";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

const HamburgerButtonItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLang}
          className="text-white text-p border border-white px-2 py-1 rounded hover:border-redOrange hover:text-redOrange transition-colors duration-200"
          aria-label="Toggle language"
        >
          {lang === "en" ? "FR" : "EN"}
        </button>
        <div className="border-2 border-white h-fit flex p-2 rounded-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden text-white focus:outline-none transition-transform ${
              isOpen ? "transform rotate-90" : ""
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-16 6h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={
          isOpen ? "menuItems top-28 scale-100" : "menuItems -top-96 scale-0"
        }
      >
        <ul className="flex flex-col items-center space-y-4">
          {menuItems.map((data) => (
            <li key={data.id}>
              <Link href={data.link} className="lg:text-Header5 text-p">
                {t.nav[data.key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HamburgerButtonItems;
