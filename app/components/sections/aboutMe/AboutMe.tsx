"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const AboutMe = ({ title = "text-black", text = "text-nevada" }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-[100px] pt-[100px]" id="about">
      <div className="mx-[12%] flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <img
            src="/images/profile_picture.png"
            alt="About Me Cover"
            className="md:w-[447px] w-[313px] object-contain"
          />
        </div>
        <div className="gap-5 flex flex-col md:w-1/2">
          <p className=" text-redOrange text-MobileHeader5 md:text-Header5 font-Header5">
            {t.about.label}
          </p>
          <p className={`text-MobileHeader2 md:text-Header2 lg:font-Header2 font-MobileHeader2 ${title}`}>
            {t.about.title}
          </p>
          <div className={`aboutme_text ${text} flex flex-col gap-4`}>
            <p>{t.about.bio1}</p>
            <p>{t.about.bio2}</p>
            <p>{t.about.bio3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
