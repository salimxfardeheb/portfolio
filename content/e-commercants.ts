import type { AccentTitle, Benefit, ContactContent, Plan, Service } from "./types";
import { projects } from "./site";

export const hero: { title: AccentTitle; lead: string } = {
  title: { before: "Votre ", accent: "boutique en ligne", after: ", conçue pour vendre et livrer" },
  lead: "Développement sur mesure : boutique, livraison, administration et tracking publicitaire réunis au même endroit, au design de votre marque.",
};

export const plans: Plan[] = [
  {
    name: "Starter",
    badge: "Pour démarrer",
    summary: "L’essentiel pour vendre en ligne et expédier vos commandes.",
    features: [
      "Livraison : transporteurs, frais et envoi des commandes",
      "Boutique essentielle : catalogue, commande directe, témoignages",
      "Administration : commandes, produits, stocks, promotions",
      "Pixel Facebook et TikTok",
    ],
  },
  {
    name: "Plus",
    badge: "Le plus demandé",
    summary: "Une boutique complète pour vendre plus et suivre vos clients.",
    featured: true,
    features: [
      "Livraison complète avec suivi des colis",
      "Boutique complète, bilingue français / arabe, avec packs",
      "Administration complète, sans tableau de bord des ventes",
      "Pixel et API de conversion",
    ],
  },
  {
    name: "Premium",
    badge: "Le plus complet",
    summary: "Tout inclus, avec le tableau de bord des ventes et un tracking complet.",
    features: [
      "Livraison complète avec suivi des colis",
      "Boutique complète, bilingue français / arabe, avec packs",
      "Administration complète avec tableau de bord des ventes",
      "Tracking complet : achat compté après confirmation",
    ],
  },
];

export const plansNote =
  "Développement sur mesure, prix sur devis. Paiement unique pour la réalisation (40 % à la signature, 60 % à la validation). Hébergement et nom de domaine non inclus, à la charge du client.";

export const benefits: Benefit[] = [
  {
    title: "Vos publicités apprennent des vraies commandes",
    text: "L’achat n’est envoyé à Facebook et TikTok qu’après confirmation de la commande. Les fausses commandes ne faussent plus le ciblage de vos pubs.",
  },
  {
    title: "Vos colis partent sans ressaisie",
    text: "Les commandes confirmées sont transmises directement à votre société de livraison, et vous suivez chaque colis.",
  },
  {
    title: "Vos commandes aussi dans Google Sheets",
    text: "Toutes vos commandes se synchronisent avec Google Sheets, pour votre équipe de confirmation ou votre comptabilité.",
  },
];

export const care = {
  title: "Nous veillons sur votre boutique après la mise en ligne",
  text: "Votre site reste disponible, rapide et protégé. Nous surveillons son fonctionnement, appliquons les mises à jour de sécurité et intervenons rapidement en cas de problème, pour que vos ventes ne s'arrêtent jamais.",
};

export const services: Service[] = [
  {
    title: "Intégration des services de livraison",
    text: "Configuration de vos transporteurs, calcul des frais, transmission des commandes et suivi des colis.",
  },
  {
    title: "Boutique publique",
    text: "Catalogue, commande directe depuis la page produit, packs et témoignages, en français et en arabe.",
  },
  {
    title: "Administration",
    text: "Commandes, produits, stocks, clients et promotions, avec export Google Sheets et tableau de bord des ventes.",
  },
  {
    title: "Marketing et tracking publicitaire",
    text: "Pixel Facebook et TikTok, API de conversion côté serveur, achat comptabilisé seulement après confirmation.",
  },
];

export const similarProjects = [projects.iaStore, projects.flowmerce];

export const contact: ContactContent = {
  title: { before: "Prêt à lancer votre ", accent: "boutique", after: " ?" },
  lead: "Décrivez votre activité, nous revenons vers vous avec un devis.",
  selectLabel: "Offre souhaitée",
  options: ["Starter", "Plus", "Premium", "Je ne sais pas encore"],
  messagePlaceholder: "Parlez-nous de votre boutique",
};
