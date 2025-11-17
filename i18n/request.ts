import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

/**
 * 支持的语言列表
 */
export const locales = ["zh", "en"] as const;

/**
 * 默认语言
 */
export const defaultLocale = "zh";

/**
 * next-intl 配置
 * 根据请求的语言加载对应的翻译文件
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // 验证传入的 locale 参数是否有效
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
