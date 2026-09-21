"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

interface Props {
  onOpen: () => void;
  onDismiss: () => void;
}

/**
 * The nudge that pops next to the launcher a few seconds after arrival.
 * Tapping it opens the assistant; the × silences it for the session.
 */
const ChatTeaser = ({ onOpen, onDismiss }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="chat-teaser-in fixed bottom-[28px] right-[84px] z-[45] flex max-w-[200px] items-start gap-1 rounded-2xl rounded-br-md border border-black/10 bg-white py-2 pl-3 pr-1.5 shadow-xl shadow-black/20 md:bottom-[52px] md:right-[114px] md:max-w-[230px]">
      <button
        type="button"
        onClick={onOpen}
        className="text-left text-[12.5px] font-medium leading-snug text-black/85 transition-colors duration-150 hover:text-black"
      >
        {t.chatbot.teaser}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={t.chatbot.dismiss}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black/40 transition-colors duration-150 hover:bg-black/5 hover:text-black"
      >
        <FaTimes className="text-[10px]" />
      </button>
      {/* Tail pointing at the launcher */}
      <span
        aria-hidden="true"
        className="absolute -right-[6px] bottom-3.5 h-3 w-3 rotate-45 border-b border-r border-black/10 bg-white"
      />
    </div>
  );
};

export default ChatTeaser;
