import { Project, projectImage } from "./types";

const slug = "flowmerce";
const img = (file: string) => projectImage(slug, file);

const flowmerce: Project = {
  slug,
  name: "Flowmerce",
  accent: "#4F46E5",
  host: "flowmerce-web-app.vercel.app",
  link: "https://flowmerce-web-app.vercel.app/",
  category: {
    en: "SaaS · AI & Machine Learning",
    fr: "SaaS · IA & Machine Learning",
  },
  tagline: {
    en: "AI recommends, the merchant decides.",
    fr: "L'IA recommande, le marchand garde la main.",
  },
  duration: { en: "6+ months", fr: "+6 mois" },
  role: {
    en: "Product design, full-stack development & ML pipeline",
    fr: "Conception produit, développement full-stack & pipeline ML",
  },
  cover: img("public/home.png"),
  summary: {
    en: "Flowmerce is a SaaS platform that handles e-commerce return claims from end to end. A customer files a claim on a portal carrying the store's own brand; the platform cross-checks it against the merchant's return policy and the customer's history, then recommends a resolution — exchange, refund, repair or refusal — with a confidence score the merchant can accept, override, or let run automatically.",
    fr: "Flowmerce est une plateforme SaaS qui prend en charge les réclamations de retour e-commerce de bout en bout. Le client dépose sa demande sur un portail aux couleurs de la boutique ; la plateforme la confronte à la politique de retour du marchand et à l'historique du client, puis recommande une résolution — échange, remboursement, réparation ou refus — avec un score de confiance que le marchand peut accepter, modifier, ou laisser s'appliquer automatiquement.",
  },
  challenge: {
    en: "Online stores process returns by hand, one email at a time. Every claim means re-reading the return policy, digging up the order, and guessing whether the customer is acting in good faith. It is slow, it is inconsistent from one agent to the next, and it is completely blind to repeat abusers — someone refused by one shop simply moves on to the next one.",
    fr: "Les boutiques en ligne traitent leurs retours à la main, un e-mail à la fois. Chaque réclamation impose de relire la politique de retour, de retrouver la commande et de deviner si le client est de bonne foi. C'est lent, incohérent d'un agent à l'autre, et totalement aveugle aux abus répétés : un client refusé par une boutique passe simplement à la suivante.",
  },
  solution: {
    en: "I built the whole product — the merchant back-office, the customer claim portal, the public site and its documentation, the REST API stores plug into their checkout, and the machine-learning pipeline behind every decision. A LightGBM model trained on a 50,000-row returns dataset (cleaning, feature engineering, SMOTE rebalancing, GridSearchCV tuning, then served over a FastAPI endpoint) predicts the resolution, while a separate risk score computed across every store on the network flags claims that look fraudulent. The merchant keeps the last word: auto-approval is a switch they flip once they trust the model.",
    fr: "J'ai construit l'ensemble du produit : le back-office marchand, le portail client de réclamation, le site public et sa documentation, l'API REST que les boutiques branchent sur leur tunnel de commande, et le pipeline de machine learning derrière chaque décision. Un modèle LightGBM entraîné sur un dataset de 50 000 retours (nettoyage, feature engineering, rééquilibrage SMOTE, réglage par GridSearchCV, puis exposé via un endpoint FastAPI) prédit la résolution, tandis qu'un score de risque calculé à l'échelle de tout le réseau de boutiques signale les demandes suspectes. Le marchand garde le dernier mot : l'approbation automatique est un interrupteur qu'il active quand il fait confiance au modèle.",
  },
  highlights: {
    en: [
      "Automatic resolution recommendation — exchange, refund, repair or refusal — with a confidence score on every claim",
      "Cross-store fraud score: a customer refused by one shop protects all the others on the network",
      "Return policy configurable per product, per reason and per delay, applied automatically",
      "A single REST endpoint to connect an existing store, with merchant and developer documentation",
      "White-label claim portal running under the merchant's own brand",
      "Timestamped decision history and email notifications on every outcome",
    ],
    fr: [
      "Recommandation automatique de résolution — échange, remboursement, réparation ou refus — avec un score de confiance sur chaque réclamation",
      "Score de fraude inter-boutiques : un client refusé chez un marchand protège tous les autres du réseau",
      "Politique de retour configurable par produit, par motif et par délai, appliquée automatiquement",
      "Un seul endpoint REST pour connecter une boutique existante, avec documentation marchand et développeur",
      "Portail de réclamation en marque blanche, aux couleurs du marchand",
      "Historique horodaté des décisions et notifications e-mail à chaque issue",
    ],
  },
  stack: [
    "LightGBM",
    "scikit-learn",
    "SMOTE",
    "FastAPI",
    "REST API",
    "MLOps",
    "SaaS",
  ],
  gallery: [
    {
      title: { en: "Public site & documentation", fr: "Site public & documentation" },
      shots: [
        {
          src: img("public/home.png"),
          caption: {
            en: "Landing page: the claim-to-decision flow explained step by step",
            fr: "Page d'accueil : le parcours de la demande à la décision, expliqué étape par étape",
          },
        },
        {
          src: img("public/docs_marchand.png"),
          caption: {
            en: "Merchant documentation — onboarding and policy setup",
            fr: "Documentation marchand — mise en route et configuration de la politique",
          },
        },
        {
          src: img("public/doc_dev.png"),
          caption: {
            en: "Developer documentation for the integration API",
            fr: "Documentation développeur de l'API d'intégration",
          },
        },
        {
          src: img("public/doc_dev_extrait.png"),
          caption: {
            en: "Endpoint reference with request and response payloads",
            fr: "Référence d'endpoint avec les charges utiles de requête et de réponse",
          },
        },
      ],
    },
    {
      title: { en: "Merchant workspace", fr: "Espace marchand" },
      shots: [
        {
          src: img("vendeur/claims.png"),
          caption: {
            en: "Claims list: AI recommendation, risk level and status, with auto-approval toggle",
            fr: "Liste des réclamations : recommandation de l'IA, niveau de risque et statut, avec bascule d'auto-approbation",
          },
        },
        {
          src: img("vendeur/politique.png"),
          caption: {
            en: "Return policy editor — conditions per product, reason and delay",
            fr: "Éditeur de politique de retour — conditions par produit, motif et délai",
          },
        },
        {
          src: img("vendeur/api.png"),
          caption: {
            en: "API keys and integration settings for the merchant's store",
            fr: "Clés d'API et paramètres d'intégration de la boutique",
          },
        },
      ],
    },
    {
      title: { en: "Back-office & datasets", fr: "Back-office & datasets" },
      shots: [
        {
          src: img("admin/boutiques.png"),
          caption: {
            en: "Network overview: every store connected to the platform",
            fr: "Vue réseau : toutes les boutiques connectées à la plateforme",
          },
        },
        {
          src: img("admin/client_claim.png"),
          caption: {
            en: "Customer claim portal — the form the shopper fills in",
            fr: "Portail client de réclamation — le formulaire rempli par l'acheteur",
          },
        },
        {
          src: img("admin/client_claim_cabastore.png"),
          caption: {
            en: "The same portal rendered under another merchant's branding",
            fr: "Le même portail rendu aux couleurs d'un autre marchand",
          },
        },
        {
          src: img("admin/datasets.png"),
          caption: {
            en: "Dataset management feeding the model's retraining",
            fr: "Gestion des datasets alimentant le réentraînement du modèle",
          },
        },
      ],
    },
    {
      title: { en: "Architecture & ML pipeline", fr: "Architecture & pipeline ML" },
      shots: [
        {
          src: img("schemas/pipeline_ml.png"),
          caption: {
            en: "ML pipeline: cleaning, feature engineering, SMOTE, LightGBM, evaluation, FastAPI deployment",
            fr: "Pipeline ML : nettoyage, feature engineering, SMOTE, LightGBM, évaluation, déploiement FastAPI",
          },
        },
        {
          src: img("schemas/erd.png"),
          caption: {
            en: "Entity-relationship diagram of the database",
            fr: "Modèle entité-association de la base de données",
          },
        },
        {
          src: img("schemas/Parcours Réclamation Client.png"),
          caption: {
            en: "Customer claim journey, from submission to notification",
            fr: "Parcours de réclamation client, du dépôt à la notification",
          },
        },
        {
          src: img("schemas/Onboarding Vendeur Flowmerce.png"),
          caption: {
            en: "Merchant onboarding flow",
            fr: "Flux d'onboarding marchand",
          },
        },
      ],
    },
    {
      title: { en: "Mobile", fr: "Mobile" },
      shots: [
        {
          src: img("mobile/home.jpeg"),
          caption: { en: "Landing page on mobile", fr: "Page d'accueil sur mobile" },
        },
        {
          src: img("mobile/vendeur.jpeg"),
          caption: { en: "Merchant workspace on mobile", fr: "Espace marchand sur mobile" },
        },
        {
          src: img("mobile/pannel.jpeg"),
          caption: { en: "Claim handling on mobile", fr: "Traitement d'une réclamation sur mobile" },
        },
      ],
    },
  ],
};

export default flowmerce;
