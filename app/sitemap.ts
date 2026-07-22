import type { MetadataRoute } from "next";
import { featuredCareers } from "@/lib/careers-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://careerverse.ai";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/careers`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/quiz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const careerRoutes: MetadataRoute.Sitemap = featuredCareers.map((c) => ({
    url: `${base}/careers/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...careerRoutes];
}
