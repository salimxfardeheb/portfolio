import type { ChatNode, Conversation } from "@/app/types/chatbot";
import { contactLinks } from "./contact";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  ASSISTANT — toute la conversation est ici
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Chaque réponse est écrite à la main : aucune IA, aucune API, aucun texte généré.
 *
 *  Ajouter une branche
 *  ───────────────────
 *  1. Ajouter un nœud ci-dessous avec un id unique.
 *  2. Faire pointer une option d'un nœud existant vers lui avec `next: "<id>"`.
 *  Rien d'autre à changer : l'interface lit ce fichier.
 *
 *  Notes
 *  ─────
 *  • Les "\n" d'un message sont conservés à l'affichage.
 *  • Les options `href` sont des liens (route, "#ancre" ou URL externe) : elles
 *    ouvrent le lien et laissent la conversation où elle est.
 *  • `collect` enregistre le libellé choisi ; la première ligne du message sert
 *    de question dans l'email envoyé.
 *  • « Retour / Accueil » est ajouté automatiquement sous chaque nœud sauf l'accueil.
 *  • Uniquement des liens réels — ne jamais inventer d'URL.
 */

export const WELCOME_ID = "welcome";

const plans = (next: string) => [
  { label: "Starter", next },
  { label: "Plus", next },
  { label: "Premium", next },
  { label: "Je ne sais pas encore", next },
];

const nodes: ChatNode[] = [
  /* ───────────────────────────── Accueil ───────────────────────────── */
  {
    id: WELCOME_ID,
    hideNav: true,
    message:
      "Bonjour, nous sommes Info Expertise.\nNous créons des sites et des outils sur mesure pour les commerces. Comment pouvons-nous vous aider ?",
    options: [
      { label: "Je vends en ligne", next: "ecom_store" },
      { label: "J'ai un café ou un restaurant", next: "cafe_type" },
      { label: "J'ai un autre besoin", next: "other_type" },
      { label: "Nous contacter", next: "contact" },
    ],
  },

  /* ──────────────────────────── E-commerce ─────────────────────────── */
  {
    id: "ecom_store",
    collect: "store",
    message: "Avez-vous déjà une boutique en ligne ?",
    options: [
      { label: "Non, je vends seulement sur les réseaux", next: "ecom_ads" },
      { label: "Oui, mais je veux la refaire", next: "ecom_ads" },
      { label: "Oui, je veux ajouter des fonctionnalités", next: "ecom_ads" },
    ],
  },
  {
    id: "ecom_ads",
    collect: "ads",
    message: "Faites-vous de la publicité sur Facebook ou TikTok ?",
    options: [
      { label: "Oui", next: "ecom_plan" },
      { label: "Pas encore", next: "ecom_plan" },
    ],
  },
  {
    id: "ecom_plan",
    collect: "plan",
    message: "Quelle offre vous intéresse ?",
    options: [
      ...plans("lead_form"),
      { label: "Voir les offres", href: "/e-commercants#offres" },
    ],
  },

  /* ──────────────────────── Café / restaurant ──────────────────────── */
  {
    id: "cafe_type",
    collect: "business",
    message: "Quel type d'établissement avez-vous ?",
    options: [
      { label: "Café", next: "cafe_need" },
      { label: "Restaurant", next: "cafe_need" },
      { label: "Fast-food", next: "cafe_need" },
      { label: "Pâtisserie", next: "cafe_need" },
      { label: "Autre", next: "cafe_need" },
    ],
  },
  {
    id: "cafe_need",
    collect: "need",
    message: "Qu'est-ce qui vous intéresse le plus ?",
    options: [
      { label: "Être visible en ligne", next: "cafe_plan" },
      { label: "Un menu QR sur les tables", next: "cafe_plan" },
      { label: "Modifier mon menu moi-même", next: "cafe_plan" },
      { label: "Fidéliser mes clients", next: "cafe_plan" },
    ],
  },
  {
    id: "cafe_plan",
    collect: "plan",
    message: "Quelle offre vous intéresse ?",
    options: [
      ...plans("lead_form"),
      { label: "Voir les offres", href: "/cafes-restaurants#offres" },
    ],
  },

  /* ─────────────────────────── Autre besoin ────────────────────────── */
  {
    id: "other_type",
    collect: "projectType",
    message: "De quoi avez-vous besoin ?",
    options: [
      { label: "Un logiciel de gestion", next: "other_describe" },
      { label: "Un site pour un autre secteur", next: "other_describe" },
      { label: "Autre", next: "other_describe" },
    ],
  },
  {
    id: "other_describe",
    message: "Décrivez votre besoin en quelques mots.",
    widget: {
      kind: "text",
      placeholder: "Votre besoin en quelques mots…",
      next: "other_budget",
    },
  },
  {
    id: "other_budget",
    collect: "budget",
    message:
      "Quel est votre budget approximatif ?\nC'est facultatif : cela nous aide à vous proposer une solution réaliste.",
    options: [
      { label: "Moins de 100 000 DA", next: "lead_form" },
      { label: "100 000 – 250 000 DA", next: "lead_form" },
      { label: "250 000 – 500 000 DA", next: "lead_form" },
      { label: "500 000 DA et plus", next: "lead_form" },
      { label: "Je ne sais pas encore", next: "lead_form" },
      { label: "Je préfère ne pas répondre", next: "lead_form" },
    ],
  },

  /* ─────────────────────── Formulaire et confirmation ─────────────────────── */
  {
    id: "lead_form",
    message: "Merci. Laissez-nous vos coordonnées, nous revenons vers vous avec une proposition.",
    widget: { kind: "leadForm", next: "lead_sent" },
  },
  {
    id: "lead_sent",
    message: "Merci, votre demande est bien envoyée. Nous vous recontactons rapidement sur WhatsApp.",
    options: [
      { label: "Voir nos réalisations", href: "/#realisations" },
      { label: "Nous écrire sur WhatsApp", href: contactLinks.whatsapp },
    ],
  },

  /* ───────────────────────────── Contact ───────────────────────────── */
  {
    id: "contact",
    message: "Comment souhaitez-vous nous contacter ?",
    options: [
      { label: "WhatsApp", href: contactLinks.whatsapp },
      { label: "Laisser mes coordonnées", next: "lead_form" },
      { label: "LinkedIn", href: contactLinks.linkedin },
      { label: "GitHub", href: contactLinks.github },
    ],
  },
];

export const conversation: Conversation = Object.fromEntries(
  nodes.map((node) => [node.id, node])
);

/** Nœuds qui recueillent une réponse, dans l'ordre de l'arbre (pour l'email). */
export const collectingNodes = nodes.filter((node) => node.collect || node.widget?.kind === "text");

/**
 * Options pointant vers un nœud inexistant. Toujours vide : vérifié en
 * développement pour qu'une faute de frappe dans `next` se voie au premier rendu.
 */
export const brokenLinks = (): string[] =>
  nodes.flatMap((node) => {
    const targets = [...(node.options ?? []).map((option) => option.next), node.widget?.next];

    return targets
      .filter((target): target is string => typeof target === "string")
      .filter((target) => !conversation[target])
      .map((target) => `${node.id} → ${target}`);
  });
