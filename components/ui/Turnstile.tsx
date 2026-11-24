"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile (anti-spam gratuit), en mode « interaction-only » : invisible
 * sauf si Cloudflare a un doute sur le visiteur.
 *
 * Désactivé tant que NEXT_PUBLIC_TURNSTILE_SITE_KEY n'est pas défini au build
 * (le Worker, lui, n'exige le jeton que si TURNSTILE_SECRET_KEY est défini).
 * Un jeton ne sert qu'une fois : changer `resetSignal` après chaque envoi.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export const turnstileEnabled = Boolean(SITE_KEY);

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loader: Promise<TurnstileApi> | null = null;

/** Charge le script une seule fois pour toute la page. */
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loader ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    script.onerror = () => {
      loader = null;
      script.remove();
      reject(new Error("turnstile"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

export function Turnstile({
  onToken,
  resetSignal = 0,
}: {
  /** Jeton valide, ou null quand il expire / échoue / est réinitialisé. */
  onToken: (token: string | null) => void;
  resetSignal?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetRef.current = turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          language: "fr",
          appearance: "interaction-only",
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));

    return () => {
      cancelled = true;
      if (widgetRef.current) window.turnstile?.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!resetSignal || !widgetRef.current) return;
    onTokenRef.current(null);
    window.turnstile?.reset(widgetRef.current);
  }, [resetSignal]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} />;
}
