import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

const locales = ["zh", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with priority / changeFrequency
  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/articles", priority: 0.9, changeFrequency: "daily" },
    { path: "/projects", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resume", priority: 0.6, changeFrequency: "monthly" },
  ];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );

  // Dynamic article pages (skip when Supabase env is missing, e.g. CI build)
  const articles = supabase
    ? (
        await supabase
          .from("article")
          .select("slug, updated_at")
          .eq("published", true)
      ).data
    : null;

  const articleRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    (articles ?? []).map((article) => ({
      url: `${siteUrl}/${locale}/articles/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...articleRoutes];
}
