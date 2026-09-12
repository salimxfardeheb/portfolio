import { Project, projectImage } from "./types";

const slug = "location-costume";
const img = (file: string) => projectImage(slug, file);

const screens = {
  directory:
    "FireShot Capture 053 - Costumia — L'annuaire des boutiques de location de costumes_ - [location-costumes.vercel.app].png",
  dashboard: "FireShot Capture 055 - Location costumes app - [location-costumes.vercel.app] (1).png",
  search: "FireShot Capture 057 - Location costumes app - [location-costumes.vercel.app].png",
  newRental: "FireShot Capture 058 - Location costumes app - [location-costumes.vercel.app].png",
  calendar: "FireShot Capture 059 - Location costumes app - [location-costumes.vercel.app].png",
  catalogue: "FireShot Capture 060 - Location costumes app - [location-costumes.vercel.app].png",
  publish: "FireShot Capture 062 - Location costumes app - [location-costumes.vercel.app].png",
  profile: "FireShot Capture 063 - Location costumes app - [location-costumes.vercel.app] (1).png",
};

const locationCostume: Project = {
  slug,
  name: "Costumia",
  accent: "#F5A623",
  host: "location-costumes.vercel.app",
  link: "https://location-costumes.vercel.app/",
  category: {
    en: "SaaS · Rental management",
    fr: "SaaS · Gestion de location",
  },
  tagline: {
    en: "Find it here, try it on in store.",
    fr: "Vous cherchez ici, vous essayez là-bas.",
  },
  duration: { en: "2–3 months", fr: "2 à 3 mois" },
  role: {
    en: "Product design & full-stack development",
    fr: "Conception produit & développement full-stack",
  },
  cover: img(screens.directory),
  summary: {
    en: "Costumia is a SaaS platform for costume rental shops in Algeria. Each shop gets its own back-office to run the business — catalogue by size, rentals, deposits and balances due, calendar — and everything it publishes feeds a public directory where customers find a costume in their size at a shop near them, then go and try it on.",
    fr: "Costumia est une plateforme SaaS pour les boutiques de location de costumes en Algérie. Chaque boutique dispose de son propre back-office pour piloter son activité — catalogue par taille, locations, acomptes et restes à payer, calendrier — et tout ce qu'elle publie alimente un annuaire public où les clients trouvent un costume à leur taille dans une boutique proche, avant d'aller l'essayer sur place.",
  },
  challenge: {
    en: "Costume rental shops still run on paper notebooks and phone calls. The same suit gets promised to two customers for the same weekend, nobody knows exactly what a customer still owes, and a shop's stock is invisible to anyone who doesn't walk through the door — so customers ring shop after shop just to ask whether a size is available.",
    fr: "Les boutiques de location de costumes fonctionnent encore au carnet papier et au téléphone. Le même costume est promis à deux clients pour le même week-end, personne ne sait exactement ce qu'il reste à payer, et le stock d'une boutique est invisible pour qui ne pousse pas la porte — les clients appellent donc boutique après boutique pour savoir si une taille est disponible.",
  },
  solution: {
    en: "I built two products on one platform. On the shop side: a dashboard with monthly, total and average revenue and the upcoming rentals with deposit paid and balance due; a three-step rental wizard (date, rental details, customer) that checks availability automatically so an item can never be booked twice; a monthly calendar colour-coded by item type; customer search across the full rental history; a catalogue split into suits, shirts, shoes and accessories; and a shop profile with logo, wilaya, address, social links and a Google Maps pin. On the public side: a directory filtered by wilaya, with no account to create and nothing to pay online — customers see only the sizes actually on the rack, plus the address and opening hours to try the costume on in store.",
    fr: "J'ai construit deux produits sur une même plateforme. Côté boutique : un tableau de bord avec revenu du mois, revenu total et revenu moyen, et les locations à venir avec l'acompte versé et le reste à payer ; un assistant de location en trois étapes (date, détails de la location, client) qui vérifie automatiquement la disponibilité pour qu'un article ne soit jamais réservé deux fois ; un calendrier mensuel coloré par type d'article ; une recherche client sur tout l'historique des locations ; un catalogue réparti en costumes, chemises, chaussures et accessoires ; et un profil de boutique avec logo, wilaya, adresse, réseaux sociaux et lien Google Maps. Côté public : un annuaire filtré par wilaya, sans compte à créer ni paiement en ligne — le client ne voit que les tailles réellement disponibles, avec l'adresse et les horaires pour essayer le costume en boutique.",
  },
  highlights: {
    en: [
      "Public directory filtered by wilaya — no account to create, only sizes actually on the rack",
      "Automatic availability checks that stop the same item from being booked twice",
      "Deposit and balance due tracked on every rental, with monthly, total and average revenue",
      "Three-step rental wizard — date, rental details, customer — and customer search across the full history",
      "Monthly calendar colour-coded by item type: suit, shirt, shoes, accessory",
      "Item publishing with occasion, price, discount and matching shirt, shoes and accessories",
    ],
    fr: [
      "Annuaire public filtré par wilaya — sans compte à créer, uniquement les tailles réellement disponibles",
      "Vérification automatique des disponibilités qui empêche de réserver deux fois le même article",
      "Acompte et reste à payer suivis sur chaque location, avec revenu du mois, total et moyen",
      "Assistant de location en trois étapes — date, détails, client — et recherche client sur tout l'historique",
      "Calendrier mensuel coloré par type d'article : costume, chemise, chaussure, accessoire",
      "Publication d'articles avec occasion, prix, remise et chemise, chaussures et accessoires associés",
    ],
  },
  stack: ["SaaS", "Multi-shop platform", "Booking & availability", "Public directory"],
  gallery: [
    {
      title: { en: "Public directory", fr: "Annuaire public" },
      shots: [
        {
          src: img(screens.directory),
          caption: {
            en: "Home page: shops, items for rent, and how renting through Costumia works",
            fr: "Accueil : boutiques, articles à louer et fonctionnement de la location via Costumia",
          },
        },
      ],
    },
    {
      title: { en: "Shop back-office", fr: "Back-office boutique" },
      shots: [
        {
          src: img(screens.dashboard),
          caption: {
            en: "Dashboard: monthly, total and average revenue, and upcoming rentals with deposit and balance",
            fr: "Tableau de bord : revenu du mois, total et moyen, et locations à venir avec acompte et reste à payer",
          },
        },
        {
          src: img(screens.newRental),
          caption: {
            en: "New rental wizard — step 1, choosing the rental date",
            fr: "Assistant de nouvelle location — étape 1, choix de la date",
          },
        },
        {
          src: img(screens.calendar),
          caption: {
            en: "Monthly calendar of rentals, colour-coded by item type",
            fr: "Calendrier mensuel des locations, par type d'article",
          },
        },
        {
          src: img(screens.search),
          caption: {
            en: "Customer search by name or phone, with rental history",
            fr: "Recherche client par nom ou téléphone, avec historique des locations",
          },
        },
        {
          src: img(screens.catalogue),
          caption: {
            en: "Shop catalogue by category: suits, shirts, shoes, accessories",
            fr: "Catalogue de la boutique par catégorie : costumes, chemises, chaussures, accessoires",
          },
        },
        {
          src: img(screens.publish),
          caption: {
            en: "Publishing an item to the directory: occasion, price, discount, matching pieces",
            fr: "Publication d'un article dans l'annuaire : occasion, prix, remise, articles associés",
          },
        },
        {
          src: img(screens.profile),
          caption: {
            en: "Shop profile shown on the public page: logo, wilaya, address, social links, Maps pin",
            fr: "Profil de la boutique affiché sur la vitrine publique : logo, wilaya, adresse, réseaux, lien Maps",
          },
        },
      ],
    },
  ],
};

export default locationCostume;
