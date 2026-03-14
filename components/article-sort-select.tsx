"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  buildArticlesQueryString,
  type ArticleSort,
} from "@/lib/articles-utils";

type ArticleSortSelectProps = {
  activeSort: ArticleSort;
  activeCategory: string | null;
  searchQ: string | undefined;
  sortLatestLabel: string;
  sortViewsLabel: string;
  sortByLabel: string;
};

export function ArticleSortSelect({
  activeSort,
  activeCategory,
  searchQ,
  sortLatestLabel,
  sortViewsLabel,
  sortByLabel,
}: ArticleSortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const baseUrl = pathname?.replace(/\?.*$/, "") ?? "";

  function handleChange(value: string) {
    const sort = value === "views" ? "views" : "latest";
    const qs = buildArticlesQueryString({
      category: activeCategory,
      q: searchQ,
      sort,
    });
    router.push(`${baseUrl}${qs}`);
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* <span className="text-sm text-text-secondary whitespace-nowrap">
        {sortByLabel}
      </span> */}
      <select
        value={activeSort}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={sortByLabel}
        className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-border focus:border-transparent cursor-pointer appearance-none bg-no-repeat bg-[length:0.75rem] bg-[right_0.35rem_center] pr-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        }}
      >
        <option value="latest">{sortLatestLabel}</option>
        <option value="views">{sortViewsLabel}</option>
      </select>
    </div>
  );
}
