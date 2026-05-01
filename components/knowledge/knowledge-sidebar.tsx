"use client";

import { cn } from "@/lib/utils";
import type { KnowledgeCategory } from "@/lib/knowledge-data";

interface KnowledgeSidebarProps {
  categories: KnowledgeCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  labelText: string;
  locale: string;
}

export function KnowledgeSidebar({
  categories,
  activeId,
  onSelect,
  labelText,
  locale,
}: KnowledgeSidebarProps) {
  return (
    <aside className="w-[200px] shrink-0 border-r border-border flex flex-col py-6">
      <div className="px-3">
        <p className="mb-2 px-2 text-[10px] uppercase tracking-widest text-text-secondary">
          {labelText}
        </p>
        <nav className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2.5 py-2",
                "text-left transition-colors duration-150",
                activeId === cat.id
                  ? "bg-background-secondary"
                  : "hover:bg-background-secondary"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{cat.emoji}</span>
                <span
                  className={cn(
                    "text-xs",
                    activeId === cat.id
                      ? "font-medium text-text-primary"
                      : "text-text-secondary"
                  )}
                >
                  {locale === "zh" ? cat.nameZh : cat.nameEn}
                </span>
              </span>
              <span className="rounded-full border border-border bg-background-secondary px-1.5 py-0.5 text-[10px] text-text-secondary">
                {cat.items.length}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
