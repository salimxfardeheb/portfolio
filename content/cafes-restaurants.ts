import type { AccentTitle, Benefit, ContactContent, Plan, Service } from "./types";
import type { Project } from "./site";

export const hero: { title: AccentTitle; lead: string } = {
  title: { before: "Le site de votre ", accent: "café ou restaurant", after: ", avant même de payer" },
  lead: "Nous créons une démo au design de votre établissement. Vous l'essayez 7 jours : satisfait, vous payez ; sinon, nous la retirons, sans frais.",
};

const starterFeatures = [
  "Site d’une page au design de votre établissement",
  "Votre menu et vos prix",
  "Horaires et plan d’accès",
  "WhatsApp et appel direct",
];

const plusFeatures = [
  ...starterFeatures,
  "Menu QR à imprimer pour vos tables",
  "Nom de domaine personnalisé",
];

export const plans: Plan[] = [
  {
    name: "Starter",
    badge: "Essai 7 jours",
    summary: "Votre établissement visible en ligne.",
    features: starterFeatures,
  },
  {
    name: "Plus",
    badge: "Essai 7 jours",
    summary: "Votre menu sur chaque table.",
    featured: true,
    features: plusFeatures,
  },
  {
    name: "Premium",
    badge: "Sur devis",
    summary: "Vous gérez votre menu et fidélisez vos clients.",
    features: [
      ...plusFeatures,
      "Tableau de bord pour modifier votre menu",
      "Carte de fidélité numérique",
      "Garantie d’un mois incluse",
    ],
  },
];

export const plansNote =
  "Starter et Plus : démo gratuite, essai 7 jours, paiement unique. Premium : sur devis, 40 % à la commande, 60 % à la livraison, garantie d'un mois. Nom de domaine au nom du client.";

export const benefits: Benefit[] = [
  {
    title: "Un seul lien pour tous vos clients",
    text: "Menu, horaires, adresse et WhatsApp réunis au même endroit, à partager sur Instagram, Google Maps et vos tables.",
  },
  {
    title: "Votre menu à jour, sans réimprimer",
    text: "Vos clients scannent le QR code sur la table. Un prix ou un plat change, le menu en ligne suit.",
  },
  {
    title: "Vos clients reviennent",
    text: "Une carte de fidélité numérique sur leur téléphone, pour les récompenser et les faire revenir.",
  },
];

export const care = {
  title: "Nous veillons sur votre site après la mise en ligne",
  text: "Nous surveillons votre site, appliquons les mises à jour de sécurité et intervenons rapidement en cas de problème, pour que vos clients trouvent toujours votre menu.",
};

export const services: Service[] = [
  {
    title: "Site vitrine",
    text: "Un site à l’image de votre établissement, rapide à ouvrir sur téléphone.",
  },
  {
    title: "Menu QR",
    text: "Vos clients scannent le QR code sur la table et consultent votre menu à jour.",
  },
  {
    title: "Gestion du menu",
    text: "Changez vos plats et vos prix vous-même, depuis un tableau de bord simple.",
  },
  {
    title: "Carte de fidélité",
    text: "Une carte numérique sur le téléphone du client pour le faire revenir.",
  },
];

/**
 * Projets affichés dans « 03 Projets similaires ». Vide pour l'instant : la section n'affiche
 * que son label. Ajoute un projet ici (ex. `projects.xxx` de ./site, ou un objet Project)
 * et il apparaîtra automatiquement, numéroté P.01, P.02…
 */
export const similarProjects: Project[] = [];

export const contact: ContactContent = {
  title: { before: "Recevez la démo de votre ", accent: "établissement" },
  lead: "Donnez-nous le nom de votre café ou restaurant, nous préparons votre démo gratuite.",
  selectLabel: "Offre souhaitée",
  options: ["Starter", "Plus", "Premium", "Je ne sais pas encore"],
  messagePlaceholder: "Nom et adresse de votre établissement",
};
