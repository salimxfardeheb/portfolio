/**
 * Données partagées par les 3 pages : navigation, réseaux, projets, équipe.
 * Les textes propres à chaque page sont dans content/<page>.ts.
 */

export const SITE_URL = "https://salimxfardeheb.com";
export const SITE_NAME = "Info Expertise";

export const WHATSAPP_NUMBER = "213670668790";

export type NavLink = { label: string; href: string };

export const pages: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "E-commerçants", href: "/e-commercants" },
  { label: "Cafés & restaurants", href: "/cafes-restaurants" },
];

export const socials: NavLink[] = [
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/salim-fardeheb" },
  { label: "GitHub", href: "https://github.com/salimxfardeheb" },
];

export type Project = {
  name: string;
  summary: string;
  category: string;
  href: string;
};

export const projects = {
  flowmerce: {
    name: "Flowmerce",
    summary:
      "Gestion des retours e-commerce et détection des commandes frauduleuses en paiement à la livraison.",
    category: "Plateforme SaaS",
    href: "https://flowmerce-web-app.vercel.app/",
  },
  costumia: {
    name: "Costumia",
    summary: "Plateforme de gestion de location de costumes pour les boutiques en Algérie.",
    category: "Logiciel de gestion",
    href: "https://location-costumes.vercel.app/",
  },
  iaStore: {
    name: "IA Store",
    summary: "Boutique de mode homme sur mesure, avec un espace d’administration dédié.",
    category: "Boutique en ligne",
    href: "https://ia-store.vercel.app/",
  },
} satisfies Record<string, Project>;

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Salim Fardeheb",
    role: "Fondateur et développeur",
    bio: "Titulaire d'un Master en Systèmes d'Information et Données, il conçoit et développe chaque projet, de la maquette à la mise en ligne.",
    photo: "/images/team/salim-fardeheb.jpg",
  },
  {
    name: "Aya Kasmi",
    role: "Marketing & Communication",
    bio: "Titulaire d’un Master en Marketing Digital, spécialisée en marketing et développement commercial.",
    photo: "/images/team/aya-kasmi.svg",
  },
];
