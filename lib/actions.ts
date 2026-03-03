"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  read_time: number;
  published: boolean;
  category: string;
  cover_image: string | null;
}

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function createArticle(data: ArticleFormData) {
  const supabase = getAdminClient();
  const { error } = await supabase.from("article").insert({
    ...data,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAllPaths();
  redirect("/admin");
}

export async function updateArticle(id: string, data: ArticleFormData) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from("article")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAllPaths();
  redirect("/admin");
}

export async function deleteArticle(id: string) {
  const supabase = getAdminClient();
  const { error } = await supabase.from("article").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAllPaths();
}

function revalidateAllPaths() {
  revalidatePath("/zh/articles");
  revalidatePath("/en/articles");
  revalidatePath("/admin");
}
