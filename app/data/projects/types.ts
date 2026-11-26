export type Localized = { en: string; fr: string };
export type LocalizedList = { en: string[]; fr: string[] };

export interface Shot {
  src: string;
  caption: Localized;
}

export interface ShotGroup {
  title: Localized;
  /** "mobile" : captures de téléphone, affichées en portrait. */
  device?: "mobile";
  shots: Shot[];
}

export interface Project {
  /** Must match the folder name in public/projects/ — also the URL: /realisations/<slug>. */
  slug: string;
  name: string;
  /** Brand colour of the project — decorative accents only (dot, frame edge). */
  accent: string;
  category: Localized;
  tagline: Localized;
  duration: Localized;
  role: Localized;
  /** Text in the mock browser bar; falls back to the project name. */
  host?: string;
  cover: string;
  /** One short sentence for project lists (homepage, sector pages). */
  excerpt: Localized;
  /** Shown on the project page: one or two short sentences each, in French, no jargon. */
  brief: { need: string; solution: string };
  /** Long texts below: kept for reference, not shown on the site. */
  summary: Localized;
  challenge: Localized;
  solution: Localized;
  /** The first four are shown on the project page, under « Points forts ». */
  highlights: LocalizedList;
  stack: string[];
  link?: string;
  gallery: ShotGroup[];
}

/** Public URL of a screenshot in public/projects/<slug>/images/, safe for spaces and accents. */
export const projectImage = (slug: string, file: string) =>
  encodeURI(`/projects/${slug}/images/${file}`);

export type ImageVariant = "sm" | "md" | "full";

/**
 * Version légère d'une capture, générée par `npm run images` (scripts/optimize-images.mjs) :
 * sm / md = haut de la page recadré en 16:10 (640 / 1280 px), full = page entière (1600 px max).
 */
export const optimizedImage = (src: string, variant: ImageVariant) =>
  src.replace(/\/images\//, "/optimized/").replace(/\.(png|jpe?g|webp)$/i, `.${variant}.webp`);
