"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const tools = [
  { name: "Next.js", icon: "/images/toolkit/nextjs.png" },
  { name: "React", icon: "/images/toolkit/react.png" },
  { name: "TypeScript", icon: "/images/toolkit/typescript.png" },
  { name: "Tailwind CSS", icon: "/images/toolkit/tailwind.png" },
  { name: "Node.js", icon: "/images/toolkit/nodejs.png" },
  { name: "Python", icon: "/images/toolkit/python.png" },
  { name: "Figma", icon: "/images/toolkit/figma.png" },
  { name: "Git", icon: "/images/toolkit/git.png" },
];

const Toolkit = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center gap-10 my-14 md:my-28">
      <div className="gap-5 flex flex-col md:w-1/2 justify-center items-center text-center">
        <p className="text-redOrange text-MobileHeader5 md:text-Header5">
          {t.toolkit.label}
        </p>
        <p className="text-MobileHeader2 md:text-Header2 font-Header2">{t.toolkit.title}</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-[12%]">
        {tools.map((tool) => (
          <div key={tool.name} className="group flex flex-col items-center gap-3">
            <img
              src={tool.icon}
              alt={tool.name}
              className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-MobileHeader5 text-nevada opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;
