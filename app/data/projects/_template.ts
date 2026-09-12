/**
 * MODÈLE DE PROJET
 *
 * 1. Copie ce fichier et renomme-le comme ton dossier d'images, ex : mon-projet.ts
 * 2. Remplis chaque champ (en = anglais, fr = français)
 * 3. Ajoute-le dans app/data/portfolio.config.ts
 *
 * Ce fichier-ci n'est importé nulle part : il ne s'affiche jamais sur le site.
 */
import { Project, projectImage } from "./types";

// Doit être identique au nom du dossier : public/projects/mon-projet/
const slug = "mon-projet";
const img = (file: string) => projectImage(slug, file); // img("home.png") → public/projects/mon-projet/images/home.png

const project: Project = {
  slug,
  name: "Nom du projet",
  accent: "#FF302F", // couleur de la marque du projet (petit point + bord du cadre)
  host: "mon-projet.vercel.app", // texte de la fausse barre d'adresse — optionnel
  link: "https://mon-projet.vercel.app/", // bouton « Voir le site » — supprime la ligne s'il n'y a pas de site en ligne
  category: { en: "SaaS · Category", fr: "SaaS · Catégorie" },
  tagline: { en: "The promise in one line.", fr: "La promesse en une phrase." },
  duration: { en: "1–3 months", fr: "1 à 3 mois" },
  role: {
    en: "Design & full-stack development",
    fr: "Conception & développement full-stack",
  },
  cover: img("home.png"), // grande image principale
  summary: {
    en: "What the product is and who it is for, in 2–3 sentences.",
    fr: "Ce qu'est le produit et pour qui, en 2–3 phrases.",
  },
  challenge: {
    en: "The problem it solves.",
    fr: "Le problème qu'il résout.",
  },
  solution: {
    en: "What you built, concretely.",
    fr: "Ce que tu as construit, concrètement.",
  },
  // Les 3 premières s'affichent aussi sur la page d'accueil
  highlights: {
    en: ["Feature 1", "Feature 2", "Feature 3"],
    fr: ["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"],
  },
  stack: ["Next.js", "Tag 2"],
  gallery: [
    {
      title: { en: "Screens", fr: "Écrans" },
      shots: [
        { src: img("home.png"), caption: { en: "Home page", fr: "Page d'accueil" } },
      ],
    },
  ],
};

export default project;
