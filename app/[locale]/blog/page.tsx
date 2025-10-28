import { useTranslations } from "next-intl";
import { MasonryGrid } from "@/components/masonry-grid";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/blog-data";

/**
 * 博客列表页面
 * 使用瀑布流布局展示所有文章
 */
export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("blog");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* 页面标题 */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-base md:text-lg text-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      {/* 文章列表 - 瀑布流布局 */}
      {blogPosts.length > 0 ? (
        <MasonryGrid className="max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              tags={post.tags}
              slug={post.slug}
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
