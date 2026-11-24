/**
 * Assistant à règles — types.
 *
 * L'assistant est un graphe de nœuds statiques : aucune IA, aucun appel réseau,
 * aucun texte généré. Ajouter une branche = ajouter un nœud dans
 * app/data/chatbot/conversation.ts, sans toucher aux composants.
 */

/** Réponses mises de côté pendant la conversation, envoyées avec le formulaire. */
export type LeadField = "store" | "ads" | "business" | "need" | "plan" | "projectType" | "budget";

/** Bloc ajouté par un nœud, en plus de son message et de ses options. */
export type ChatWidget =
  /** Champ de texte libre — le seul endroit où le visiteur rédige. */
  | { kind: "text"; placeholder: string; next: string }
  /** Formulaire de coordonnées, envoyé par POST /api/contact. */
  | { kind: "leadForm"; next: string };

export interface ChatOption {
  /** Libellé du bouton, repris comme message du visiteur. */
  label: string;
  /** Nœud suivant. */
  next?: string;
  /**
   * Lien à suivre au lieu d'avancer dans l'arbre : route interne avec ou sans
   * ancre ("/e-commercants#offres"), ancre de la page ("#contact") ou URL externe.
   * La conversation reste où elle est.
   */
  href?: string;
}

export interface ChatNode {
  id: string;
  /** Message du bot. Les "\n" sont conservés à l'affichage. */
  message: string;
  options?: ChatOption[];
  widget?: ChatWidget;
  /** Enregistre le libellé choisi dans ce champ du brief. */
  collect?: LeadField;
  /** Retire la rangée « Retour / Accueil » — nœud d'accueil uniquement. */
  hideNav?: boolean;
}

export type Conversation = Record<string, ChatNode>;

export type ChatAuthor = "bot" | "user";

/** Une ligne de l'historique. */
export interface ChatEntry {
  key: string;
  author: ChatAuthor;
  text: string;
  /** Lignes du bot uniquement : le nœud qui l'a produite. */
  nodeId?: string;
}

/** Ce que la conversation a recueilli (tous les champs sont facultatifs). */
export type LeadDraft = Partial<Record<LeadField, string>> & {
  /** Texte libre saisi par le visiteur. */
  description?: string;
};
