"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { WordRotate } from "@/components/magicui/word-rotate";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Marquee } from "@/components/magicui/marquee";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { CoolMode } from "@/components/magicui/cool-mode";
import HeroImage from "@/components/hero-image";
import {
  Code,
  BookOpen,
  Github,
  ExternalLink,
  MapPin,
  Sparkles,
  Plane,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Next.js", icon: "▲" },
  { name: "TailwindCSS", icon: "🎨" },
  { name: "MagicUI", icon: "✨" },
  { name: "Supabase", icon: "⚡" },
  { name: "Vercel", icon: "🚀" },
  { name: "Claude AI", icon: "🤖" },
  { name: "JavaScript", icon: "💛" },
  { name: "HTML/CSS", icon: "🌐" },
];

const techBooks = ["你不知道的JavaScript", "JavaScript高级程序设计 第5版"];

const nonTechBooks = ["与神对话", "当下的力量", "如何阅读一本书"];

function TechCard({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/50 px-5 py-3 backdrop-blur-sm transition-colors hover:bg-card/80">
      <span className="text-lg">{icon}</span>
      <span className="whitespace-nowrap text-sm font-medium">{name}</span>
    </div>
  );
}

export default function HomeContent() {
  return (
    <div className="relative">
      {/* ===== Hero Section ===== */}
      <section className="relative flex min-h-[90vh] items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-[42%_58%]">
            {/* Left: text content */}
            <div>
              <BlurFade delay={0.1}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 text-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  正在寻找新的工作机会
                </div>
              </BlurFade>

              <BlurFade delay={0.2}>
                <TypingAnimation
                  className="mb-3 text-lg font-normal leading-normal tracking-normal text-muted-foreground md:text-xl"
                  duration={80}
                >
                  你好，欢迎来到我的博客 👋
                </TypingAnimation>
              </BlurFade>

              <BlurFade delay={0.5}>
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  我是{" "}
                  <SparklesText>
                    <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                      Geeki
                    </span>
                  </SparklesText>
                </h1>
              </BlurFade>

              <BlurFade delay={0.7}>
                <div className="mb-6 flex items-center justify-start gap-2 text-xl text-muted-foreground md:text-2xl">
                  <Code className="h-5 w-5 text-purple-500" />
                  <WordRotate
                    words={[
                      "前端工程师",
                      "全栈开发者",
                      // "旅行爱好者",
                      "终身学习者",
                    ]}
                    className="font-semibold text-foreground"
                  />
                </div>
              </BlurFade>

              <BlurFade delay={0.9}>
                <p className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  拥有 3 年前端开发经验，热爱技术、旅游与生活。
                  <br className="hidden sm:block" />
                  用代码构建美好事物，用脚步丈量广阔世界。
                </p>
              </BlurFade>

              <BlurFade delay={1.1}>
                <div className="flex flex-wrap items-center justify-start gap-4">
                  <CoolMode>
                    <a
                      href="https://github.com/Sakura-echos/GeekiBlog.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-7 py-3 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                    >
                      <Github className="h-4 w-4" />
                      查看源码
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 blur-xl transition-opacity group-hover:opacity-50" />
                    </a>
                  </CoolMode>
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-7 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-300 hover:shadow-lg dark:hover:border-purple-600"
                  >
                    了解更多
                    <ChevronDown className="h-3.5 w-3.5" />
                  </a>
                </div>
              </BlurFade>

              <BlurFade delay={1.6}>
                <motion.div
                  className="mt-16 flex justify-start"
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1">
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                      animate={{ y: [0, 8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              </BlurFade>
            </div>

            {/* Right: hero image */}
            <BlurFade delay={0.4}>
              <div className="hidden items-center lg:flex">
                <div className="relative w-[120%] -ml-16 -mr-16 opacity-90 dark:opacity-60 dark:[filter:brightness(1.1)_contrast(0.9)]">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 blur-2xl" />
                  <HeroImage />
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { value: 3, label: "年开发经验", suffix: "+" },
              { value: 10, label: "国家旅行", suffix: "+" },
              // { value: 1, label: "开源项目", suffix: "" },
              { value: 100, label: "代码热情", suffix: "%" },
            ].map((stat, i) => (
              <BlurFade key={stat.label} delay={0.1 * i}>
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold md:text-4xl">
                    <NumberTicker value={stat.value} delay={0.3 + i * 0.15} />
                    <span className="text-purple-500">{stat.suffix}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <BorderBeam size={120} duration={8 + i * 2} delay={i * 2} />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tech Stack Section ===== */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <BlurFade delay={0.1}>
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                <Sparkles className="mr-2 inline h-6 w-6 text-purple-500" />
                技术栈
              </h2>
              <p className="text-muted-foreground">本博客使用以下技术构建</p>
            </div>
          </BlurFade>

          <div className="relative overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s]">
              {techStack.map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="mt-4 [--duration:35s]">
              {[...techStack].reverse().map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== About Blog Section ===== */}
      <section id="about" className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <BlurFade delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-purple-50/50 via-card/50 to-blue-50/50 p-8 backdrop-blur-sm dark:from-purple-950/20 dark:via-card/50 dark:to-blue-950/20 md:p-12">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                <Code className="mr-2 inline h-6 w-6 text-blue-500" />
                关于本博客
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <BoxReveal delay={0.2} width="100%">
                  <p className="text-base leading-relaxed">
                    前端技术栈：
                    <span className="font-semibold text-foreground">
                      TailwindCSS + React + TypeScript + Next.js + MagicUI
                    </span>
                  </p>
                </BoxReveal>
                <BoxReveal delay={0.4} width="100%">
                  <p className="text-base leading-relaxed">
                    AI 辅助开发：
                    <span className="font-semibold text-foreground">
                      Claude 4.6 Sonnet
                    </span>
                  </p>
                </BoxReveal>
                <BoxReveal delay={0.6} width="100%">
                  <p className="text-base leading-relaxed">
                    后端技术栈：
                    <span className="font-semibold text-foreground">
                      Supabase
                    </span>
                  </p>
                </BoxReveal>
                <BoxReveal delay={0.8} width="100%">
                  <p className="text-base leading-relaxed">
                    部署方式：
                    <span className="font-semibold text-foreground">
                      Vercel 自动实时部署
                    </span>
                  </p>
                </BoxReveal>
              </div>

              <BlurFade delay={1.2}>
                <div className="mt-8 flex items-center gap-3">
                  <a
                    href="https://github.com/Sakura-echos/GeekiBlog.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    查看开源仓库，欢迎各位业界大佬提供建议
                  </a>
                </div>
              </BlurFade>

              <BorderBeam size={300} duration={15} />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ===== Travel & Books Section ===== */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <BlurFade delay={0.1}>
            <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
              生活 & 阅读
            </h2>
          </BlurFade>

          <div className="grid gap-6 md:grid-cols-2">
            <BlurFade delay={0.2}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  <Plane className="h-3.5 w-3.5" />
                  旅行足迹
                </div>
                <h3 className="mb-3 text-xl font-bold">探索世界</h3>
                <p className="leading-relaxed text-muted-foreground">
                  除了编程以外，我还旅游过很多国家和城市，希望借此开拓我的视野。我在博客中分享了旅游攻略和所见所闻。
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>多国旅行经历</span>
                </div>
                <BorderBeam
                  colorFrom="#3B82F6"
                  colorTo="#06B6D4"
                  duration={12}
                />
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  书籍推荐
                </div>
                <h3 className="mb-4 text-xl font-bold">推荐阅读</h3>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-500">
                      技术类
                    </p>
                    {techBooks.map((title) => (
                      <p
                        key={title}
                        className="flex items-center gap-2 py-1 text-sm text-muted-foreground"
                      >
                        <span className="text-purple-400">◆</span>《{title}》
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
                      非技术类
                    </p>
                    {nonTechBooks.map((title) => (
                      <p
                        key={title}
                        className="flex items-center gap-2 py-1 text-sm text-muted-foreground"
                      >
                        <span className="text-amber-400">◆</span>《{title}》
                      </p>
                    ))}
                  </div>
                </div>
                <BorderBeam
                  colorFrom="#F59E0B"
                  colorTo="#EC4899"
                  duration={12}
                />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <BlurFade delay={0.1}>
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-16 text-white md:px-16"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
              <div className="relative z-10">
                <h2 className="mb-4 text-2xl font-bold md:text-4xl">
                  感兴趣？一起交流吧
                </h2>
                <p className="mx-auto mb-8 max-w-md text-white/80">
                  欢迎查看我的博客文章，或前往 GitHub 了解更多
                </p>
                <CoolMode>
                  <a
                    href="https://github.com/Sakura-echos/GeekiBlog.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-600 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <Github className="h-4 w-4" />
                    GitHub 开源仓库
                  </a>
                </CoolMode>
              </div>
            </motion.div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
