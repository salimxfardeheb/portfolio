import { Project, projectImage } from "./types";

const slug = "ia-store";
const img = (file: string) => projectImage(slug, file);

const iaStore: Project = {
  slug,
  name: "IA Store",
  accent: "#A68A64",
  host: "ia-store.vercel.app",
  link: "https://ia-store.vercel.app/",
  category: {
    en: "Custom e-commerce · Men's fashion",
    fr: "E-commerce sur mesure · Mode homme",
  },
  tagline: {
    en: "An editorial storefront, built from scratch.",
    fr: "Une boutique éditoriale, construite de zéro.",
  },
  duration: { en: "7–30 days", fr: "7 à 30 jours" },
  role: {
    en: "Design, storefront & back-office development",
    fr: "Design, développement de la boutique & du back-office",
  },
  cover: img("home.png"),
  summary: {
    en: "IA Store is an online men's fashion store — clothing, shoes and accessories — built around an editorial \"Old Money\" art direction rather than a generic shop template. Customers browse a filtered premium catalogue and styled outfit selections; the owner runs the whole thing from a custom admin panel.",
    fr: "IA Store est une boutique de mode masculine en ligne — vêtements, chaussures et accessoires — construite autour d'une direction artistique éditoriale « Old Money » plutôt que sur un template de boutique générique. Le client parcourt un catalogue premium filtrable et des sélections de tenues ; le gérant pilote l'ensemble depuis un panneau d'administration sur mesure.",
  },
  challenge: {
    en: "Off-the-shelf platforms box a brand into someone else's template, take a cut of every sale, and make an editorial look nearly impossible. The store needed to read like a fashion magazine while staying fully manageable by its owner, with no developer in the loop for day-to-day work.",
    fr: "Les plateformes clés en main enferment la marque dans le template d'un autre, prélèvent une commission sur chaque vente et rendent un rendu éditorial presque impossible. La boutique devait se lire comme un magazine de mode tout en restant entièrement gérable par son propriétaire, sans développeur dans la boucle au quotidien.",
  },
  solution: {
    en: "I designed and developed both sides of the store. The storefront opens on a full-bleed editorial hero, then unfolds a premium catalogue with tabs (all, best sellers, new arrivals, sale), promo and best-seller badges, wishlist, product pages and a \"Looks & outfits\" section that sells complete styles rather than single items. Behind it, the admin panel handles the catalogue, product pages, stock and orders. The store is also the first shop plugged into Flowmerce's return API, so its claims are processed automatically.",
    fr: "J'ai conçu et développé les deux faces de la boutique. La vitrine s'ouvre sur un hero éditorial pleine largeur, puis déroule un catalogue premium avec onglets (tout, best-sellers, nouveautés, promotions), badges promo et best-seller, liste de souhaits, fiches produit et une section « Looks & Tenues » qui vend des styles complets plutôt que des pièces isolées. Derrière, le panneau d'administration gère le catalogue, les fiches produit, le stock et les commandes. La boutique est aussi le premier magasin branché sur l'API de retours de Flowmerce : ses réclamations sont traitées automatiquement.",
  },
  highlights: {
    en: [
      "Editorial art direction: full-bleed hero, serif typography, magazine-style layout",
      "Premium catalogue with tabs — all, best sellers, new arrivals, sale — and promo badges",
      "Product pages with variants, pricing in DA, wishlist and cart",
      "\"Looks & outfits\" section selling complete styles instead of single items",
      "Custom admin panel for catalogue, stock and orders — no developer needed",
      "Connected to the Flowmerce API for automated return handling",
    ],
    fr: [
      "Direction artistique éditoriale : hero pleine largeur, typographie serif, mise en page magazine",
      "Catalogue premium avec onglets — tout, best-sellers, nouveautés, promotions — et badges promo",
      "Fiches produit avec déclinaisons, prix en DA, liste de souhaits et panier",
      "Section « Looks & Tenues » qui vend des styles complets plutôt que des pièces isolées",
      "Panneau d'administration sur mesure pour le catalogue, le stock et les commandes — sans développeur",
      "Connectée à l'API Flowmerce pour le traitement automatisé des retours",
    ],
  },
  stack: ["Custom e-commerce", "API integration", "Admin dashboard", "Responsive"],
  gallery: [
    {
      title: { en: "Storefront", fr: "Vitrine" },
      shots: [
        {
          src: img("home.png"),
          caption: {
            en: "Home page: editorial hero, premium selection and outfit inspiration",
            fr: "Page d'accueil : hero éditorial, sélection premium et inspirations de tenues",
          },
        },
      ],
    },
    {
      title: { en: "Back-office", fr: "Back-office" },
      shots: [
        {
          src: img("admin.png"),
          caption: { en: "Admin dashboard", fr: "Tableau de bord d'administration" },
        },
        {
          src: img("admin-catalogue.png"),
          caption: {
            en: "Catalogue management — products, variants and stock",
            fr: "Gestion du catalogue — produits, déclinaisons et stock",
          },
        },
      ],
    },
  ],
};

export default iaStore;
