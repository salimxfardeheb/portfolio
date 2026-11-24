"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ChatTeaser from "./ChatTeaser";

/**
 * Discret à l'arrivée, puis l'invitation. Une fois fermée, elle ne revient plus
 * pendant la session (sessionStorage) ; une nouvelle visite l'affiche à nouveau.
 */
const TEASER_DELAY_MS = 4000;
/** L'invitation n'apparaît jamais sur mobile. */
const TEASER_MEDIA = "(min-width: 768px)";
const TEASER_STORAGE_KEY = "chatbot-teaser-dismissed";

/** Le moteur, l'arbre et le panneau ne sont téléchargés qu'au survol, au focus ou au clic. */
const loadPanel = () => import("./ChatPanel");
const ChatPanel = dynamic(loadPanel, { ssr: false });

function teaserDismissed() {
  try {
    return sessionStorage.getItem(TEASER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Assistant à règles : au départ, seul le bouton flottant (et l'invitation) est
 * chargé. Monté une seule fois dans app/layout.tsx, la conversation suit donc la
 * navigation. Rien n'est envoyé tant que le visiteur n'a pas validé le formulaire.
 */
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  /** Devient vrai au premier clic et le reste : le panneau garde la conversation. */
  const [loaded, setLoaded] = useState(false);
  const [teasing, setTeasing] = useState(false);
  const [teaserDone, setTeaserDone] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (teaserDismissed()) return;
    const show = setTimeout(() => {
      if (window.matchMedia(TEASER_MEDIA).matches) setTeasing(true);
    }, TEASER_DELAY_MS);
    return () => clearTimeout(show);
  }, []);

  /** Masquée pour le reste de la session. */
  const silenceTeaser = () => {
    setTeaserDone(true);
    try {
      sessionStorage.setItem(TEASER_STORAGE_KEY, "1");
    } catch {
      // Stockage indisponible (navigation privée stricte) : masquée pour cette page seulement.
    }
  };

  const prefetch = () => {
    void loadPanel();
  };

  const openChat = () => {
    setLoaded(true);
    setOpen(true);
    silenceTeaser();
  };

  const close = () => {
    setOpen(false);
    // Le bouton est remonté à la fermeture : lui rendre le focus une fois présent.
    setTimeout(() => launcherRef.current?.focus(), 0);
  };

  const nudging = teasing && !teaserDone && !open;

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={openChat}
          onPointerEnter={prefetch}
          onFocus={prefetch}
          aria-label="Ouvrir l'assistant"
          aria-expanded={false}
          className="fixed right-5 bottom-5 z-[45] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-ink text-white shadow-lg shadow-black/20 transition-transform duration-150 hover:scale-105 active:scale-95 md:right-10 md:bottom-10"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16v11H9l-5 4V5Z" />
          </svg>
          {nudging && (
            <span
              aria-hidden="true"
              className="chat-ping absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-accent-strong ring-2 ring-paper"
            />
          )}
        </button>
      )}

      {nudging && <ChatTeaser onOpen={openChat} onDismiss={silenceTeaser} onPrefetch={prefetch} />}

      {loaded && <ChatPanel open={open} onClose={close} />}
    </>
  );
};

export default Chatbot;
