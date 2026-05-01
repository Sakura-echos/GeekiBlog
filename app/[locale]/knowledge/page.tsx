import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { KnowledgeList } from "@/components/knowledge/knowledge-list";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "knowledge" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function KnowledgePage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <KnowledgeList locale={params.locale} />
    </div>
  );
}
