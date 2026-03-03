import { createClient } from "@supabase/supabase-js";

export const ARTICLE_CATEGORIES = [
  { value: "blog", label: "博客", labelEn: "Blog" },
  { value: "trip", label: "旅游", labelEn: "Travel" },
  { value: "photography", label: "摄影", labelEn: "Photography" },
] as const;

export function getCategoryLabel(value: string, locale: string): string {
  const cat = ARTICLE_CATEGORIES.find((c) => c.value === value);
  if (!cat) return value;
  return locale === "zh" ? cat.label : cat.labelEn;
}

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]["value"];

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  read_time: number;
  published: boolean;
  category: ArticleCategory;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
