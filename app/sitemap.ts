import type { MetadataRoute } from "next";
import { pages, SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${SITE_URL}${page.href === "/" ? "" : page.href}`,
    changeFrequency: "monthly",
    priority: page.href === "/" ? 1 : 0.8,
  }));
}
