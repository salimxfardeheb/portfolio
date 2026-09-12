import { Project, projectImage } from "./types";

const slug = "almasse-beauty";
const img = (file: string) => projectImage(slug, file);

const almasseBeauty: Project = {
  slug,
  name: "Almasse Beauty",
  accent: "#EC1A80",
  host: "almasse-beauty.vercel.app",
  link: "https://almasse-beauty.vercel.app/",
  category: {
    en: "Custom e-commerce · Beauty",
    fr: "E-commerce sur mesure · Beauté",
  },
  tagline: {
    en: "Authentic cosmetics, delivered across all 58 wilayas.",
    fr: "Des cosmétiques authentiques, livrés dans les 58 wilayas.",
  },
  duration: { en: "7–30 days", fr: "7 à 30 jours" },
  role: {
    en: "Design, storefront & admin development",
    fr: "Design, développement de la vitrine & de l'administration",
  },
  cover: img("home.png"),
  summary: {
    en: "Almasse Beauty is an online beauty store selling hand-picked makeup and skincare from real brands — Huda Beauty, Rare Beauty, Fenty, Maybelline, NYX, e.l.f., Estée Lauder. It pairs a soft, brand-led storefront with an admin space precise enough to run the shop day to day: revenue, order pipeline, shade-level stock and customer accounts.",
    fr: "Almasse Beauty est une boutique de beauté en ligne qui vend du maquillage et des soins sélectionnés à la main, issus de vraies marques — Huda Beauty, Rare Beauty, Fenty, Maybelline, NYX, e.l.f., Estée Lauder. Elle associe une vitrine douce et centrée sur les marques à un espace d'administration assez précis pour piloter la boutique au quotidien : chiffre d'affaires, file des commandes, stock à la teinte et comptes clientes.",
  },
  challenge: {
    en: "In a market flooded with counterfeits, customers will not prepay for cosmetics they cannot verify. The shop had to earn trust before it could sell: prove the products are genuine, name the brands it carries, and let people pay only once the parcel is in their hands.",
    fr: "Sur un marché saturé de contrefaçons, les clientes ne paient pas d'avance des cosmétiques qu'elles ne peuvent pas vérifier. La boutique devait gagner la confiance avant de pouvoir vendre : prouver que les produits sont authentiques, nommer les marques distribuées, et permettre de ne régler qu'une fois le colis en main.",
  },
  solution: {
    en: "I built the storefront around that promise — a brand wall of the houses actually stocked, an authenticity guarantee, cash on delivery, and delivery to the 58 wilayas with 77 pickup desks, all stated above the fold. The catalogue filters by brand and by status (new, best sellers, sale) and goes down to the individual shade. The admin space gives the owner a monthly read on orders and revenue, a status pipeline from \"to confirm\" to \"in preparation\", a low-stock watchlist per variant, and product, pack and customer management.",
    fr: "J'ai construit la vitrine autour de cette promesse : un mur des marques réellement distribuées, une garantie d'authenticité, le paiement à la livraison, et la livraison dans les 58 wilayas avec 77 bureaux de retrait, le tout annoncé dès le premier écran. Le catalogue se filtre par marque et par statut (nouveautés, best-sellers, promotions) et descend jusqu'à la teinte. L'espace d'administration donne à la gérante une lecture mensuelle des commandes et du chiffre d'affaires, une file de statuts de « à confirmer » à « en préparation », une surveillance des stocks faibles par déclinaison, et la gestion des produits, des packs et des clientes.",
  },
  highlights: {
    en: [
      "Brand wall and authenticity guarantee placed above the fold to build trust first",
      "Catalogue filtered by brand and by status — new, best sellers, sale — down to the shade",
      "Cash on delivery, 58 wilayas covered and 77 pickup desks",
      "Admin dashboard: monthly orders, revenue excluding cancellations, claims awaiting an answer",
      "Order pipeline with per-order status, plus a low-stock watchlist at variant level",
      "Product, pack and customer account management",
    ],
    fr: [
      "Mur des marques et garantie d'authenticité placés dès le premier écran pour installer la confiance",
      "Catalogue filtré par marque et par statut — nouveautés, best-sellers, promotions — jusqu'à la teinte",
      "Paiement à la livraison, 58 wilayas couvertes et 77 bureaux de retrait",
      "Tableau de bord : commandes du mois, chiffre d'affaires hors annulations, demandes en attente de réponse",
      "File des commandes avec statut par commande et surveillance des stocks faibles à la déclinaison",
      "Gestion des produits, des packs et des comptes clientes",
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
            en: "Home page: brand wall, product picks and the trust argument",
            fr: "Page d'accueil : mur des marques, sélection de produits et argument de confiance",
          },
        },
        {
          src: img("categorie.png"),
          caption: {
            en: "Category page with brand and status filters",
            fr: "Page catégorie avec filtres par marque et par statut",
          },
        },
      ],
    },
    {
      title: { en: "Admin space", fr: "Espace d'administration" },
      shots: [
        {
          src: img("admin-dash.png"),
          caption: {
            en: "Dashboard: monthly orders, revenue, orders to confirm and stock to watch",
            fr: "Tableau de bord : commandes du mois, chiffre d'affaires, commandes à confirmer et stock à surveiller",
          },
        },
        {
          src: img("admin-product.png"),
          caption: {
            en: "Product management with variants and shades",
            fr: "Gestion des produits avec déclinaisons et teintes",
          },
        },
      ],
    },
  ],
};

export default almasseBeauty;
