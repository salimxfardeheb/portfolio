import React from "react";

interface Props {
  /** Hostname shown in the fake address bar. */
  host: string;
  /** Project brand colour — tints the frame's top edge. */
  accent?: string;
  variant?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps a screenshot in a mock browser chrome so a full-page capture reads as
 * a real product rather than a floating image.
 */
const BrowserFrame = ({
  host,
  accent = "#FF302F",
  variant = "light",
  className = "",
  children,
}: Props) => {
  const isDark = variant === "dark";

  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-xl ${
        isDark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 border-b ${
          isDark ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-black/[0.03]"
        }`}
        style={{ boxShadow: `inset 0 2px 0 ${accent}` }}
      >
        <span className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span
          className={`flex-1 truncate rounded-md px-3 py-1 text-[11px] tracking-wide ${
            isDark ? "bg-black/40 text-white/50" : "bg-white text-nevada"
          }`}
        >
          {host}
        </span>
      </div>
      {children}
    </div>
  );
};

export default BrowserFrame;
