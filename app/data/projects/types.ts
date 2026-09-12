export type Localized = { en: string; fr: string };
export type LocalizedList = { en: string[]; fr: string[] };

export interface Shot {
  src: string;
  caption: Localized;
}

export interface ShotGroup {
  title: Localized;
  shots: Shot[];
}

export interface Project {
  /** Must match the folder name in public/projects/ — also the #anchor on /portfolio. */
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
  summary: Localized;
  challenge: Localized;
  solution: Localized;
  /** The first three also appear on the homepage. */
  highlights: LocalizedList;
  stack: string[];
  link?: string;
  gallery: ShotGroup[];
}

/** Public URL of a screenshot in public/projects/<slug>/images/, safe for spaces and accents. */
export const projectImage = (slug: string, file: string) =>
  encodeURI(`/projects/${slug}/images/${file}`);
