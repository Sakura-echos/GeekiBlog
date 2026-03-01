import { ArticleEditor } from "@/components/admin/article-editor";
import { createArticle } from "@/lib/actions";

export default function NewArticlePage() {
  return <ArticleEditor onSave={createArticle} />;
}
