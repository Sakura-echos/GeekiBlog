import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { MasonryGrid } from "@/components/masonry-grid";
import { BlogCard } from "@/components/blog-card";
import { supabase, ARTICLE_CATEGORIES, getCategoryLabel } from "@/lib/supabase";
import type { Article } from "@/lib/supabase";
import {
  buildArticlesQueryString,
  type ArticleSort,
} from "@/lib/articles-utils";
import { ArticleSortSelect } from "@/components/article-sort-select";

// Revalidate every 60 seconds (ISR) instead of force-dynamic
export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

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

/** Escape ILIKE special chars: % and _ (and \ for escape). */
function escapeIlike(q: string): string {
  return q
    .replace(/\\/g, "\\\\")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_")
    .trim();
}

async function getArticles(
  category: string | null,
  searchQuery: string | undefined,
  sort: ArticleSort
): Promise<Article[]> {
  if (!supabase) return [];
  let query = supabase
    .from("article")
    .select(
      "id, slug, title, excerpt, tags, read_time, created_at, category, view_count"
    )
    .eq("published", true);

  if (sort === "views") {
    query = query.order("view_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (searchQuery) {
    const term = escapeIlike(searchQuery);
    if (term) {
      const pattern = `%${term}%`;
      query = query.or(`title.ilike.${pattern},excerpt.ilike.${pattern}`);
    }
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
  searchParams: { category?: string; q?: string; sort?: string };
}) {
  const t = await getTranslations("articles");

  const validValues = ARTICLE_CATEGORIES.map((c) => c.value) as string[];
  const activeCategory =
    searchParams.category && validValues.includes(searchParams.category)
      ? searchParams.category
      : null;
  const searchQ =
    typeof searchParams.q === "string" ? searchParams.q : undefined;
  const activeSort: ArticleSort =
    searchParams.sort === "views" ? "views" : "latest";

  const articles = await getArticles(activeCategory, searchQ, activeSort);

  const searchBaseUrl = `/${locale}/articles`;

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

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <form
          method="get"
          action={searchBaseUrl}
          className="flex gap-2"
          role="search"
        >
          {activeCategory && (
            <input
              type="hidden"
              name="category"
              value={activeCategory}
              readOnly
              aria-hidden
            />
          )}
          {activeSort !== "latest" && (
            <input
              type="hidden"
              name="sort"
              value={activeSort}
              readOnly
              aria-hidden
            />
          )}
          <input
            type="search"
            name="q"
            defaultValue={searchQ ?? ""}
            placeholder={t("searchPlaceholder")}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-border focus:border-transparent"
            aria-label={t("searchPlaceholder")}
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-background-secondary border border-border text-text-primary font-medium hover:bg-background transition-colors"
          >
            {t("search")}
          </button>
        </form>
      </div>

      {/* Category tabs + Sort dropdown (one row: 分类 | Sort by) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-text-secondary shrink-0">
            {t("categoryLabel")}
          </span>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-background-secondary border border-border">
            <Link
              href={`${searchBaseUrl}${buildArticlesQueryString({
                category: null,
                q: searchQ,
                sort: activeSort,
              })}`}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-background text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t("all")}
            </Link>
            {ARTICLE_CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`${searchBaseUrl}${buildArticlesQueryString({
                  category: cat.value,
                  q: searchQ,
                  sort: activeSort,
                })}`}
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
        <ArticleSortSelect
          activeSort={activeSort}
          activeCategory={activeCategory}
          searchQ={searchQ}
          sortByLabel={t("sortBy")}
          sortLatestLabel={t("sortLatest")}
          sortViewsLabel={t("sortViews")}
        />
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
              viewCount={article.view_count ?? 0}
              tags={article.tags ?? []}
              slug={article.slug}
              locale={locale}
            />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary">
            {searchQ ? t("noSearchResults") : t("noArticles")}
          </p>
        </div>
      )}
    </div>
  );
}
