import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navigation } from "@/components/navigation";

/**
 * 语言特定的布局组件
 * 为每个语言提供独立的布局和翻译上下文
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 获取当前语言的翻译消息
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* 简单的 SVG favicon，避免 404 错误 */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>"
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
