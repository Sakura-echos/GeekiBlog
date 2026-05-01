import Link from "next/link";
import { cn } from "@/lib/utils";
import type { KnowledgeItem, KnowledgeCategory } from "@/lib/knowledge-data";

interface KnowledgeCardProps {
  item: KnowledgeItem;
  category: KnowledgeCategory;
  locale: string;
}

export function KnowledgeCard({ item, category, locale }: KnowledgeCardProps) {
  return (
    <Link
      href={`/${locale}/knowledge/${item.slug}`}
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-border",
        "bg-background p-5 transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-hover hover:border-muted-foreground/30"
      )}
    >
      {/* 图标 */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background-secondary text-xl">
        {item.icon}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary mb-1">
          {locale === "zh" ? item.titleZh : item.titleEn}
        </p>
        <p className="text-xs text-text-secondary leading-relaxed mb-2 line-clamp-2">
          {locale === "zh" ? item.descZh : item.descEn}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(locale === "zh" ? item.tagsZh : item.tagsEn).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded border border-border bg-background-secondary text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 箭头 */}
      <span className="text-border text-lg transition-colors group-hover:text-muted-foreground shrink-0">
        ›
      </span>
    </Link>
  );
}
