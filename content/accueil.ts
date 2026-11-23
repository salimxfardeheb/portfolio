import type { AccentTitle, ContactContent, Service } from "./types";
import { projects } from "./site";

export const hero: { title: AccentTitle; lead: string } = {
  title: {
    accent: "Sites et logiciels",
    after: " sur mesure pour les commerces qui veulent vendre plus.",
  },
  lead: "Nous concevons chaque projet de zéro, au design de votre marque : boutiques en ligne, sites vitrines et outils de gestion. Paiement unique, sans abonnement.",
};

export const services: Service[] = [
  {
    title: "Boutiques en ligne",
    text: "Votre propre boutique au design de votre marque, avec commande en paiement à la livraison.",
  },
  {
    title: "Gestion des commandes et livraisons",
    text: "Un espace d’administration pour vos produits, vos stocks et vos commandes, relié à votre société de livraison.",
  },
  {
    title: "Sites vitrines et menus QR",
    text: "Un site à l’image de votre établissement, avec votre menu consultable depuis chaque table.",
  },
  {
    title: "Fidélisation client",
    text: "Une carte de fidélité numérique pour faire revenir vos clients, gérée depuis votre tableau de bord.",
  },
];

export const realisations = [projects.flowmerce, projects.costumia, projects.iaStore];

export const contact: ContactContent = {
  title: { before: "Un projet pour votre ", accent: "commerce", after: " ?" },
  lead: "Décrivez votre besoin, nous revenons vers vous avec une proposition.",
  selectLabel: "Votre besoin",
  options: ["Boutique en ligne", "Site vitrine / menu QR", "Logiciel de gestion", "Autre"],
  messagePlaceholder: "Parlez-nous de votre commerce",
};
