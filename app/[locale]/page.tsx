import type { Metadata } from "next";
import HomeContent from "@/components/home/home-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isZh = locale === "zh";
  return {
    title: isZh ? "首页" : "Home",
    description: isZh
      ? "你好，我是 Geeki，热爱技术、旅游与生活的前端开发工程师"
      : "Hi, I'm Geeki — a frontend developer passionate about tech, travel & life",
    alternates: {
      canonical: `${siteUrl}/${locale}`,
    },
    openGraph: {
      title: isZh ? "Geeki 的博客" : "Geeki's Blog",
      description: isZh
        ? "你好，我是 Geeki，热爱技术、旅游与生活的前端开发工程师"
        : "Hi, I'm Geeki — a frontend developer passionate about tech, travel & life",
      url: `${siteUrl}/${locale}`,
    },
  };
}

export default function HomePage() {
  return <HomeContent />;
}
