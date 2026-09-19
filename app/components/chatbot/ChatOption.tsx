"use client";
import React from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import type { ChatOption as Option } from "@/app/types/chatbot";

/** Shared skin, so a link option and a branch option read as the same control. */
export const optionClass =
  "flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-black/10 bg-black/[0.02] px-3.5 py-2.5 text-left text-[13.5px] font-medium text-black/85 transition-colors duration-150 hover:border-redOrange hover:bg-redOrange/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-black/10 disabled:hover:bg-black/[0.02]";

const iconClass = "shrink-0 text-[11px] text-black/30";

interface Props {
  option: Option;
  disabled?: boolean;
  onSelect: (option: Option) => void;
  /** Called when a page anchor is followed, so the panel can step aside. */
  onLeave: () => void;
}

/**
 * A single choice. Options carrying `href` are rendered as real links — an
 * external site, an internal route, or an anchor on the current page.
 */
const ChatOption = ({ option, disabled = false, onSelect, onLeave }: Props) => {
  const { lang } = useLanguage();
  const label = option.label[lang];
  const href = option.href;

  if (href?.startsWith("#")) {
    const target = href.slice(1);
    return (
      <a
        href={href}
        className={optionClass}
        onClick={(event) => {
          event.preventDefault();
          onLeave();
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        {label}
        <FaArrowRight className={iconClass} />
      </a>
    );
  }

  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={optionClass}>
        {label}
        <FaExternalLinkAlt className={iconClass} />
      </a>
    );
  }

  // Internal route: client-side navigation keeps the conversation alive.
  if (href) {
    return (
      <Link href={href} className={optionClass}>
        {label}
        <FaArrowRight className={iconClass} />
      </Link>
    );
  }

  return (
    <button type="button" disabled={disabled} className={optionClass} onClick={() => onSelect(option)}>
      {label}
      <FaChevronRight className={iconClass} />
    </button>
  );
};

export default ChatOption;
