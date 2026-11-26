import type { MetadataRoute } from "next";
import { pages, SITE_URL } from "@/content/site";
import { portfolioProjects } from "@/app/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((page) => ({
      url: `${SITE_URL}${page.href === "/" ? "" : page.href}`,
      changeFrequency: "monthly" as const,
      priority: page.href === "/" ? 1 : 0.8,
    })),
    ...portfolioProjects.map((project) => ({
      url: `${SITE_URL}/realisations/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
