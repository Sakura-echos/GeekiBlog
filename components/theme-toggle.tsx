"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * 主题切换按钮组件
 * 点击可在浅色/深色模式之间切换
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("theme");

  // 等待组件挂载后再渲染，避免服务端渲染不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
        aria-label={t("toggle")}
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
      aria-label={t("toggle")}
      title={theme === "dark" ? t("light") : t("dark")}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-text-primary" />
      )}
    </button>
  );
}
