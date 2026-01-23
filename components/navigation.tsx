"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * 导航栏组件
 * 包含页面链接、社交媒体图标、主题切换和语言切换按钮
 */
export function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  // 导航链接配置
  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/trip`, label: t("trip") },
    { href: `/${locale}/projects`, label: t("projects") },
  ];

  // 社交媒体链接配置
  const socialLinks = [
    {
      href: "https://github.com/Sakura-echos",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/zijie-huang-218811297/",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-text-primary hover:opacity-80 transition-opacity"
          >
            Geeki
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-1">
            {/* 页面链接 */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-background-secondary text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* 分隔符 */}
            <div className="w-px h-6 bg-border mx-2" />

            {/* 社交媒体图标 */}
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
                aria-label={link.label}
                title={link.label}
              >
                <link.icon className="w-5 h-5 text-text-primary" />
              </a>
            ))}

            {/* 主题切换 */}
            <ThemeToggle />

            {/* 语言切换 */}
            <LanguageToggle />
          </div>

          {/* 移动端导航 */}
          <div className="flex md:hidden items-center space-x-1">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-text-primary" />
              </a>
            ))}
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* 移动端页面链接 */}
        <div className="flex md:hidden pb-3 space-x-1 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                pathname === link.href
                  ? "bg-background-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
