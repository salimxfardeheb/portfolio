"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { WELCOME_ID, brokenLinks, conversation } from "@/app/data/chatbot/conversation";
import type { ChatEntry, ChatNode, ChatOption, LeadDraft, LeadField } from "@/app/types/chatbot";

/** Court délai avant chaque réponse, pour que l'échange se lise comme une conversation. */
const BOT_DELAY_MS = 420;

export const BACK_LABEL = "Retour";
export const HOME_LABEL = "Accueil";

export interface Chatbot {
  /** L'historique, du plus ancien au plus récent. */
  entries: ChatEntry[];
  /** Nœud courant — il porte les options et le widget actifs. */
  node: ChatNode;
  isTyping: boolean;
  canGoBack: boolean;
  /** Réponses recueillies, envoyées avec le formulaire. */
  lead: LeadDraft;
  select: (option: ChatOption) => void;
  submitText: (text: string) => void;
  goBack: () => void;
  goHome: () => void;
  /** Aller à un nœud sans message du visiteur (issue du formulaire). */
  advance: (nodeId: string) => void;
}

/**
 * Pilote la conversation : historique, curseur, pile des nœuds visités et
 * réponses recueillies. Ne contient ni texte ni balisage — l'arbre est dans
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

  /** Curseur de référence, pour que les gestionnaires ne lisent jamais un id périmé. */
  const cursor = useRef<string>(WELCOME_ID);
  const seq = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  // Une faute de frappe dans `next` bloquerait le visiteur : la signaler en développement.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const broken = brokenLinks();
    if (broken.length) {
      console.warn("[chatbot] options pointant vers un nœud inexistant :", broken);
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

  const record = useCallback((field: LeadField, label: string) => {
    setLead((prev) => ({ ...prev, [field]: label }));
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

      push({ author: "user", text: value });
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
    push({ author: "user", text: BACK_LABEL });
    goTo(previous, false);
  }, [goTo, history, isTyping, push]);

  const goHome = useCallback(() => {
    if (isTyping || cursor.current === WELCOME_ID) return;
    setHistory([]);
    // Nouveau départ : les réponses d'une autre branche ne doivent pas partir dans l'email.
    setLead({});
    push({ author: "user", text: HOME_LABEL });
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
