/** Titre avec un passage mis en couleur d'accent : `before` + `accent` + `after`. */
export type AccentTitle = {
  before?: string;
  accent: string;
  after?: string;
};

export type Service = { title: string; text: string };

export type Plan = {
  name: string;
  badge: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export type Benefit = { title: string; text: string };

export type ContactContent = {
  title: AccentTitle;
  lead: string;
  selectLabel: string;
  options: string[];
  messagePlaceholder: string;
};
