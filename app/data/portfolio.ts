import { portfolio } from "./portfolio.config";

/** Projects shown on /portfolio, in config order. */
export const portfolioProjects = portfolio
  .filter((entry) => entry.visible)
  .map((entry) => entry.project);

/** Projects shown in the homepage section — they must also be visible. */
export const homeProjects = portfolio
  .filter((entry) => entry.visible && entry.home)
  .map((entry) => entry.project);
