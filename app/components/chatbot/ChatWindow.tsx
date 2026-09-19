"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { chatProjects } from "@/app/data/chatbot/projects";
import ChatInput from "./ChatInput";
import ChatLeadForm from "./ChatLeadForm";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import ChatProjectCard from "./ChatProjectCard";
import ChatRobot from "./ChatRobot";
import type { Chatbot } from "./useChatbot";

interface Props {
  chat: Chatbot;
  onClose: () => void;
}

/**
 * The panel: transcript, the current node's choices, and a composer that only
 * turns into a text field when a node asks for prose.
 */
const ChatWindow = ({ chat, onClose }: Props) => {
  const { lang, t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [keyboardInset, setKeyboardInset] = useState(0);

  const { entries, node, isTyping } = chat;
  const widget = node.widget;

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  // Follow the conversation as it grows.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [entries.length, isTyping]);

  // Shrink the panel instead of hiding behind the on-screen keyboard.
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () =>
      setKeyboardInset(
        Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
      );

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <>
      {/*
        Mascot standing next to the panel, only where there is room for it.
        The panel is overflow-hidden, so it cannot be a child: the right offsets
        below are the panel's own inset + width (20 + 380 + gap, 40 + 400 + gap)
        and must be kept in step if the panel is ever resized.
      */}
      <div
        aria-hidden="true"
        className="chat-robot-in pointer-events-none fixed bottom-5 right-[408px] z-[44] hidden sm:block md:bottom-10 md:right-[452px]"
      >
        <ChatRobot variant="full" waving className="h-[128px] w-auto text-redOrange" />
      </div>

      <div
      ref={panelRef}
      role="dialog"
      aria-label={t.chatbot.title}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      style={keyboardInset ? { marginBottom: keyboardInset } : undefined}
      className="chat-panel-in fixed bottom-2 left-2 right-2 top-[84px] z-[45] flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/25 focus:outline-none sm:left-auto sm:top-auto sm:bottom-5 sm:right-5 sm:h-[min(78dvh,600px)] sm:max-h-[calc(100dvh-6rem)] sm:w-[380px] md:bottom-10 md:right-10 md:w-[400px]"
    >
      <header className="flex items-center gap-3 border-b border-black/10 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
          <ChatRobot variant="head" className="h-6 w-6 text-redOrange" />
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold leading-tight text-black">
            {t.chatbot.title}
          </p>
          <p className="truncate text-[11px] text-black/55">{t.chatbot.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.chatbot.close}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black/40 transition-colors duration-150 hover:bg-black/5 hover:text-black"
        >
          <FaTimes />
        </button>
      </header>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label={t.chatbot.conversation}
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-3 py-3"
      >
        {/* Keeps a short conversation anchored to the bottom, like a real chat. */}
        <div className="mt-auto" />

        {/* On phones there is no room beside the panel, so the mascot sits inside it. */}
        <div className="flex justify-center pb-1 sm:hidden">
          <ChatRobot variant="full" waving className="h-24 w-auto text-redOrange" />
        </div>

        {entries.map((entry) => (
          <ChatMessage key={entry.key} entry={entry} />
        ))}

        {isTyping && (
          <div className="flex justify-start" aria-label={t.chatbot.typing}>
            <span className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-black/[0.05] px-3.5 py-3">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="chat-dot h-1.5 w-1.5 rounded-full bg-black/40"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </span>
          </div>
        )}

        {!isTyping && widget?.kind === "projects" && (
          <div className="flex flex-col gap-2">
            {chatProjects(widget.tag).map((project) => (
              <ChatProjectCard key={project.slug} project={project} />
            ))}
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

      <div className="border-t border-black/10 px-3 py-3">
        {!isTyping && widget?.kind === "text" ? (
          <ChatInput
            placeholder={widget.placeholder[lang]}
            disabled={isTyping}
            onSubmit={chat.submitText}
          />
        ) : (
          <p className="text-center text-[11.5px] text-black/55">{t.chatbot.hint}</p>
        )}
      </div>
      </div>
    </>
  );
};

export default ChatWindow;
