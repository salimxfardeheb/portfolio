"use client";
import React, { useState } from "react";

interface Props {
  placeholder: string;
  disabled: boolean;
  onSubmit: (text: string) => void;
}

/**
 * Champ de texte libre. Affiché uniquement quand le nœud courant le demande —
 * le reste de la conversation passe par des choix prédéfinis.
 */
const ChatInput = ({ placeholder, disabled, onSubmit }: Props) => {
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
        aria-label={placeholder}
        maxLength={2000}
        className="min-h-11 w-full border border-ink bg-paper px-3 py-2 text-[14px] text-ink placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        aria-label="Envoyer"
        disabled={disabled || !value.trim()}
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center bg-ink text-paper transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
};

export default ChatInput;
