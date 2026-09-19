import { portfolioProjects } from "@/app/data/portfolio";
import type { Project } from "@/app/data/projects/types";
import type { ProjectTag } from "@/app/types/chatbot";

/**
 * Which shelves each project belongs to, keyed by its slug in app/data/projects/.
 * A project missing from this map still shows up under "Tous les projets".
 */
const tagsBySlug: Record<string, ProjectTag[]> = {
  flowmerce: ["saas", "management"],
  "location-costume": ["saas", "management"],
  "ia-store": ["ecommerce"],
  "almasse-beauty": ["ecommerce"],
};

/**
 * Projects the assistant may present. Reads the same source as the /portfolio
 * page, so a project hidden in portfolio.config.ts never surfaces in the chat.
 */
export const chatProjects = (tag: ProjectTag): Project[] =>
  portfolioProjects.filter(
    (project) => tag === "all" || (tagsBySlug[project.slug] ?? []).includes(tag)
  );
