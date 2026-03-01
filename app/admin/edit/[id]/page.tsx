import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/article-editor";
import { updateArticle } from "@/lib/actions";
import type { Article } from "@/lib/supabase";

async function getArticle(id: string): Promise<Article | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from("article")
    .select("*")
    .eq("id", id)
    .single();
  return data as Article | null;
}

export default async function EditArticlePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const article = await getArticle(id);
  if (!article) notFound();

  const onSave = updateArticle.bind(null, id);

  return <ArticleEditor article={article} onSave={onSave} />;
}
