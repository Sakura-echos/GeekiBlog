const SORT_OPTIONS = ["latest", "views"] as const;
export type ArticleSort = (typeof SORT_OPTIONS)[number];

export function buildArticlesQueryString(params: {
  category?: string | null;
  q?: string;
  sort?: ArticleSort;
}): string {
  const sp = new URLSearchParams();
  if (params.category) sp.set("category", params.category);
  if (params.q) sp.set("q", params.q);
  if (params.sort && params.sort !== "latest") sp.set("sort", params.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}
