import React from "react";
import type { ChatEntry } from "@/app/types/chatbot";

/** Une ligne de l'historique : bot à gauche (crème), visiteur à droite (noir). */
const ChatMessage = ({ entry }: { entry: ChatEntry }) => {
  const isBot = entry.author === "bot";

  return (
    <div className={`chat-entry-in flex ${isBot ? "justify-start" : "justify-end"}`}>
      <p
        className={`max-w-[88%] rounded-[4px] px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-line ${
          isBot ? "bg-cream text-ink" : "bg-ink text-cream"
        }`}
      >
        {entry.text}
      </p>
    </div>
  );
};

export default ChatMessage;
