/**
 * Données partagées par les pages : navigation, réseaux, équipe.
 * Les projets sont dans app/data/ (portfolio.config.ts pour choisir lesquels s'affichent).
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

/** Liste déroulante « Offres » de la navigation : une entrée par page d'offre. */
export const offers: (NavLink & { text: string })[] = [
  { label: "E-commerçants", href: "/e-commercants#offres", text: "Boutique en ligne sur mesure" },
  { label: "Cafés & restaurants", href: "/cafes-restaurants#offres", text: "Site vitrine et menu QR" },
];

export const socials: NavLink[] = [
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/salim-fardeheb" },
  { label: "GitHub", href: "https://github.com/salimxfardeheb" },
];

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
