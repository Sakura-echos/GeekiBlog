import type { Metadata } from "next";
import "./globals.css";

/**
 * 根布局组件
 * 应用于所有页面的最外层布局
 */
export const metadata: Metadata = {
  title: "Geeki's Blog",
  description: "A minimalist personal blog built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
