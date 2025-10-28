import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  slug: string;
  locale: string;
  className?: string;
}

/**
 * 博客卡片组件
 * 用于在瀑布流中展示文章预览
 */
export function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  tags,
  slug,
  locale,
  className,
}: BlogCardProps) {
  return (
    <Link href={`/${locale}/blog/${slug}`}>
      <article
        className={cn(
          "group p-6 rounded-2xl border border-border bg-background-secondary",
          "hover:shadow-hover transition-all duration-300 cursor-pointer",
          "hover:scale-[1.02]",
          className
        )}
      >
        {/* 标题 */}
        <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-text-secondary transition-colors">
          {title}
        </h3>

        {/* 摘要 */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* 标签 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-background text-text-secondary border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 元信息 */}
        <div className="flex items-center gap-4 text-xs text-text-light">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
