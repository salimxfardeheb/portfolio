"use client";
import React from "react";

interface Props {
  onOpen: () => void;
  onDismiss: () => void;
  /** Précharge le panneau quand le visiteur s'approche de l'invitation. */
  onPrefetch: () => void;
}

/**
 * L'invitation qui apparaît près du bouton quelques secondes après l'arrivée,
 * sur écran ≥ 768 px uniquement. Un clic ouvre l'assistant ; × la masque pour la session.
 */
const ChatTeaser = ({ onOpen, onDismiss, onPrefetch }: Props) => (
  <div className="chat-teaser-in fixed right-[104px] bottom-[44px] z-[45] hidden max-w-[260px] items-start gap-2 border border-ink bg-paper py-2.5 pr-1.5 pl-3 shadow-lg shadow-black/10 md:flex">
    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" />
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={onPrefetch}
      onFocus={onPrefetch}
      className="cursor-pointer text-left text-[14px] leading-snug text-ink"
    >
      Une question sur votre projet ? Nous vous orientons en 30 secondes.
    </button>
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Masquer ce message"
      className="-my-2.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-muted transition-colors duration-150 hover:text-ink"
    >
      <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="1.6">
        <path d="M1 1l10 10M11 1L1 11" />
      </svg>
    </button>
  </div>
);

export default ChatTeaser;
