import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { MasonryGrid } from "@/components/masonry-grid";
import { BlogCard } from "@/components/blog-card";
import { supabase, ARTICLE_CATEGORIES, getCategoryLabel } from "@/lib/supabase";
import type { Article } from "@/lib/supabase";

// Revalidate every 60 seconds (ISR) instead of force-dynamic
export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === "zh";
  return {
    title: isZh ? "文章" : "Articles",
    description: isZh
      ? "博客、旅游、摄影，记录生活的每一面"
      : "Blog, travel, photography — capturing every side of life",
    alternates: {
      canonical: `${siteUrl}/${locale}/articles`,
    },
    openGraph: {
      title: isZh ? "文章 | Geeki's Blog" : "Articles | Geeki's Blog",
      description: isZh
        ? "博客、旅游、摄影，记录生活的每一面"
        : "Blog, travel, photography — capturing every side of life",
      url: `${siteUrl}/${locale}/articles`,
    },
  };
}

async function getArticles(category: string | null): Promise<Article[]> {
  if (!supabase) return [];
  let query = supabase
    .from("article")
    .select("id, slug, title, excerpt, tags, read_time, created_at, category")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }
  return (data ?? []) as Article[];
}

export default async function ArticlesPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const t = await getTranslations("articles");

  const validValues = ARTICLE_CATEGORIES.map((c) => c.value) as string[];
  const activeCategory =
    searchParams.category && validValues.includes(searchParams.category)
      ? searchParams.category
      : null;

  const articles = await getArticles(activeCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-base md:text-lg text-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-background-secondary border border-border">
          {/* "All" tab */}
          <Link
            href={`/${locale}/articles`}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-background text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {t("all")}
          </Link>

          {/* Category tabs - driven by ARTICLE_CATEGORIES */}
          {ARTICLE_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/${locale}/articles?category=${cat.value}`}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "bg-background text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {getCategoryLabel(cat.value, locale)}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      {articles.length > 0 ? (
        <MasonryGrid className="max-w-7xl mx-auto">
          {articles.map((article) => (
            <BlogCard
              nav="articles"
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              date={new Date(article.created_at).toLocaleDateString(
                locale === "zh" ? "zh-CN" : "en-US"
              )}
              readTime={article.read_time}
              tags={article.tags ?? []}
              slug={article.slug}
              locale={locale}
            />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary">{t("noArticles")}</p>
        </div>
      )}
    </div>
  );
}
