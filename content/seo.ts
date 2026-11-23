import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

/**
 * Métadonnées complètes d'une page : title, description, URL canonique et Open Graph.
 * (Next.js remplace l'objet `openGraph` du layout au lieu de le fusionner : on le recrée
 * donc entièrement pour chaque page.)
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Titre court ; le layout ajoute « — Info Expertise ». `null` pour l'accueil (titre par défaut). */
  title: string | null;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_DZ",
      siteName: SITE_NAME,
      url: `${SITE_URL}${path}`,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

export const DEFAULT_TITLE = `${SITE_NAME} — Sites et logiciels sur mesure à Oran`;
