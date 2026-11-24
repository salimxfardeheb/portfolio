"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatLeadForm from "./ChatLeadForm";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import type { Chatbot } from "./useChatbot";

/** Éléments atteignables au clavier (le champ piège a tabIndex=-1, il est exclu). */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

interface Props {
  chat: Chatbot;
  onClose: () => void;
}

/**
 * Le panneau : historique, choix du nœud courant, et un champ de saisie qui
 * n'apparaît que lorsqu'un nœud demande du texte libre.
 */
const ChatWindow = ({ chat, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [keyboardInset, setKeyboardInset] = useState(0);

  const { entries, node, isTyping } = chat;
  const widget = node.widget;

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  // Suivre la conversation à mesure qu'elle s'allonge.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [entries.length, isTyping]);

  // Réduire le panneau au lieu de le laisser passer sous le clavier mobile.
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () =>
      setKeyboardInset(Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop));

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Assistant Info Expertise"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
          return;
        }
        if (event.key !== "Tab" || !panelRef.current) return;

        // Piège à focus : Tab et Maj+Tab bouclent à l'intérieur du panneau.
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.tabIndex >= 0 && el.getClientRects().length > 0
        );
        if (items.length === 0) {
          event.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === panelRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      style={keyboardInset ? { marginBottom: keyboardInset } : undefined}
      className="chat-panel-in fixed top-2 right-2 bottom-2 left-2 z-[45] flex flex-col overflow-hidden rounded-[4px] border border-ink bg-paper font-sans text-ink shadow-2xl shadow-black/20 focus:outline-none sm:top-auto sm:right-5 sm:bottom-5 sm:left-auto sm:h-[min(78dvh,600px)] sm:max-h-[calc(100dvh-6rem)] sm:w-[380px] md:right-10 md:bottom-10 md:w-[400px]"
    >
      <header className="flex items-center gap-3 border-b border-ink px-4 py-3">
        <div className="min-w-0">
          <p className="text-[15px] leading-tight font-semibold">Info Expertise</p>
          <p className="caps mt-0.5 text-muted">Assistant</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer l'assistant"
          className="ml-auto flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-muted transition-colors duration-150 hover:bg-cream hover:text-ink"
        >
          <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" className="h-3 w-3" stroke="currentColor" strokeWidth="1.6">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>
      </header>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation avec l'assistant"
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-3 py-3"
      >
        {/* Garde une courte conversation collée en bas, comme une vraie messagerie. */}
        <div className="mt-auto" />

        {entries.map((entry) => (
          <ChatMessage key={entry.key} entry={entry} />
        ))}

        {isTyping && (
          <div className="flex justify-start" aria-label="L'assistant écrit">
            <span className="flex items-center gap-1 rounded-[4px] bg-cream px-3.5 py-3">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="chat-dot h-1.5 w-1.5 rounded-full bg-ink/50"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </span>
          </div>
        )}

        {!isTyping && widget?.kind === "leadForm" && (
          <ChatLeadForm lead={chat.lead} onSent={() => chat.advance(widget.next)} />
        )}

        {!isTyping && (
          <ChatOptions
            node={node}
            disabled={isTyping}
            canGoBack={chat.canGoBack}
            onSelect={chat.select}
            onBack={chat.goBack}
            onHome={chat.goHome}
            onLeave={onClose}
          />
        )}
      </div>

      {!isTyping && widget?.kind === "text" && (
        <div className="border-t border-ink px-3 py-3">
          <ChatInput placeholder={widget.placeholder} disabled={isTyping} onSubmit={chat.submitText} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
