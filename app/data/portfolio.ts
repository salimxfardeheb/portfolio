import { portfolio } from "./portfolio.config";

/** Projects with a page at /realisations/<slug>, in config order. */
export const portfolioProjects = portfolio
  .filter((entry) => entry.visible)
  .map((entry) => entry.project);

/** Projects shown in the homepage section — they must also be visible. */
export const homeProjects = portfolio
  .filter((entry) => entry.visible && entry.home)
  .map((entry) => entry.project);

export const getProject = (slug: string) => portfolioProjects.find((project) => project.slug === slug);
