import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Article } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { Components } from "react-markdown";
import TableOfContents from "@/components/table-of-contents";

export const dynamic = "force-dynamic";

async function getTripArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("slug", slug)
    .eq("category", "trip")
    .eq("published", true)
    .single();

  if (error) return null;
  return data as Article;
}

export default async function TripPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const article = await getTripArticle(slug);
  if (!article) notFound();

  let headingIndex = 0;
  const generateHeadingId = (text: string, index: number) =>
    `heading-${index}-${text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-")}`;

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
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return <h3 id={id} {...props}>{children}</h3>;
    },
    h4: ({ children, ...props }) => {
      const id = generateHeadingId(children?.toString() ?? "", headingIndex++);
      return <h4 id={id} {...props}>{children}</h4>;
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
      <TableOfContents content={article.content} />

      <article className="max-w-4xl mx-auto">
        <Link
          href={`/${locale}/trip`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "zh" ? "返回旅游" : "Back to Travel"}</span>
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
      </article>
    </div>
  );
}
