import { useTranslations } from "next-intl";
import { Code, Sparkles, Mail } from "lucide-react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { CoolMode } from "@/components/magicui/cool-mode";

/**
 * 首页组件
 * 展示个人介绍和技能信息
 */
export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* 主标题区域 */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        {/* 问候语 */}
        <div className="mb-6 animate-fade-in">
          <p className="text-lg md:text-xl text-text-secondary mb-2">
            {t("greeting")}
          </p>
          <TypingAnimation
            duration={200}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-4"
          >
            {t("name")}
          </TypingAnimation>
          <TypingAnimation
            delay={1500}
            duration={200}
            className="text-xl md:text-2xl text-text-secondary font-medium"
          >
            {t("title")}
          </TypingAnimation>
        </div>

        {/* 简介 */}
        <p className="text-lg text-left text-text-secondary leading-loose max-w-2xl mx-auto whitespace-pre-line">
          {t("description")}
        </p>
      </section>

      {/* 特色卡片区域 */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {/* 技能卡片 */}
        <div className="group p-6 rounded-2xl border border-border bg-background-secondary hover:shadow-hover transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-background group-hover:scale-110 transition-transform">
            <Code className="w-6 h-6 text-text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {t("skills")}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            React, React Native(Android, IOS), Next.js, TypeScript, Tailwind
            CSS, Charles, Git
          </p>
        </div>

        {/* 经验卡片 */}
        <div className="group p-6 rounded-2xl border border-border bg-background-secondary hover:shadow-hover transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-background group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {t("experience")}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t("experienceDes")}
          </p>
        </div>

        {/* 联系方式卡片 */}
        <div className="group p-6 rounded-2xl border border-border bg-background-secondary hover:shadow-hover transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-background group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6 text-text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {t("contact")}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            447061043@qq.com
          </p>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="p-8 md:p-12 rounded-3xl border border-border bg-background-secondary">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            {t("cta")}
          </h2>
          <p className="text-text-secondary mb-6">{t("ctaDes")}</p>
          <CoolMode>
            <a
              href="mailto:447061043@qq.com"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-text-primary text-background font-medium hover:opacity-90 transition-opacity"
            >
              {t("getInTouch")}
            </a>
          </CoolMode>
        </div>
      </section>
    </div>
  );
}
