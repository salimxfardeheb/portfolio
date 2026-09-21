/**
 * ═══════════════════════════════════════════════════════════════════
 *  PORTFOLIO — le seul fichier à modifier pour afficher ou masquer
 * ═══════════════════════════════════════════════════════════════════
 *
 *  visible: true   → le projet apparaît sur la page /portfolio
 *  visible: false  → le projet est masqué partout
 *
 *  home: true      → le projet apparaît AUSSI sur la page d'accueil
 *                    (sans effet si visible est false)
 *
 *  L'ordre des lignes = l'ordre d'affichage sur le site.
 *
 * ───────────────────────────────────────────────────────────────────
 *  Ajouter un projet
 * ───────────────────────────────────────────────────────────────────
 *  1. Mets tes captures dans   public/projects/<nom>/images/
 *  2. Copie                    app/data/projects/_template.ts
 *     vers                     app/data/projects/<nom>.ts   et remplis-le
 *  3. Importe-le ci-dessous et ajoute une ligne dans la liste
 */
import type { Project } from "./projects/types";
import flowmerce from "./projects/flowmerce";
import locationCostume from "./projects/location-costume";
import iaStore from "./projects/ia-store";
import almasseBeauty from "./projects/almasse-beauty";
import liudor from "./projects/liudor";

export interface PortfolioEntry {
  project: Project;
  visible: boolean;
  home: boolean;
}

export const portfolio: PortfolioEntry[] = [
  { project: flowmerce,       visible: true,  home: true },
  { project: locationCostume, visible: true,  home: true },
  { project: iaStore,         visible: true,  home: true },
  { project: almasseBeauty,   visible: true,  home: false },
  { project: liudor,          visible: true, home: false },
];
