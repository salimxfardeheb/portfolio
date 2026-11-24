"use client";
import React from "react";
import Link from "next/link";
import type { ChatOption as Option } from "@/app/types/chatbot";

/** Même apparence pour un lien et un choix de branche. */
export const optionClass =
  "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 border border-ink bg-paper px-3.5 py-2.5 text-left text-[14px] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-paper disabled:hover:text-ink";

const Mark = ({ children }: { children: string }) => (
  <span aria-hidden="true" className="shrink-0 text-[13px]">
    {children}
  </span>
);

interface Props {
  option: Option;
  disabled?: boolean;
  onSelect: (option: Option) => void;
  /** Appelé quand un lien de page est suivi, pour que le panneau s'efface. */
  onLeave: () => void;
}

/**
 * Un choix. Les options avec `href` sont de vrais liens — site externe,
 * route interne (avec ou sans ancre) ou ancre de la page courante.
 */
const ChatOption = ({ option, disabled = false, onSelect, onLeave }: Props) => {
  const { label, href } = option;

  if (href?.startsWith("#")) {
    const target = href.slice(1);
    return (
      <a
        href={href}
        className={optionClass}
        onClick={(event) => {
          event.preventDefault();
          onLeave();
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        {label}
        <Mark>→</Mark>
      </a>
    );
  }

  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={optionClass}>
        {label}
        <Mark>↗</Mark>
      </a>
    );
  }

  // Route interne : navigation côté client, la conversation est conservée.
  if (href) {
    return (
      <Link href={href} onClick={onLeave} className={optionClass}>
        {label}
        <Mark>→</Mark>
      </Link>
    );
  }

  return (
    <button type="button" disabled={disabled} className={optionClass} onClick={() => onSelect(option)}>
      {label}
      <Mark>›</Mark>
    </button>
  );
};

export default ChatOption;
