import type { ContactContent } from "./types";

/** Textes communs aux pages /realisations/<slug>. Le contenu de chaque projet est dans app/data/projects/. */
export const contact: ContactContent = {
  title: { before: "Un projet ", accent: "similaire", after: " pour votre commerce ?" },
  lead: "Décrivez votre besoin, nous revenons vers vous avec une proposition.",
  selectLabel: "Votre besoin",
  options: ["Boutique en ligne", "Site vitrine / menu QR", "Logiciel de gestion", "Autre"],
  messagePlaceholder: "Parlez-nous de votre commerce",
};
