import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Geeki's Blog",
    template: "%s | Geeki's Blog",
  },
  description:
    "前端开发工程师，记录技术、旅游与生活 | Frontend Developer sharing tech, travel & life",
  authors: [{ name: "Geeki" }],
  creator: "Geeki",
  openGraph: {
    type: "website",
    siteName: "Geeki's Blog",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
