import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase, getCategoryLabel } from "@/lib/supabase";
import type { Article, ArticleWithComments } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { Components } from "react-markdown";
import TableOfContents from "@/components/table-of-contents";
import { CommentSection } from "@/components/comment-section";

export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.vercel.app";

async function getArticleMeta(slug: string): Promise<Article | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("article")
    .select(
      "id, slug, title, excerpt, tags, cover_image, created_at, updated_at, category"
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data as Article | null;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const article = await getArticleMeta(slug);
  if (!article) return { title: "Not Found" };

  const canonicalUrl = `${siteUrl}/${locale}/articles/${slug}`;
  const images = article.cover_image
    ? [{ url: article.cover_image, alt: article.title }]
    : [];

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      tags: article.tags ?? [],
      images,
    },
    twitter: {
      card: images.length > 0 ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt,
      images: images.map((i) => i.url),
    },
  };
}

/**
 * ORM + 连表查询：一次请求同时取出文章及其所有评论。
 * Supabase 通过外键关系自动推断嵌套 select 语法。
 */
async function getArticleWithComments(
  slug: string
): Promise<ArticleWithComments | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("article")
    .select(
      `
      *,
      comment (
        id,
        article_id,
        user_name,
        content,
        created_at
      )
    `
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;

  // 评论按发布时间倒序排列（最新在前）
  const result = data as ArticleWithComments;
  result.comment = (result.comment ?? []).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return result;
}

export default async function ArticlePostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const article = await getArticleWithComments(slug);
  if (!article) notFound();

  const backHref = `/${locale}/articles?category=${article.category}`;
  const backLabel =
    locale === "zh"
      ? `返回${getCategoryLabel(article.category, "zh")}`
      : `Back to ${getCategoryLabel(article.category, "en")}`;

  let headingIndex = 0;
  const generateHeadingId = (text: string, index: number) =>
    `heading-${index}-${text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")}`;

  const components: Components = {
    img: ({ src, alt, ...props }) => {
      if (!src) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className="rounded-lg shadow-md max-w-full"
          {...props}
        />
      );
    },
    h1: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return (
        <h1 id={id} {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return (
        <h4 id={id} {...props}>
          {children}
        </h4>
      );
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: "Geeki" },
    ...(article.cover_image && { image: article.cover_image }),
    url: `${siteUrl}/${locale}/articles/${article.slug}`,
    keywords: article.tags?.join(", "),
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TableOfContents content={article.content} />

      <article className="max-w-4xl mx-auto">
        {/* Back link - goes back to the article's category tab */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-text-secondary mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(article.created_at).toLocaleDateString(
                locale === "zh" ? "zh-CN" : "en-US"
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {article.read_time} {locale === "zh" ? "分钟阅读" : "min read"}
            </span>
          </div>
        </div>

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-background-secondary text-text-secondary border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-border mb-8" />

        <div className="prose dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={components}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* 评论区 —— 连表查询取得的初始评论直接注入 */}
        <CommentSection
          articleId={article.id}
          articleSlug={article.slug}
          initialComments={article.comment}
          locale={locale}
        />
      </article>
    </div>
  );
}
