import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/work", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
