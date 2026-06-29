import React from "react";

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
}

/**
 * Shared section header: an accent-dash eyebrow + title (+ optional subtitle).
 * Keeps every section visually consistent with the About card.
 */
const SectionHeading = ({
  label,
  title,
  subtitle,
  align = "center",
  variant = "light",
}: Props) => {
  const isDark = variant === "dark";
  const titleColor = isDark ? "text-white" : "text-black";
  const subtitleColor = isDark ? "text-white/70" : "text-nevada";
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="h-[2px] w-8 bg-redOrange" />
        <span className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5 uppercase tracking-widest">
          {label}
        </span>
      </div>
      <h2
        className={`text-MobileHeader2 font-MobileHeader2 md:text-Header2 md:font-Header2 leading-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && <p className={`text-p max-w-xl ${subtitleColor}`}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
