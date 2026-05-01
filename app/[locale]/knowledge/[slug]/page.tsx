import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findKnowledgeItem, getAllSlugs } from "@/lib/knowledge-data";
import { DEMO_REGISTRY } from "@/components/knowledge/demos/_registry";

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = findKnowledgeItem(params.slug);
  if (!found) return {};
  const { item } = found;
  return {
    title: params.locale === "zh" ? item.titleZh : item.titleEn,
    description: params.locale === "zh" ? item.descZh : item.descEn,
  };
}

export default async function KnowledgeDemoPage({ params }: PageProps) {
  const found = findKnowledgeItem(params.slug);
  if (!found) notFound();

  const demoLoader = DEMO_REGISTRY[params.slug];
  if (!demoLoader) notFound();

  const { default: DemoComponent } = await demoLoader();

  return (
    <DemoComponent
      locale={params.locale}
      backHref={`/${params.locale}/knowledge`}
    />
  );
}
