"use client";

import { Languages } from "lucide-react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

/**
 * 语言切换按钮组件
 * 点击可在中文/英文之间切换
 */
export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("language");

  const currentLocale = params.locale as string;

  // 切换语言
  const toggleLanguage = () => {
    const newLocale = currentLocale === "zh" ? "en" : "zh";
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="p-2 rounded-lg hover:bg-background-secondary transition-colors disabled:opacity-50"
      aria-label={t("toggle")}
      title={currentLocale === "zh" ? t("en") : t("zh")}
    >
      <Languages className="w-5 h-5 text-text-primary" />
    </button>
  );
}
