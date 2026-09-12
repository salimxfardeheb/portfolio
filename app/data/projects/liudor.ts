import { Project, projectImage } from "./types";

const slug = "liudor";
const img = (file: string) => projectImage(slug, file);

const screens = {
  home: "FireShot Capture 039 - Accueil - LIUDOR - [localhost].png",
  venue: "FireShot Capture 040 - Le meridien auditorium — Oran - LIUDOR - [localhost].png",
  admin: "FireShot Capture 041 - Tableau de bord - LIUDOR - [localhost].png",
  availability: "FireShot Capture 042 - Disponibilités - LIUDOR - [localhost].png",
  venues: "FireShot Capture 043 - Mes salles - LIUDOR - [localhost].png",
  bookings: "FireShot Capture 044 - Mes réservations - LIUDOR - [localhost].png",
};

const liudor: Project = {
  slug,
  name: "LIUDOR",
  accent: "#C9A227",
  category: {
    en: "Marketplace · Event venue booking",
    fr: "Marketplace · Réservation de salles",
  },
  tagline: {
    en: "The right venue for every event, booked with confidence.",
    fr: "La salle parfaite pour chaque événement, réservée en confiance.",
  },
  duration: { en: "1–3 months", fr: "1 à 3 mois" },
  role: {
    en: "Product design & full-stack development",
    fr: "Conception produit & développement full-stack",
  },
  cover: img(screens.home),
  summary: {
    en: "LIUDOR — Lieux d'Or — is a marketplace for event venues in Algeria. Customers search wedding halls, conference rooms and reception venues by wilaya, date, guest count and event type, compare capacity, equipment, services and prices, then send a booking request. Venue owners manage their listings and availability from their own space, and the LIUDOR team verifies every venue and every payment in between.",
    fr: "LIUDOR — Lieux d'Or — est une marketplace de salles événementielles en Algérie. Les clients recherchent salles des fêtes, salles de conférence et lieux de réception par wilaya, date, nombre d'invités et type d'événement, comparent capacités, équipements, services et prix, puis envoient une demande de réservation. Les propriétaires gèrent leurs salles et leurs disponibilités depuis leur espace, et l'équipe LIUDOR vérifie chaque salle et chaque paiement entre les deux.",
  },
  challenge: {
    en: "Organising a wedding or a seminar in Algeria still means calling venues one by one: photos that don't match reality, prices given only over the phone, no way to tell whether a date is free, and deposits handed over with no guarantee. On the other side, owners track requests and dates by hand.",
    fr: "Organiser un mariage ou un séminaire en Algérie, c'est encore appeler les salles une par une : des photos qui ne correspondent pas à la réalité, des prix donnés seulement au téléphone, aucun moyen de savoir si une date est libre, et des acomptes versés sans garantie. De l'autre côté, les propriétaires suivent demandes et dates à la main.",
  },
  solution: {
    en: "I built the three sides of the marketplace. The public site offers a search across wilaya, date (single or multi-day), guest count and event type, popular categories and destinations, and detailed venue pages: verified badge, photo gallery, capacity, parking and accommodation, equipment, optional services with their prices, a live availability calendar, a map and similar venues. Booking requests reach the LIUDOR team first, who call the customer to confirm the date and the payment — and only customers whose booking was confirmed can leave a review. Owners get a space to list venues, open or close dates by day or by period, and confirm or cancel requests while tracking what LIUDOR has paid out. An admin back-office validates new venues and manages customers, owners, the blog and testimonials.",
    fr: "J'ai construit les trois faces de la marketplace. Le site public propose une recherche par wilaya, date (un ou plusieurs jours), nombre d'invités et type d'événement, des catégories et destinations populaires, et des fiches salle détaillées : badge « salle vérifiée », galerie photos, capacité, parking et hébergement, équipements, services optionnels avec leurs prix, calendrier de disponibilité en direct, carte et salles similaires. Les demandes de réservation arrivent d'abord à l'équipe LIUDOR, qui rappelle le client pour confirmer la date et le règlement — et seuls les clients dont la réservation a été confirmée peuvent laisser un avis. Les propriétaires disposent d'un espace pour publier leurs salles, ouvrir ou fermer des dates au jour ou par période, et confirmer ou annuler les demandes en suivant les montants reversés par LIUDOR. Un back-office d'administration valide les nouvelles salles et gère clients, propriétaires, blog et témoignages.",
  },
  highlights: {
    en: [
      "Search by wilaya, date — single or multi-day — guest count and event type",
      "Venue pages with verified badge, equipment, priced optional services and a live availability calendar",
      "Payments checked and recorded by the LIUDOR team before any booking is confirmed",
      "Reviews reserved for customers whose booking was actually confirmed",
      "Owner space: open or close dates by day or period, confirm or cancel requests, track payouts",
      "Admin back-office to validate venues and manage customers, owners, blog and testimonials",
    ],
    fr: [
      "Recherche par wilaya, date — un ou plusieurs jours — nombre d'invités et type d'événement",
      "Fiches salle avec badge vérifié, équipements, services optionnels chiffrés et calendrier de disponibilité en direct",
      "Paiements vérifiés et enregistrés par l'équipe LIUDOR avant toute confirmation",
      "Avis réservés aux clients dont la réservation a réellement été confirmée",
      "Espace propriétaire : ouvrir ou fermer des dates au jour ou par période, confirmer ou annuler, suivre les versements",
      "Back-office d'administration pour valider les salles et gérer clients, propriétaires, blog et témoignages",
    ],
  },
  stack: ["Marketplace", "Booking & availability", "Payment workflow", "Admin dashboard"],
  gallery: [
    {
      title: { en: "Public site", fr: "Site public" },
      shots: [
        {
          src: img(screens.home),
          caption: {
            en: "Home page: multi-criteria search, categories, popular venues and destinations",
            fr: "Accueil : recherche multicritère, catégories, salles et destinations populaires",
          },
        },
        {
          src: img(screens.venue),
          caption: {
            en: "Venue page: equipment, services, availability calendar, booking request and map",
            fr: "Fiche salle : équipements, services, calendrier de disponibilité, demande de réservation et carte",
          },
        },
      ],
    },
    {
      title: { en: "Owner space", fr: "Espace propriétaire" },
      shots: [
        {
          src: img(screens.venues),
          caption: {
            en: "My venues: status, capacity, price per day and bookings in progress",
            fr: "Mes salles : statut, capacité, prix par jour et réservations en cours",
          },
        },
        {
          src: img(screens.availability),
          caption: {
            en: "Availability: open or close dates by day or by period",
            fr: "Disponibilités : ouvrir ou fermer des dates, au jour ou par période",
          },
        },
        {
          src: img(screens.bookings),
          caption: {
            en: "Bookings: requests to handle, confirmations and payouts from LIUDOR",
            fr: "Réservations : demandes à traiter, confirmations et montants reversés par LIUDOR",
          },
        },
      ],
    },
    {
      title: { en: "Administration", fr: "Administration" },
      shots: [
        {
          src: img(screens.admin),
          caption: {
            en: "Admin dashboard: customers, owners, venues to validate and monthly bookings",
            fr: "Tableau de bord admin : clients, propriétaires, salles à valider et réservations du mois",
          },
        },
      ],
    },
  ],
};

export default liudor;
