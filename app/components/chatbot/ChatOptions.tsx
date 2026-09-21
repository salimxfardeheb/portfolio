"use client";
import React from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import type { ChatNode, ChatOption as Option } from "@/app/types/chatbot";
import ChatOption from "./ChatOption";

interface Props {
  node: ChatNode;
  disabled: boolean;
  canGoBack: boolean;
  onSelect: (option: Option) => void;
  onBack: () => void;
  onHome: () => void;
  onLeave: () => void;
}

const navClass =
  "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-[12.5px] font-medium text-black/60 transition-colors duration-150 hover:border-black/30 hover:text-black disabled:cursor-not-allowed disabled:opacity-40";

/**
 * The choices for the node the visitor is on. "Back / Home" is appended here
 * rather than repeated in the data, so every branch can be walked out of.
 */
const ChatOptions = ({
  node,
  disabled,
  canGoBack,
  onSelect,
  onBack,
  onHome,
  onLeave,
}: Props) => {
  const { t } = useLanguage();

  return (
    <div className="chat-entry-in flex flex-col gap-2 pt-1">
      {node.options?.map((option) => (
        <ChatOption
          key={option.label.en}
          option={option}
          disabled={disabled}
          onSelect={onSelect}
          onLeave={onLeave}
        />
      ))}

      {!node.hideNav && (
        <div className="flex gap-2 pt-1">
          {canGoBack && (
            <button type="button" className={navClass} disabled={disabled} onClick={onBack}>
              <FaArrowLeft className="text-[10px]" />
              {t.chatbot.back}
            </button>
          )}
          <button type="button" className={navClass} disabled={disabled} onClick={onHome}>
            <FaHome className="text-[11px]" />
            {t.chatbot.home}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatOptions;
