import type { Localized } from "@/app/data/projects/types";

/**
 * Rule-based chatbot — types.
 *
 * The whole assistant is a graph of static nodes: no AI, no network call, no
 * generated text. Adding a branch means adding a node in
 * app/data/chatbot/conversation.ts, never touching a component.
 */

/** Shelves the assistant can show projects from. "all" matches every visible project. */
export type ProjectTag = "saas" | "ecommerce" | "management" | "all";

/** Answers kept aside during the qualification branch to prefill the lead form. */
export type LeadField = "projectType" | "stage" | "priority" | "budget";

/** An extra block rendered by a node, on top of its message and options. */
export type ChatWidget =
  /** A shelf of real portfolio projects. */
  | { kind: "projects"; tag: ProjectTag }
  /** A free-text field — the only place the visitor types prose. */
  | { kind: "text"; placeholder: Localized; next: string }
  /** The contact form, sent through the site's existing /api/email route. */
  | { kind: "leadForm"; next: string };

export interface ChatOption {
  /** Button label, also echoed as the visitor's message. */
  label: Localized;
  /** Node to move to when picked. */
  next?: string;
  /**
   * Link to follow instead of moving in the tree: an internal route
   * ("/portfolio"), a page anchor ("#contact") or an external URL.
   * Link options are actions, so they leave the conversation where it is.
   */
  href?: string;
}

export interface ChatNode {
  id: string;
  /** Bot message. "\n" is preserved when rendered. */
  message: Localized;
  options?: ChatOption[];
  widget?: ChatWidget;
  /** Store the picked option's label under this field of the lead brief. */
  collect?: LeadField;
  /** Drop the automatic "Back / Home" row — the welcome node only. */
  hideNav?: boolean;
}

export type Conversation = Record<string, ChatNode>;

export type ChatAuthor = "bot" | "user";

/**
 * One line of the transcript. Text is stored localized, not resolved, so
 * switching language mid-conversation translates the history too.
 */
export interface ChatEntry {
  key: string;
  author: ChatAuthor;
  text: Localized;
  /** Bot lines only — the node that produced it; the last one owns the live options. */
  nodeId?: string;
}

/** What the qualification branch gathered, used to prefill the lead form. */
export interface LeadDraft {
  projectType?: Localized;
  stage?: Localized;
  priority?: Localized;
  budget?: Localized;
  /** Free text typed by the visitor. */
  description?: string;
}
