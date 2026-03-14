import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Geeki's Blog",
    template: "%s | Geeki's Blog",
  },
  description:
    "Geeki 的博客 — 前端开发工程师，记录技术、旅游与生活 | Geeki's Blog: frontend developer sharing tech, travel & life",
  keywords: [
    "geeki",
    "Geeki",
    "Geeki's Blog",
    "geeki blog",
    "黄子杰",
    "前端博客",
    "frontend blog",
  ],
  authors: [{ name: "Geeki" }],
  creator: "Geeki",
  openGraph: {
    type: "website",
    siteName: "Geeki's Blog",
    title: "Geeki's Blog",
    description:
      "Geeki 的博客 — 前端开发、旅游与生活 | Geeki's Blog: tech, travel & life",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geeki's Blog",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
