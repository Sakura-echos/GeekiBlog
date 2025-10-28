import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/request";

/**
 * Next.js 中间件
 * 用于处理国际化路由
 */
export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 路径名模式
  localePrefix: "always",
});

export const config = {
  // 匹配所有路径，除了 API、静态文件等
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
