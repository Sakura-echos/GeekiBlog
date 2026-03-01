import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Calendar, Clock, PenLine, Plus } from "lucide-react";
import { ARTICLE_CATEGORIES } from "@/lib/supabase";
import type { Article } from "@/lib/supabase";
import { DeleteArticleButton } from "@/components/admin/delete-button";

async function getArticles(): Promise<Article[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase
    .from("article")
    .select("id, title, slug, published, created_at, read_time, excerpt, category")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Article[];
}

export default async function AdminPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#eee] shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#333]">Geeki Admin</h1>
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#333] text-white text-sm font-medium hover:bg-[#555] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Article
          </Link>
        </div>
      </header>

      {/* Article list */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#999] mb-4">No articles yet.</p>
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#333] text-white text-sm hover:bg-[#555] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Write your first article
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl border border-[#eee] p-5 flex items-start gap-4 hover:shadow-sm transition-shadow"
              >
                {/* Status dot */}
                <div className="mt-1 shrink-0">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      article.published ? "bg-green-500" : "bg-yellow-400"
                    }`}
                    title={article.published ? "Published" : "Draft"}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-[#333] truncate">
                        {article.title}
                      </h2>
                      <p className="text-sm text-[#999] mt-0.5 truncate flex items-center gap-2">
                        <span>/{article.slug}</span>
                        <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-[#f0f0f0] text-[#666]">
                          {ARTICLE_CATEGORIES.find((c) => c.value === article.category)?.label ?? article.category}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${
                        article.published
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-yellow-700 bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-[#aaa]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.created_at).toLocaleDateString("zh-CN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time} min
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/edit/${article.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-[#eee] text-[#666] hover:bg-[#f8f8f8] hover:text-[#333] transition-colors"
                  >
                    <PenLine className="w-3 h-3" />
                    Edit
                  </Link>
                  <DeleteArticleButton id={article.id} title={article.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
