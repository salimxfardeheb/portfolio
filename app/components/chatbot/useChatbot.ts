"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  WELCOME_ID,
  brokenLinks,
  conversation,
} from "@/app/data/chatbot/conversation";
import type { Localized } from "@/app/data/projects/types";
import translations from "@/app/i18n/translations";
import type {
  ChatEntry,
  ChatNode,
  ChatOption,
  LeadDraft,
  LeadField,
} from "@/app/types/chatbot";

/** Short beat before an answer lands, so the exchange reads like a conversation. */
const BOT_DELAY_MS = 420;

/** Navigation labels come from the UI dictionary — one source of truth. */
const navLabel = (key: "back" | "home"): Localized => ({
  en: translations.en.chatbot[key],
  fr: translations.fr.chatbot[key],
});

export interface Chatbot {
  /** The transcript, oldest first. */
  entries: ChatEntry[];
  /** Node the visitor is on — it owns the live options and widget. */
  node: ChatNode;
  isTyping: boolean;
  canGoBack: boolean;
  /** Answers gathered along the way, used to prefill the contact form. */
  lead: LeadDraft;
  select: (option: ChatOption) => void;
  submitText: (text: string) => void;
  goBack: () => void;
  goHome: () => void;
  /** Jump to a node without echoing a visitor message (form outcomes). */
  advance: (nodeId: string) => void;
}

/**
 * Drives the conversation: transcript, cursor, visited-node stack and the
 * qualification brief. Holds no copy and no markup — the tree lives in
 * app/data/chatbot/conversation.ts.
 */
export function useChatbot(): Chatbot {
  const welcome = conversation[WELCOME_ID];

  const [entries, setEntries] = useState<ChatEntry[]>([
    { key: "e0", author: "bot", text: welcome.message, nodeId: WELCOME_ID },
  ]);
  const [currentId, setCurrentId] = useState<string>(WELCOME_ID);
  const [history, setHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [lead, setLead] = useState<LeadDraft>({});

  /** Authoritative cursor, so handlers never read a stale node id. */
  const cursor = useRef<string>(WELCOME_ID);
  const seq = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  // A typo in `next` would strand the visitor: surface it while developing.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const broken = brokenLinks();
    if (broken.length) {
      console.warn("[chatbot] options pointing at a missing node:", broken);
    }
  }, []);

  const push = useCallback((entry: Omit<ChatEntry, "key">) => {
    seq.current += 1;
    setEntries((prev) => [...prev, { key: `e${seq.current}`, ...entry }]);
  }, []);

  const goTo = useCallback(
    (nodeId: string, remember = true) => {
      const target = conversation[nodeId];
      if (!target) return;

      if (remember) {
        const from = cursor.current;
        setHistory((prev) => [...prev, from]);
      }

      cursor.current = nodeId;
      setIsTyping(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        push({ author: "bot", text: target.message, nodeId });
        setCurrentId(nodeId);
        setIsTyping(false);
      }, BOT_DELAY_MS);
    },
    [push]
  );

  const record = useCallback((field: LeadField, label: Localized) => {
    setLead((prev) => {
      const next: LeadDraft = { ...prev };
      next[field] = label;
      return next;
    });
  }, []);

  const select = useCallback(
    (option: ChatOption) => {
      if (isTyping || !option.next) return;
      const node = conversation[cursor.current];

      push({ author: "user", text: option.label });
      if (node?.collect) record(node.collect, option.label);
      goTo(option.next);
    },
    [goTo, isTyping, push, record]
  );

  const submitText = useCallback(
    (text: string) => {
      const node = conversation[cursor.current];
      if (isTyping || node?.widget?.kind !== "text") return;

      const value = text.trim();
      if (!value) return;

      push({ author: "user", text: { en: value, fr: value } });
      setLead((prev) => ({ ...prev, description: value }));
      goTo(node.widget.next);
    },
    [goTo, isTyping, push]
  );

  const goBack = useCallback(() => {
    if (isTyping) return;
    const previous = history[history.length - 1];
    if (!previous) return;

    setHistory((prev) => prev.slice(0, -1));
    push({ author: "user", text: navLabel("back") });
    goTo(previous, false);
  }, [goTo, history, isTyping, push]);

  const goHome = useCallback(() => {
    if (isTyping || cursor.current === WELCOME_ID) return;
    setHistory([]);
    push({ author: "user", text: navLabel("home") });
    goTo(WELCOME_ID, false);
  }, [goTo, isTyping, push]);

  const advance = useCallback((nodeId: string) => goTo(nodeId, false), [goTo]);

  return {
    entries,
    node: conversation[currentId] ?? welcome,
    isTyping,
    canGoBack: history.length > 0,
    lead,
    select,
    submitText,
    goBack,
    goHome,
    advance,
  };
}
