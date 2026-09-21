"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { ChatEntry } from "@/app/types/chatbot";

/**
 * One line of the transcript. Text is resolved at render time, so switching
 * language translates the whole history.
 */
const ChatMessage = ({ entry }: { entry: ChatEntry }) => {
  const { lang } = useLanguage();
  const isBot = entry.author === "bot";

  return (
    <div className={`chat-entry-in flex ${isBot ? "justify-start" : "justify-end"}`}>
      <p
        className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isBot
            ? "rounded-bl-md bg-black/[0.05] text-black/85"
            : "rounded-br-md bg-redOrange text-white"
        }`}
      >
        {entry.text[lang]}
      </p>
    </div>
  );
};

export default ChatMessage;
