import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import ReactMarkdown from "react-markdown";
import { promises as fs } from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Image from "next/image";
import type { Components } from "react-markdown";
import TableOfContents from "@/components/table-of-contents";
/**
 * 博客文章详情页面
 * 显示单篇文章的完整内容
 */
export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  // 查找对应的文章
  const post = blogPosts.find((p) => p.slug === slug);

  // 如果文章不存在，显示 404 页面
  if (!post) {
    notFound();
  }

  // 读取 markdown 文件内容
  let markdownContent = "";
  let imageBasePath = "";

  if (post.contentPath) {
    try {
      const filePath = path.join(process.cwd(), post.contentPath);
      markdownContent = await fs.readFile(filePath, "utf-8");

      // 获取图片的基础路径
      // 例如：lib/trip/泰国/泰国.md -> 泰国/
      const contentDir = path.dirname(post.contentPath);
      imageBasePath = contentDir.replace("lib/trip/", "");
    } catch (error) {
      console.error("Error reading markdown file:", error);
      markdownContent = post.excerpt;
    }
  } else {
    // 如果没有指定文件路径，使用默认内容
    markdownContent = `# ${post.title}\n\n${post.excerpt}\n\nThis is a sample blog post. In a real implementation, you would load the full content from a Markdown file, MDX, or a headless CMS.`;
  }

  // 生成标题 ID 的函数
  const generateHeadingId = (text: string, index: number) => {
    return `heading-${index}-${text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")}`;
  };

  // 用于追踪标题索引
  let headingIndex = 0;

  // 自定义 markdown 组件
  const components: Components = {
    // 图片组件
    img: ({ node, src, alt, ...props }) => {
      if (!src) return null;

      // 如果是相对路径，转换为 API 路径
      let imageSrc = src;
      if (!src.startsWith("http") && !src.startsWith("/")) {
        imageSrc = `/api/blog-images/${imageBasePath}/${src}`;
      }

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt || ""}
          className="rounded-lg shadow-md"
          {...props}
        />
      );
    },
    // H1 标题
    h1: ({ node, children, ...props }) => {
      const text = children?.toString() || "";
      const id = generateHeadingId(text, headingIndex++);
      return (
        <h1 id={id} {...props}>
          {children}
        </h1>
      );
    },
    // H2 标题
    h2: ({ node, children, ...props }) => {
      const text = children?.toString() || "";
      const id = generateHeadingId(text, headingIndex++);
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    // H3 标题
    h3: ({ node, children, ...props }) => {
      const text = children?.toString() || "";
      const id = generateHeadingId(text, headingIndex++);
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    // H4 标题
    h4: ({ node, children, ...props }) => {
      const text = children?.toString() || "";
      const id = generateHeadingId(text, headingIndex++);
      return (
        <h4 id={id} {...props}>
          {children}
        </h4>
      );
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
      {/* 文章目录 - 右侧悬浮 */}
      <TableOfContents content={markdownContent} />

      <article className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "zh" ? "返回博客" : "Back to Blog"}</span>
        </Link>

        {/* 文章标题 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
          {post.title}
        </h1>

        {/* 元信息 */}
        <div className="flex items-center gap-6 text-sm text-text-secondary mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {post.readTime} {locale === "zh" ? "分钟阅读" : "min read"}
            </span>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-background-secondary text-text-secondary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 分隔线 */}
        <hr className="border-border mb-8" />

        {/* Markdown 内容 */}
        <div className="prose dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={components}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

/**
 * 生成静态路径
 * 为所有博客文章生成静态页面
 */
export async function generateStaticParams() {
  const locales = ["zh", "en"];

  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}
