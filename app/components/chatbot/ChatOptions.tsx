"use client";
import React from "react";
import type { ChatNode, ChatOption as Option } from "@/app/types/chatbot";
import ChatOption from "./ChatOption";
import { BACK_LABEL, HOME_LABEL } from "./useChatbot";

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
  "flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-line px-3 py-2 text-[13px] text-muted transition-colors duration-150 hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Les choix du nœud courant. « Retour / Accueil » est ajouté ici plutôt que
 * répété dans les données, pour qu'on puisse sortir de chaque branche.
 */
const ChatOptions = ({ node, disabled, canGoBack, onSelect, onBack, onHome, onLeave }: Props) => (
  <div className="chat-entry-in flex flex-col gap-2 pt-1">
    {node.options?.map((option) => (
      <ChatOption
        key={option.label}
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
            {BACK_LABEL}
          </button>
        )}
        <button type="button" className={navClass} disabled={disabled} onClick={onHome}>
          {HOME_LABEL}
        </button>
      </div>
    )}
  </div>
);

export default ChatOptions;
