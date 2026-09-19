"use client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

interface Props {
  placeholder: string;
  disabled: boolean;
  onSubmit: (text: string) => void;
}

/**
 * Free-text field. Only rendered when the current node asks for prose — the
 * rest of the conversation runs on predefined choices.
 */
const ChatInput = ({ placeholder, disabled, onSubmit }: Props) => {
  const { t } = useLanguage();
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        autoFocus
        className="min-h-11 w-full rounded-xl border border-black/15 bg-black/[0.02] px-3 py-2 text-[13.5px] text-black placeholder:text-black/40 focus:border-redOrange focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        aria-label={t.chatbot.send}
        disabled={disabled || !value.trim()}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-redOrange text-white transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaPaperPlane className="text-[13px]" />
      </button>
    </form>
  );
};

export default ChatInput;
