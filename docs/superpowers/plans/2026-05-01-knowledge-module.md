# Knowledge 模块实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在现有 geekiblog 项目中新增 Knowledge 模块，实现分类侧边栏导航 + 全屏步进演示，首个知识点为「React Diff 算法」6 步动画可视化。

**架构：** Next.js App Router `app/[locale]/knowledge/` 路由，硬编码知识点元数据在 `lib/knowledge-data.ts`，每个知识点演示为独立 React 组件，animate.css 驱动步骤入场动画，react-syntax-highlighter 做代码高亮。

**技术栈：** Next.js 14 App Router · next-intl · Tailwind CSS · animate.css · react-syntax-highlighter · TypeScript

---

## 文件清单

**新建文件：**
- `lib/knowledge-data.ts` — 知识点元数据注册表（类型定义 + 数据）
- `components/knowledge/knowledge-sidebar.tsx` — 左侧分类侧边栏（Client）
- `components/knowledge/knowledge-card.tsx` — 知识点列表卡片（Server-friendly）
- `components/knowledge/knowledge-list.tsx` — 右侧知识点列表（Client，接收分类 prop）
- `components/knowledge/step-player.tsx` — 步进播放器 Hook（`useStepPlayer`）
- `components/knowledge/demo-shell.tsx` — 演示页外壳（顶栏 + 步骤导航 + 底部控制，Client）
- `components/knowledge/demos/_registry.ts` — slug → 演示组件映射表
- `components/knowledge/demos/react-diff/index.tsx` — React Diff 演示入口（注册 6 步）
- `components/knowledge/demos/react-diff/step-1-vdom.tsx` — 步骤 1：什么是 Virtual DOM
- `components/knowledge/demos/react-diff/step-2-same-level.tsx` — 步骤 2：同层比较
- `components/knowledge/demos/react-diff/step-3-type-diff.tsx` — 步骤 3：类型不同替换
- `components/knowledge/demos/react-diff/step-4-key.tsx` — 步骤 4：key 的作用
- `components/knowledge/demos/react-diff/step-5-list-diff.tsx` — 步骤 5：列表 Diff
- `components/knowledge/demos/react-diff/step-6-summary.tsx` — 步骤 6：完整流程回顾
- `app/[locale]/knowledge/page.tsx` — 列表路由页（Server Component）
- `app/[locale]/knowledge/[slug]/page.tsx` — 演示路由页（Server Component）

**修改文件：**
- `messages/zh.json` — 新增 `nav.knowledge` 和 `knowledge.*` 翻译键
- `messages/en.json` — 同上
- `components/navigation.tsx` — navLinks 新增 Knowledge 入口

---

## 任务 1：安装依赖 + 创建知识点数据层

**文件：**
- 修改：`package.json`（通过 npm install）
- 创建：`lib/knowledge-data.ts`

- [ ] **步骤 1：安装 animate.css 和 react-syntax-highlighter**

```bash
cd d:/geekiblog
npm install animate.css react-syntax-highlighter
npm install --save-dev @types/react-syntax-highlighter
```

预期：`package.json` dependencies 中出现 `animate.css`、`react-syntax-highlighter`。

- [ ] **步骤 2：创建 `lib/knowledge-data.ts`**

```typescript
// lib/knowledge-data.ts
export type KnowledgeItem = {
  slug: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  tags: string[];
  icon: string;
  steps: number;
};

export type KnowledgeCategory = {
  id: string;
  nameZh: string;
  nameEn: string;
  emoji: string;
  items: KnowledgeItem[];
};

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    id: "react",
    nameZh: "React",
    nameEn: "React",
    emoji: "⚛",
    items: [
      {
        slug: "react-diff",
        titleZh: "Diff 算法原理",
        titleEn: "Diff Algorithm",
        descZh:
          "React 如何高效对比新旧 Virtual DOM？理解三大假设、同层比较策略与 key 的关键作用。",
        descEn:
          "How React efficiently diffs Virtual DOM trees. Three assumptions, same-level comparison, and the role of keys.",
        tags: ["6 步动画", "树结构可视化", "代码高亮"],
        icon: "🌳",
        steps: 6,
      },
    ],
  },
  {
    id: "javascript",
    nameZh: "JavaScript",
    nameEn: "JavaScript",
    emoji: "🟡",
    items: [],
  },
  {
    id: "react-native",
    nameZh: "React Native",
    nameEn: "React Native",
    emoji: "📱",
    items: [],
  },
  {
    id: "css",
    nameZh: "CSS",
    nameEn: "CSS",
    emoji: "🎨",
    items: [],
  },
];

/** 根据 slug 查找 item 及所属 category */
export function findKnowledgeItem(slug: string): {
  item: KnowledgeItem;
  category: KnowledgeCategory;
} | null {
  for (const category of KNOWLEDGE_CATEGORIES) {
    const item = category.items.find((i) => i.slug === slug);
    if (item) return { item, category };
  }
  return null;
}

/** 获取所有 slug（用于 generateStaticParams） */
export function getAllSlugs(): string[] {
  return KNOWLEDGE_CATEGORIES.flatMap((c) => c.items.map((i) => i.slug));
}
```

- [ ] **步骤 3：Commit**

```bash
git add lib/knowledge-data.ts package.json package-lock.json
git commit -m "feat(knowledge): add deps and knowledge-data registry"
```

---

## 任务 2：i18n + 导航栏更新

**文件：**
- 修改：`messages/zh.json`
- 修改：`messages/en.json`
- 修改：`components/navigation.tsx`

- [ ] **步骤 1：更新 `messages/zh.json`**

在 `"nav"` 对象内新增 `"knowledge": "知识库"`，并在根级新增 `"knowledge"` 命名空间：

```json
{
  "nav": {
    "home": "首页",
    "articles": "文章",
    "resume": "简历",
    "knowledge": "知识库"
  },
  "knowledge": {
    "title": "知识库",
    "subtitle": "前端核心原理，通过动画可视化深入理解",
    "backToList": "返回列表",
    "steps": "步骤",
    "prevStep": "上一步",
    "nextStep": "下一步",
    "comingSoon": "即将上线"
  }
}
```

- [ ] **步骤 2：更新 `messages/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "articles": "Articles",
    "resume": "Resume",
    "knowledge": "Knowledge"
  },
  "knowledge": {
    "title": "Knowledge",
    "subtitle": "Frontend core principles, visualized through animation",
    "backToList": "Back to list",
    "steps": "Steps",
    "prevStep": "Previous",
    "nextStep": "Next",
    "comingSoon": "Coming Soon"
  }
}
```

- [ ] **步骤 3：更新 `components/navigation.tsx`**

在 `navLinks` 数组中新增 Knowledge 入口（在 resume 之后）：

```typescript
const navLinks = [
  { href: `/${locale}`, label: t("home") },
  { href: `/${locale}/articles`, label: t("articles") },
  { href: `/${locale}/resume`, label: t("resume") },
  { href: `/${locale}/knowledge`, label: t("knowledge") },
];
```

- [ ] **步骤 4：Commit**

```bash
git add messages/zh.json messages/en.json components/navigation.tsx
git commit -m "feat(knowledge): add i18n keys and navigation link"
```

---

## 任务 3：知识库列表页组件

**文件：**
- 创建：`components/knowledge/knowledge-card.tsx`
- 创建：`components/knowledge/knowledge-sidebar.tsx`
- 创建：`components/knowledge/knowledge-list.tsx`

- [ ] **步骤 1：创建 `components/knowledge/knowledge-card.tsx`**

```tsx
// components/knowledge/knowledge-card.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { KnowledgeItem, KnowledgeCategory } from "@/lib/knowledge-data";

interface KnowledgeCardProps {
  item: KnowledgeItem;
  category: KnowledgeCategory;
  locale: string;
}

export function KnowledgeCard({ item, category, locale }: KnowledgeCardProps) {
  return (
    <Link
      href={`/${locale}/knowledge/${item.slug}`}
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-border",
        "bg-background p-5 transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-hover hover:border-muted-foreground/30"
      )}
    >
      {/* 图标 */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background-secondary text-xl">
        {item.icon}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary mb-1">
          {locale === "zh" ? item.titleZh : item.titleEn}
        </p>
        <p className="text-xs text-text-secondary leading-relaxed mb-2 line-clamp-2">
          {locale === "zh" ? item.descZh : item.descEn}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded border border-border bg-background-secondary text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 箭头 */}
      <span className="text-border text-lg transition-colors group-hover:text-muted-foreground shrink-0">
        ›
      </span>
    </Link>
  );
}
```

- [ ] **步骤 2：创建 `components/knowledge/knowledge-sidebar.tsx`**

```tsx
// components/knowledge/knowledge-sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import type { KnowledgeCategory } from "@/lib/knowledge-data";

interface KnowledgeSidebarProps {
  categories: KnowledgeCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  labelText: string;
}

export function KnowledgeSidebar({
  categories,
  activeId,
  onSelect,
  labelText,
}: KnowledgeSidebarProps) {
  return (
    <aside className="w-[200px] shrink-0 border-r border-border flex flex-col py-6">
      <div className="px-3">
        <p className="mb-2 px-2 text-[10px] uppercase tracking-widest text-text-secondary">
          {labelText}
        </p>
        <nav className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2.5 py-2",
                "text-left transition-colors duration-150",
                activeId === cat.id
                  ? "bg-background-secondary"
                  : "hover:bg-background-secondary"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{cat.emoji}</span>
                <span
                  className={cn(
                    "text-xs",
                    activeId === cat.id
                      ? "font-medium text-text-primary"
                      : "text-text-secondary"
                  )}
                >
                  {cat.nameZh}
                </span>
              </span>
              <span className="rounded-full border border-border bg-background-secondary px-1.5 py-0.5 text-[10px] text-text-secondary">
                {cat.items.length}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
```

- [ ] **步骤 3：创建 `components/knowledge/knowledge-list.tsx`**

```tsx
// components/knowledge/knowledge-list.tsx
"use client";

import { useState } from "react";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge-data";
import { KnowledgeSidebar } from "./knowledge-sidebar";
import { KnowledgeCard } from "./knowledge-card";
import { useTranslations } from "next-intl";

interface KnowledgeListProps {
  locale: string;
  initialCategoryId?: string;
}

export function KnowledgeList({
  locale,
  initialCategoryId = "react",
}: KnowledgeListProps) {
  const t = useTranslations("knowledge");
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId);

  const activeCategory = KNOWLEDGE_CATEGORIES.find(
    (c) => c.id === activeCategoryId
  )!;

  return (
    <div className="flex flex-1 overflow-hidden">
      <KnowledgeSidebar
        categories={KNOWLEDGE_CATEGORIES}
        activeId={activeCategoryId}
        onSelect={setActiveCategoryId}
        labelText={locale === "zh" ? "分类" : "Category"}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-9">
          <h1 className="mb-1.5 text-xl font-bold text-text-primary">
            {locale === "zh" ? activeCategory.nameZh : activeCategory.nameEn}
          </h1>
          <p className="mb-7 text-sm text-text-secondary">{t("subtitle")}</p>

          {activeCategory.items.length === 0 ? (
            <p className="text-sm text-text-secondary">{t("comingSoon")}</p>
          ) : (
            <div className="space-y-3">
              {activeCategory.items.map((item) => (
                <KnowledgeCard
                  key={item.slug}
                  item={item}
                  category={activeCategory}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **步骤 4：Commit**

```bash
git add components/knowledge/
git commit -m "feat(knowledge): add list page components (sidebar, card, list)"
```

---

## 任务 4：演示页外壳组件（step-player + demo-shell）

**文件：**
- 创建：`components/knowledge/step-player.tsx`
- 创建：`components/knowledge/demo-shell.tsx`

- [ ] **步骤 1：创建 `components/knowledge/step-player.tsx`**

```tsx
// components/knowledge/step-player.tsx
"use client";

import { useState, useCallback } from "react";

export interface StepPlayerState {
  currentStep: number;
  totalSteps: number;
  direction: "forward" | "backward";
  goTo: (step: number) => void;
  next: () => void;
  prev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function useStepPlayer(totalSteps: number): StepPlayerState {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const goTo = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;
      setDirection(step > currentStep ? "forward" : "backward");
      setCurrentStep(step);
    },
    [currentStep, totalSteps]
  );

  const next = useCallback(() => goTo(currentStep + 1), [currentStep, goTo]);
  const prev = useCallback(() => goTo(currentStep - 1), [currentStep, goTo]);

  return {
    currentStep,
    totalSteps,
    direction,
    goTo,
    next,
    prev,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
  };
}
```

- [ ] **步骤 2：创建 `components/knowledge/demo-shell.tsx`**

```tsx
// components/knowledge/demo-shell.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { StepPlayerState } from "./step-player";

export interface DemoStep {
  labelZh: string;
  labelEn: string;
  content: React.ReactNode;
}

interface DemoShellProps {
  locale: string;
  categoryEmoji: string;
  categoryName: string;
  titleZh: string;
  titleEn: string;
  steps: DemoStep[];
  player: StepPlayerState;
  backHref: string;
}

export function DemoShell({
  locale,
  categoryEmoji,
  categoryName,
  titleZh,
  titleEn,
  steps,
  player,
  backHref,
}: DemoShellProps) {
  const t = useTranslations("knowledge");
  const { currentStep, goTo, next, prev, isFirst, isLast } = player;

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
      {/* 顶栏 */}
      <div className="flex h-13 shrink-0 items-center gap-4 border-b border-border px-6">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
        >
          ← {t("backToList")}
        </Link>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>{categoryEmoji} {categoryName}</span>
          <span className="text-border">›</span>
          <span className="font-semibold text-text-primary">
            {locale === "zh" ? titleZh : titleEn}
          </span>
        </div>
      </div>

      {/* 主体：步骤导航 + 内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧步骤导航 */}
        <nav className="w-44 shrink-0 overflow-y-auto border-r border-border px-3 py-5">
          <p className="mb-3 px-2 text-[10px] uppercase tracking-widest text-text-secondary">
            {t("steps")}
          </p>
          <ol className="space-y-0.5">
            {steps.map((step, i) => (
              <li key={i}>
                <button
                  onClick={() => goTo(i)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition-colors",
                    i === currentStep
                      ? "bg-background-secondary"
                      : "hover:bg-background-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold transition-all",
                      i < currentStep
                        ? "border-green-500 bg-green-500 text-white"
                        : i === currentStep
                        ? "border-text-primary bg-text-primary text-background"
                        : "border-border text-text-secondary"
                    )}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] leading-snug",
                      i === currentStep
                        ? "font-medium text-text-primary"
                        : "text-text-secondary"
                    )}
                  >
                    {locale === "zh" ? step.labelZh : step.labelEn}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* 演示内容区 */}
        <div className="flex-1 overflow-y-auto">
          {steps[currentStep]?.content}
        </div>
      </div>

      {/* 底部步进控制 */}
      <div className="flex h-15 shrink-0 items-center justify-between border-t border-border px-8">
        <button
          onClick={prev}
          disabled={isFirst}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs transition-all",
            isFirst
              ? "cursor-not-allowed opacity-40 text-text-secondary"
              : "text-text-secondary hover:border-muted-foreground/50 hover:text-text-primary"
          )}
        >
          ← {t("prevStep")}
        </button>

        {/* 进度点 */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i < currentStep
                  ? "w-1.5 bg-green-500"
                  : i === currentStep
                  ? "w-5 bg-text-primary"
                  : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={isLast}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs transition-all",
            isLast
              ? "cursor-not-allowed opacity-40 border border-border text-text-secondary"
              : "bg-text-primary text-background hover:opacity-85"
          )}
        >
          {t("nextStep")} →
        </button>
      </div>
    </div>
  );
}
```

- [ ] **步骤 3：Commit**

```bash
git add components/knowledge/step-player.tsx components/knowledge/demo-shell.tsx
git commit -m "feat(knowledge): add step-player hook and demo-shell"
```

---

## 任务 5：React Diff 演示 — 步骤 1 & 2

**文件：**
- 创建：`components/knowledge/demos/react-diff/step-1-vdom.tsx`
- 创建：`components/knowledge/demos/react-diff/step-2-same-level.tsx`

> 每个步骤组件接收 `{ isActive: boolean }` prop，`isActive` 为 true 时动画类才生效（避免页面初始化时多个步骤同时播放）。
> animate.css 动画类通过条件 className 绑定。需在组件顶部导入：`import "animate.css";`

- [ ] **步骤 1：创建 `components/knowledge/demos/react-diff/step-1-vdom.tsx`**

```tsx
// components/knowledge/demos/react-diff/step-1-vdom.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const jsCode = `// Virtual DOM 本质上是一个 JS 对象
const vdom = {
  type: "div",
  props: { className: "container" },
  children: [
    {
      type: "h1",
      props: {},
      children: ["Hello, React!"],
    },
    {
      type: "p",
      props: { id: "desc" },
      children: ["这是一段描述"],
    },
  ],
};`;

export function Step1Vdom({ isActive }: Props) {
  const anim = isActive ? "animate__animated animate__fadeInDown" : "opacity-0";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-8 py-10 border-r border-border">
      <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
        <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">步骤 1 / 6</p>
        <h2 className="text-lg font-bold text-text-primary">什么是 Virtual DOM？</h2>
        <p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
          Virtual DOM 是真实 DOM 的轻量 JS 对象描述。React 先在内存中对比两棵 VNode 树，再将最小差异批量更新到真实 DOM。
        </p>
      </div>

      <div className="flex w-full max-w-2xl items-start gap-6">
        {/* JS 对象 */}
        <div className={cn("flex-1", anim)} style={{ animationDelay: "0.1s" }}>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">JS 对象（VNode）</p>
          <div className="rounded-xl border border-border overflow-hidden text-xs">
            <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "11px", background: "var(--secondary-bg)" }}>
              {jsCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* 箭头 */}
        <div className={cn("flex flex-col items-center gap-1 pt-12 text-text-secondary", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.3s" }}>
          <span className="text-xl">⟶</span>
          <span className="text-[10px] text-text-secondary">render</span>
        </div>

        {/* 真实 DOM */}
        <div className={cn("flex-1", anim)} style={{ animationDelay: "0.4s" }}>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">真实 DOM</p>
          <div className="rounded-xl border border-border bg-background-secondary p-4 font-mono text-xs text-text-secondary space-y-1 leading-6">
            <div><span className="text-blue-500">&lt;div</span> <span className="text-amber-600">class</span>=<span className="text-green-600">"container"</span><span className="text-blue-500">&gt;</span></div>
            <div className="pl-4"><span className="text-blue-500">&lt;h1&gt;</span>Hello, React!<span className="text-blue-500">&lt;/h1&gt;</span></div>
            <div className="pl-4"><span className="text-blue-500">&lt;p</span> <span className="text-amber-600">id</span>=<span className="text-green-600">"desc"</span><span className="text-blue-500">&gt;</span>这是一段描述<span className="text-blue-500">&lt;/p&gt;</span></div>
            <div><span className="text-blue-500">&lt;/div&gt;</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **步骤 2：创建 `components/knowledge/demos/react-diff/step-2-same-level.tsx`**

```tsx
// components/knowledge/demos/react-diff/step-2-same-level.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const code = `function reconcileChildFibers(
  returnFiber,
  currentFirstChild,
  newChild
) {
  // ✅ 只处理同层节点，不跨层
  if (isArray(newChild)) {
    return reconcileChildrenArray(
      returnFiber,
      currentFirstChild,
      newChild
    );
  }
}`;

function VNode({ label, state, delay, isActive }: { label: string; state: "normal" | "matched" | "removed" | "added"; delay: string; isActive: boolean }) {
  const base = "flex h-9 w-12 items-center justify-center rounded-lg border-[1.5px] font-mono text-xs font-semibold";
  const stateClass = {
    normal: "border-border bg-background-secondary text-text-secondary",
    matched: "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
    removed: "border-red-400 bg-red-50 text-red-600 line-through dark:bg-red-950 dark:text-red-400",
    added: "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  }[state];

  const animClass = {
    normal: "animate__animated animate__fadeInDown",
    matched: "animate__animated animate__fadeInDown animate__pulse",
    removed: "animate__animated animate__fadeInDown animate__shakeX",
    added: "animate__animated animate__bounceIn",
  }[state];

  return (
    <span
      className={cn(base, stateClass, isActive ? animClass : "opacity-0")}
      style={{ animationDelay: delay }}
    >
      {label}
    </span>
  );
}

export function Step2SameLevel({ isActive }: Props) {
  return (
    <div className="flex h-full gap-0">
      {/* 可视化区域 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 2 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">同层比较策略</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            React 只对比同层级节点，不会跨层移动。<br/>相同位置同类型节点复用，否则销毁重建。
          </p>
        </div>

        <div className="flex items-start gap-10">
          {/* 旧树 */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary">旧树 Old</p>
            <VNode label="<A>" state="normal" delay="0.1s" isActive={isActive} />
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-2">
              <VNode label="<B>" state="normal" delay="0.2s" isActive={isActive} />
              <VNode label="<C>" state="normal" delay="0.3s" isActive={isActive} />
            </div>
          </div>

          {/* 箭头 */}
          <div className={cn("pt-8 text-2xl text-border", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.4s" }}>⟶</div>

          {/* 新树 */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary">新树 New</p>
            <VNode label="<A>" state="matched" delay="0.5s" isActive={isActive} />
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-2">
              <VNode label="<B>" state="matched" delay="0.6s" isActive={isActive} />
              <VNode label="<D>" state="removed" delay="0.75s" isActive={isActive} />
            </div>
          </div>

          {/* 新增 E */}
          <div className={cn("flex flex-col items-center gap-2 self-end", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.9s" }}>
            <p className="text-[10px] tracking-widest text-text-secondary">新增</p>
            <VNode label="<E>" state="added" delay="1s" isActive={isActive} />
          </div>
        </div>

        {/* 图例 */}
        <div className={cn("flex gap-5 text-[11px]", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "1.1s" }}>
          {[["#22c55e", "复用节点"], ["#ef4444", "销毁重建"], ["#f59e0b", "新增节点"]].map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-sm border-[1.5px]" style={{ borderColor: color, background: color + "20" }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "11px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **步骤 3：Commit**

```bash
git add components/knowledge/demos/react-diff/step-1-vdom.tsx components/knowledge/demos/react-diff/step-2-same-level.tsx
git commit -m "feat(knowledge): add react-diff demo steps 1-2"
```

---

## 任务 6：React Diff 演示 — 步骤 3 & 4

**文件：**
- 创建：`components/knowledge/demos/react-diff/step-3-type-diff.tsx`
- 创建：`components/knowledge/demos/react-diff/step-4-key.tsx`

- [ ] **步骤 1：创建 `components/knowledge/demos/react-diff/step-3-type-diff.tsx`**

```tsx
// components/knowledge/demos/react-diff/step-3-type-diff.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const code = `function updateElement(current, element) {
  if (current?.type === element.type) {
    // ✅ 类型相同 → 复用 Fiber，更新 props
    return useFiber(current, element.props);
  }
  // ❌ 类型不同 → 销毁旧 Fiber，创建新 Fiber
  return createFiberFromElement(element);
}`;

export function Step3TypeDiff({ isActive }: Props) {
  return (
    <div className="flex h-full gap-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 3 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">类型不同 → 直接替换</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            节点类型（tag 名）改变时，React 不会尝试复用，直接卸载整棵旧子树，挂载新子树。
          </p>
        </div>

        {/* 对比演示 */}
        <div className="flex w-full max-w-xl flex-col gap-6">
          {/* 场景 A：类型相同 */}
          <div className={cn("rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950", isActive ? "animate__animated animate__fadeInLeft" : "opacity-0")} style={{ animationDelay: "0.2s" }}>
            <p className="mb-2 text-xs font-semibold text-green-700 dark:text-green-400">✅ 类型相同 — 复用</p>
            <div className="flex items-center gap-4 font-mono text-sm">
              <span className="rounded border border-green-400 bg-white px-3 py-1.5 text-green-700">&lt;div&gt;</span>
              <span className="text-text-secondary">→</span>
              <span className="rounded border border-green-400 bg-white px-3 py-1.5 text-green-700">&lt;div&gt;</span>
              <span className="text-xs text-green-600">仅更新 props，保留 DOM 节点</span>
            </div>
          </div>

          {/* 场景 B：类型不同 */}
          <div className={cn("rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950", isActive ? "animate__animated animate__fadeInLeft animate__shakeX" : "opacity-0")} style={{ animationDelay: "0.5s" }}>
            <p className="mb-2 text-xs font-semibold text-red-700 dark:text-red-400">❌ 类型不同 — 销毁重建</p>
            <div className="flex items-center gap-4 font-mono text-sm">
              <span className={cn("rounded border border-red-400 bg-white px-3 py-1.5 text-red-600", isActive ? "animate__animated animate__flipOutX" : "")} style={{ animationDelay: "0.8s" }}>&lt;div&gt;</span>
              <span className="text-text-secondary">→</span>
              <span className={cn("rounded border border-amber-400 bg-white px-3 py-1.5 text-amber-700", isActive ? "animate__animated animate__flipInX" : "")} style={{ animationDelay: "1.1s" }}>&lt;span&gt;</span>
              <span className="text-xs text-red-600">整棵子树卸载 + 重新挂载</span>
            </div>
          </div>

          {/* 警告提示 */}
          <div className={cn("rounded-xl border border-border bg-background-secondary p-3 text-xs text-text-secondary", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "1.4s" }}>
            ⚠️ 因此，不要用条件渲染在同位置切换不同组件类型，会触发整棵子树的卸载（state 丢失、动画中断）。
          </div>
        </div>
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "11px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **步骤 2：创建 `components/knowledge/demos/react-diff/step-4-key.tsx`**

```tsx
// components/knowledge/demos/react-diff/step-4-key.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const code = `// 无 key — React 按索引对比，全部更新
<ul>
  <li>Apple</li>  {/* index 0 */}
  <li>Banana</li> {/* index 1 */}
</ul>

// 有 key — React 按 key 对比，精准复用
<ul>
  <li key="a">Apple</li>
  <li key="b">Banana</li>
</ul>

// 新增 Orange 到头部
// 无 key：全部节点更新（3 次 DOM 操作）
// 有 key：仅插入 Orange（1 次 DOM 操作）`;

const items = [
  { key: "a", label: "🍎 Apple" },
  { key: "b", label: "🍌 Banana" },
  { key: "c", label: "🍊 Orange" },
];

export function Step4Key({ isActive }: Props) {
  return (
    <div className="flex h-full gap-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 4 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">key 的作用</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            key 帮助 React 识别同层列表中哪些节点是同一个，从而精准复用，避免不必要的 DOM 操作。
          </p>
        </div>

        <div className="flex w-full max-w-xl gap-6">
          {/* 无 key */}
          <div className="flex-1">
            <p className={cn("mb-2 text-xs font-semibold text-red-600", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.1s" }}>❌ 无 key — 按索引</p>
            <div className="space-y-1.5">
              {items.map((item, i) => (
                <div
                  key={item.key}
                  className={cn(
                    "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
                    isActive ? "animate__animated animate__fadeInLeft" : "opacity-0"
                  )}
                  style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                >
                  <span className="text-[10px] text-text-secondary mr-2">index={i}</span>
                  {item.label}
                </div>
              ))}
              <p className={cn("text-[10px] text-red-500 mt-1", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.7s" }}>
                头部插入 → 3 个节点全部更新
              </p>
            </div>
          </div>

          {/* 有 key */}
          <div className="flex-1">
            <p className={cn("mb-2 text-xs font-semibold text-green-600", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.1s" }}>✅ 有 key — 精准匹配</p>
            <div className="space-y-1.5">
              <div
                className={cn(
                  "rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400",
                  isActive ? "animate__animated animate__bounceIn" : "opacity-0"
                )}
                style={{ animationDelay: "0.9s" }}
              >
                <span className="text-[10px] text-text-secondary mr-2">key="c" 🆕</span>
                🍊 Orange
              </div>
              {items.slice(0, 2).map((item, i) => (
                <div
                  key={item.key}
                  className={cn(
                    "rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
                    isActive ? "animate__animated animate__fadeInLeft" : "opacity-0"
                  )}
                  style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                >
                  <span className="text-[10px] text-text-secondary mr-2">key="{item.key}" ♻️</span>
                  {item.label}
                </div>
              ))}
              <p className={cn("text-[10px] text-green-600 mt-1", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "1.1s" }}>
                头部插入 → 仅 Orange 新建，其余复用
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="jsx" style={oneLight} customStyle={{ margin: 0, fontSize: "11px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **步骤 3：Commit**

```bash
git add components/knowledge/demos/react-diff/step-3-type-diff.tsx components/knowledge/demos/react-diff/step-4-key.tsx
git commit -m "feat(knowledge): add react-diff demo steps 3-4"
```

---

## 任务 7：React Diff 演示 — 步骤 5 & 6 + 注册表

**文件：**
- 创建：`components/knowledge/demos/react-diff/step-5-list-diff.tsx`
- 创建：`components/knowledge/demos/react-diff/step-6-summary.tsx`
- 创建：`components/knowledge/demos/react-diff/index.tsx`
- 创建：`components/knowledge/demos/_registry.ts`

- [ ] **步骤 1：创建 `components/knowledge/demos/react-diff/step-5-list-diff.tsx`**

```tsx
// components/knowledge/demos/react-diff/step-5-list-diff.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const code = `// React 列表 Diff 四步策略
// 1. 头头对比：newStart vs oldStart
// 2. 尾尾对比：newEnd vs oldEnd
// 3. 头尾交叉：newStart vs oldEnd
// 4. 建 key Map，O(1) 查找可复用节点

function reconcileChildrenArray(
  returnFiber, currentFirstChild, newChildren
) {
  let oldFiber = currentFirstChild;
  let newIdx = 0;

  // 第一轮：头部顺序扫描
  for (; oldFiber && newIdx < newChildren.length; newIdx++) {
    if (oldFiber.index > newIdx) break;
    const newChild = newChildren[newIdx];
    if (!canReuseNode(oldFiber, newChild)) break;
    // 可以复用：更新 props
    placeChild(updateSlot(oldFiber, newChild), newIdx);
    oldFiber = oldFiber.sibling;
  }

  // 第二轮：用 Map 处理乱序节点
  const existingChildren = mapRemainingChildren(oldFiber);
  for (; newIdx < newChildren.length; newIdx++) {
    const matchedFiber = existingChildren.get(
      newChildren[newIdx].key ?? newIdx
    );
    // 找到可复用节点或新建
  }
}`;

const nodes = [
  { key: "A", color: "blue" },
  { key: "B", color: "purple" },
  { key: "C", color: "green" },
  { key: "D", color: "amber" },
];
const newOrder = [
  { key: "A", color: "blue", status: "reuse" },
  { key: "D", color: "amber", status: "move" },
  { key: "B", color: "purple", status: "reuse" },
  { key: "E", color: "red", status: "new" },
];

export function Step5ListDiff({ isActive }: Props) {
  const [phase, setPhase] = useState(0); // 0=初始, 1=扫描, 2=结果

  const statusClass: Record<string, string> = {
    reuse: "border-green-400 bg-green-50 text-green-700",
    move: "border-blue-400 bg-blue-50 text-blue-700",
    new: "border-amber-400 bg-amber-50 text-amber-700",
  };

  return (
    <div className="flex h-full gap-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 5 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">列表 Diff 优化</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            React 用顺序扫描 + key Map 两轮策略，在 O(n) 时间内完成列表节点的复用匹配。
          </p>
        </div>

        {/* 旧列表 */}
        <div className="w-full max-w-md">
          <p className={cn("mb-2 text-[10px] uppercase tracking-widest text-text-secondary", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>旧列表</p>
          <div className="flex gap-2">
            {nodes.map((n, i) => (
              <div
                key={n.key}
                className={cn(
                  "flex h-10 w-12 items-center justify-center rounded-lg border border-border bg-background-secondary font-mono text-sm font-bold text-text-primary",
                  isActive ? "animate__animated animate__fadeInDown" : "opacity-0"
                )}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {n.key}
              </div>
            ))}
          </div>
        </div>

        {/* 步骤按钮 */}
        <div className={cn("flex gap-3", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.6s" }}>
          <button onClick={() => setPhase(1)} className={cn("rounded-lg border border-border px-3 py-1.5 text-xs transition-all hover:border-muted-foreground/50", phase >= 1 ? "bg-text-primary text-background" : "text-text-secondary")}>
            第一轮：顺序扫描
          </button>
          <button onClick={() => setPhase(2)} className={cn("rounded-lg border border-border px-3 py-1.5 text-xs transition-all hover:border-muted-foreground/50", phase >= 2 ? "bg-text-primary text-background" : "text-text-secondary")}>
            第二轮：key Map 匹配
          </button>
        </div>

        {/* 新列表（动画结果） */}
        {phase >= 2 && (
          <div className="w-full max-w-md">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">新列表（结果）</p>
            <div className="flex gap-2 flex-wrap">
              {newOrder.map((n, i) => (
                <div
                  key={n.key}
                  className={cn(
                    "flex h-10 w-14 items-center justify-center rounded-lg border font-mono text-sm font-bold",
                    statusClass[n.status],
                    "animate__animated animate__bounceIn"
                  )}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {n.key}
                  <span className="ml-0.5 text-[8px]">{n.status === "new" ? "🆕" : n.status === "move" ? "↕" : "♻"}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-4 text-[10px] text-text-secondary">
              <span>♻ 原地复用</span>
              <span>↕ 移动复用</span>
              <span>🆕 新建</span>
            </div>
          </div>
        )}
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "10px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **步骤 2：创建 `components/knowledge/demos/react-diff/step-6-summary.tsx`**

```tsx
// components/knowledge/demos/react-diff/step-6-summary.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const summaryPoints = [
  { icon: "🌳", title: "Virtual DOM", desc: "JS 对象描述 UI，render 前先在内存 diff，再批量更新真实 DOM" },
  { icon: "↔", title: "同层比较", desc: "只比较同一层级，不跨层移动，O(n) 时间复杂度" },
  { icon: "🔄", title: "类型判断", desc: "类型相同复用 Fiber，类型不同销毁整棵子树后重建" },
  { icon: "🔑", title: "key 优化", desc: "key 唯一标识列表节点，头部插入只需 1 次 DOM 操作" },
  { icon: "📋", title: "列表 Diff", desc: "顺序扫描 + key Map 两轮策略，最大化节点复用" },
];

const finalCode = `// React Diff 三大假设
// 1. Web UI 中跨层级移动操作极少 → 只做同层比较
// 2. 类型不同的组件生成不同结构 → 直接替换
// 3. 开发者用 key 标识同层节点 → key 驱动列表优化

// 整体时间复杂度：O(n)（传统 diff 是 O(n³)）`;

export function Step6Summary({ isActive }: Props) {
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-8 py-10">
      <div className={cn("mb-8 text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
        <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 6 / 6</p>
        <h2 className="text-lg font-bold text-text-primary">完整流程回顾</h2>
        <p className="mt-2 text-sm text-text-secondary">React Diff 的三大假设 + 五个核心策略</p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {summaryPoints.map((p, i) => (
          <div
            key={p.title}
            className={cn(
              "rounded-xl border border-border bg-background-secondary p-4",
              isActive ? "animate__animated animate__fadeInUp" : "opacity-0"
            )}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div className="mb-2 text-xl">{p.icon}</div>
            <p className="mb-1 text-sm font-semibold text-text-primary">{p.title}</p>
            <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className={cn("w-full max-w-2xl rounded-xl border border-border overflow-hidden", isActive ? "animate__animated animate__fadeInUp" : "opacity-0")} style={{ animationDelay: "0.7s" }}>
        <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "12px", background: "var(--secondary-bg)" }}>
          {finalCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
```

- [ ] **步骤 3：创建 `components/knowledge/demos/react-diff/index.tsx`**

```tsx
// components/knowledge/demos/react-diff/index.tsx
"use client";
import { useStepPlayer } from "@/components/knowledge/step-player";
import { DemoShell, type DemoStep } from "@/components/knowledge/demo-shell";
import { Step1Vdom } from "./step-1-vdom";
import { Step2SameLevel } from "./step-2-same-level";
import { Step3TypeDiff } from "./step-3-type-diff";
import { Step4Key } from "./step-4-key";
import { Step5ListDiff } from "./step-5-list-diff";
import { Step6Summary } from "./step-6-summary";

interface Props {
  locale: string;
  backHref: string;
}

export function ReactDiffDemo({ locale, backHref }: Props) {
  const player = useStepPlayer(6);
  const { currentStep } = player;

  const steps: DemoStep[] = [
    {
      labelZh: "什么是 Virtual DOM",
      labelEn: "What is Virtual DOM",
      content: <Step1Vdom isActive={currentStep === 0} />,
    },
    {
      labelZh: "同层比较策略",
      labelEn: "Same-level Comparison",
      content: <Step2SameLevel isActive={currentStep === 1} />,
    },
    {
      labelZh: "类型不同直接替换",
      labelEn: "Type Mismatch",
      content: <Step3TypeDiff isActive={currentStep === 2} />,
    },
    {
      labelZh: "key 的作用",
      labelEn: "Role of Keys",
      content: <Step4Key isActive={currentStep === 3} />,
    },
    {
      labelZh: "列表 Diff 优化",
      labelEn: "List Diff Optimization",
      content: <Step5ListDiff isActive={currentStep === 4} />,
    },
    {
      labelZh: "完整流程回顾",
      labelEn: "Full Summary",
      content: <Step6Summary isActive={currentStep === 5} />,
    },
  ];

  return (
    <DemoShell
      locale={locale}
      categoryEmoji="⚛"
      categoryName="React"
      titleZh="Diff 算法原理"
      titleEn="Diff Algorithm"
      steps={steps}
      player={player}
      backHref={backHref}
    />
  );
}
```

- [ ] **步骤 4：创建 `components/knowledge/demos/_registry.ts`**

```typescript
// components/knowledge/demos/_registry.ts
import type { ComponentType } from "react";

// 每个演示组件的 props 类型
export interface DemoProps {
  locale: string;
  backHref: string;
}

// slug → 动态导入函数映射表
// 新增知识点时，在此注册即可
export const DEMO_REGISTRY: Record<string, () => Promise<{ default: ComponentType<DemoProps> }>> = {
  "react-diff": () =>
    import("./react-diff/index").then((m) => ({ default: m.ReactDiffDemo })),
};
```

- [ ] **步骤 5：Commit**

```bash
git add components/knowledge/demos/
git commit -m "feat(knowledge): add react-diff demo steps 5-6 and registry"
```

---

## 任务 8：路由页面

**文件：**
- 创建：`app/[locale]/knowledge/page.tsx`
- 创建：`app/[locale]/knowledge/[slug]/page.tsx`

- [ ] **步骤 1：创建 `app/[locale]/knowledge/page.tsx`**

```tsx
// app/[locale]/knowledge/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { KnowledgeList } from "@/components/knowledge/knowledge-list";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "knowledge" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function KnowledgePage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <KnowledgeList locale={params.locale} />
    </div>
  );
}
```

- [ ] **步骤 2：创建 `app/[locale]/knowledge/[slug]/page.tsx`**

```tsx
// app/[locale]/knowledge/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { findKnowledgeItem, getAllSlugs } from "@/lib/knowledge-data";
import { DEMO_REGISTRY } from "@/components/knowledge/demos/_registry";

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = findKnowledgeItem(params.slug);
  if (!found) return {};
  const { item } = found;
  return {
    title: params.locale === "zh" ? item.titleZh : item.titleEn,
    description: params.locale === "zh" ? item.descZh : item.descEn,
  };
}

export default async function KnowledgeDemoPage({ params }: PageProps) {
  const found = findKnowledgeItem(params.slug);
  if (!found) notFound();

  const demoLoader = DEMO_REGISTRY[params.slug];
  if (!demoLoader) notFound();

  const { default: DemoComponent } = await demoLoader();

  return (
    <DemoComponent
      locale={params.locale}
      backHref={`/${params.locale}/knowledge`}
    />
  );
}
```

- [ ] **步骤 3：验证路由可访问**

启动开发服务器：
```bash
npm run dev
```

访问：
- `http://localhost:3000/zh/knowledge` → 应显示左侧分类侧边栏 + React 分类下的「Diff 算法原理」卡片
- `http://localhost:3000/zh/knowledge/react-diff` → 应显示 6 步演示页，步骤 1 有 fadeInDown 动画
- `http://localhost:3000/en/knowledge` → 同上英文版
- 导航栏应显示「知识库」/「Knowledge」链接并高亮当前页

- [ ] **步骤 4：Commit**

```bash
git add app/[locale]/knowledge/
git commit -m "feat(knowledge): add list and demo route pages"
```

---

## 任务 9：收尾检查

- [ ] **步骤 1：检查 linter 错误**

```bash
cd d:/geekiblog
npx tsc --noEmit
```

修复所有 TypeScript 报错。

- [ ] **步骤 2：确认 `_registry.ts` 动态导入类型匹配**

`DEMO_REGISTRY` 中的导入需返回 `{ default: ComponentType<DemoProps> }`，`ReactDiffDemo` 接收 `{ locale, backHref }` 应与 `DemoProps` 匹配。如有不匹配，修改 `react-diff/index.tsx` 的导出方式：

```tsx
// 修改 react-diff/index.tsx 末尾默认导出
export default ReactDiffDemo;
// 保留具名导出
export { ReactDiffDemo };
```

- [ ] **步骤 3：检查 animate.css import 作用域**

animate.css 在各步骤组件中单独 import，不会有全局样式冲突。确认 `next.config.js` 没有阻止 CSS 模块外的 import。如有问题，改在 `app/globals.css` 顶部统一引入：

```css
/* app/globals.css 顶部新增 */
@import "animate.css";
```

并删除各步骤组件中的 `import "animate.css"` 行。

- [ ] **步骤 4：最终 Commit**

```bash
git add -A
git commit -m "feat(knowledge): complete knowledge module with react-diff demo"
```
