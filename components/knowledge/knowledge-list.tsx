"use client";

import { useState } from "react";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge-data";
import { KnowledgeSidebar } from "./knowledge-sidebar";
import { KnowledgeCard } from "./knowledge-card";
import { useTranslations } from "next-intl";

interface KnowledgeListProps {
  locale: string;
  initialCategoryId?: string;
}

export function KnowledgeList({
  locale,
  initialCategoryId = "react",
}: KnowledgeListProps) {
  const t = useTranslations("knowledge");
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId);

  const activeCategory = KNOWLEDGE_CATEGORIES.find(
    (c) => c.id === activeCategoryId
  )!;

  return (
    <div className="flex flex-1 overflow-hidden">
      <KnowledgeSidebar
        categories={KNOWLEDGE_CATEGORIES}
        activeId={activeCategoryId}
        onSelect={setActiveCategoryId}
        labelText={locale === "zh" ? "分类" : "Category"}
        locale={locale}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-9">
          <h1 className="mb-1.5 text-xl font-bold text-text-primary">
            {locale === "zh" ? activeCategory.nameZh : activeCategory.nameEn}
          </h1>
          <p className="mb-7 text-sm text-text-secondary">{t("subtitle")}</p>

          {activeCategory.items.length === 0 ? (
            <p className="text-sm text-text-secondary">{t("comingSoon")}</p>
          ) : (
            <div className="space-y-3">
              {activeCategory.items.map((item) => (
                <KnowledgeCard
                  key={item.slug}
                  item={item}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
