import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { seoRoutes } from "@/lib/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return seoRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.updatedAt ? { lastModified: route.updatedAt } : {}),
  }));
}
