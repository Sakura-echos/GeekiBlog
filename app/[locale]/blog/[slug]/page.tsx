import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

/**
 * 博客文章详情页面
 * 显示单篇文章的完整内容
 */
export default function BlogPostPage({
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <article className="max-w-3xl mx-auto">
        {/* 返回按钮 */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
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
            <span>{post.readTime} min read</span>
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

        {/* 文章内容 */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* 这里是文章的主要内容 */}
          {/* 在实际项目中，你可以使用 MDX 或从 CMS 获取内容 */}
          <div className="space-y-4 text-text-secondary">
            <p>
              This is a sample blog post. In a real implementation, you would
              load the full content from a Markdown file, MDX, or a headless
              CMS.
            </p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">
              Section 1
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">
              Section 2
            </h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              Subsection 2.1
            </h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis.
            </p>

            <ul className="list-disc list-inside space-y-2 my-4">
              <li>First important point</li>
              <li>Second important point</li>
              <li>Third important point</li>
            </ul>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">
              Conclusion
            </h2>
            <p>
              Thank you for reading! Feel free to share your thoughts in the
              comments below or reach out on social media.
            </p>
          </div>
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
