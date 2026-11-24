"use client";
import React from "react";
import ChatWindow from "./ChatWindow";
import { useChatbot } from "./useChatbot";

/**
 * Tout ce qui est chargé à la demande : le moteur, l'arbre de conversation et le
 * panneau. Une fois chargé, ce composant reste monté (même panneau fermé) pour
 * que la conversation soit conservée.
 */
const ChatPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const chat = useChatbot();
  return open ? <ChatWindow chat={chat} onClose={onClose} /> : null;
};

export default ChatPanel;
