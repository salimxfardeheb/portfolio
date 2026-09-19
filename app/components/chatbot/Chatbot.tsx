"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ChatRobot from "./ChatRobot";
import ChatTeaser from "./ChatTeaser";
import ChatWindow from "./ChatWindow";
import { useChatbot } from "./useChatbot";

/**
 * Quiet on arrival, then the nudge — on every page load, and it stays until
 * the visitor dismisses it or opens the assistant. Nothing is remembered
 * between visits: a returning visitor is invited again.
 */
const TEASER_DELAY_MS = 4000;

/**
 * Rule-based assistant: a floating mascot and a panel driven by the static
 * tree in app/data/chatbot/conversation.ts. Mounted once in app/layout.tsx, so
 * the conversation survives navigation. Nothing is sent anywhere until the
 * visitor submits the contact form.
 */
const Chatbot = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [teasing, setTeasing] = useState(false);
  const [teaserDone, setTeaserDone] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const chat = useChatbot();

  useEffect(() => {
    const show = setTimeout(() => setTeasing(true), TEASER_DELAY_MS);
    return () => clearTimeout(show);
  }, []);

  /** Hidden for the rest of this visit — browsing on to another page keeps it quiet. */
  const silenceTeaser = () => setTeaserDone(true);

  const openChat = () => {
    setOpen(true);
    silenceTeaser();
  };

  const close = () => {
    setOpen(false);
    // The launcher remounts on close — hand focus back once it is there.
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
          aria-label={t.chatbot.open}
          aria-expanded={false}
          className="fixed bottom-5 right-5 z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-redOrange text-white shadow-lg shadow-redOrange/30 transition-all duration-200 hover:scale-105 hover:shadow-redOrange/50 active:scale-95 md:bottom-10 md:right-10 md:h-16 md:w-16"
        >
          <ChatRobot variant="head" className="h-8 w-8 md:h-9 md:w-9" />
          {nudging && (
            <span
              aria-hidden="true"
              className="chat-robot-ping absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white"
            />
          )}
        </button>
      )}

      {nudging && <ChatTeaser onOpen={openChat} onDismiss={silenceTeaser} />}

      {open && <ChatWindow chat={chat} onClose={close} />}
    </>
  );
};

export default Chatbot;
