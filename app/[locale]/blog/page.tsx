import { useTranslations } from "next-intl";
import { MasonryGrid } from "@/components/masonry-grid";
import { BlogCard } from "@/components/blog-card";
import { supabase } from "@/lib/supabase";
import type { Article } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("article")
    .select("id, slug, title, excerpt, tags, read_time, created_at, published")
    .eq("published", true)
    .eq("category", "blog")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }
  return (data ?? []) as Article[];
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const articles = await getPublishedArticles();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Blog
        </h1>
        <p className="text-base md:text-lg text-text-secondary">
          Thoughts, stories and ideas.
        </p>
      </div>

      {articles.length > 0 ? (
        <MasonryGrid className="max-w-7xl mx-auto">
          {articles.map((article) => (
            <BlogCard
              nav="blog"
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              date={new Date(article.created_at).toLocaleDateString("zh-CN")}
              readTime={article.read_time}
              tags={article.tags ?? []}
              slug={article.slug}
              locale={locale}
            />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary">No articles published yet.</p>
        </div>
      )}
    </div>
  );
}
