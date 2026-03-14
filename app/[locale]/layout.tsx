import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NavigationProgress } from "@/components/providers/navigation-progress";
import { Navigation } from "@/components/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://geekiblog.com";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    alternates: {
      languages: {
        zh: `${siteUrl}/zh`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/zh`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 获取当前语言的翻译消息
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Geeki's Blog",
        description:
          "Geeki 的博客 — 前端开发、旅游与生活 | Geeki's Blog: tech, travel & life",
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: ["zh", "en"],
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Geeki",
        url: siteUrl,
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* 简单的 SVG favicon，避免 404 错误 */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>"
        />
        {/* 结构化数据：便于搜索引擎识别站点与 Geeki 品牌 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* 主题提供者 - 启用深色模式支持 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* 国际化提供者 - 提供翻译功能 */}
          <NextIntlClientProvider messages={messages}>
            {/* 页面切换进度条 */}
            <NavigationProgress />
            {/* 导航栏 */}
            <Navigation locale={locale} />

            {/* 主要内容区域 */}
            <main className="min-h-screen">{children}</main>

            {/* 页脚 */}
            <footer className="border-t border-border bg-background">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p className="text-center text-sm text-text-secondary">
                  © {new Date().getFullYear()} Geeki Blog. All rights reserved.
                </p>
              </div>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
