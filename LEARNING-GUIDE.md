# 项目学习指南 - 从零开始理解 Geeki Blog

本指南将帮助你一步步深入理解这个 Next.js 博客项目的每个部分。

---

## 📚 学习路线图

```
第1步: 了解项目结构 (5分钟)
   ↓
第2步: 理解配置文件 (10分钟)
   ↓
第3步: 学习样式系统 (15分钟)
   ↓
第4步: 掌握路由和布局 (20分钟)
   ↓
第5步: 理解组件系统 (30分钟)
   ↓
第6步: 学习多语言实现 (15分钟)
   ↓
第7步: 实践：添加自己的内容 (30分钟)
```

---

## 🎯 第1步：了解项目结构（5分钟）

### 打开项目，查看这些关键文件夹：

```
geeki-blog/
├── app/                    👈 从这里开始！所有页面都在这里
├── components/             👈 可复用的 UI 组件
├── lib/                    👈 工具函数和数据
├── messages/               👈 多语言翻译
├── public/                 👈 静态资源（图片等）
└── package.json            👈 项目依赖
```

### 🔍 现在做：

1. 打开 `package.json` 看看用了哪些技术
2. 打开 `app/` 文件夹，看看页面结构

---

## 🎯 第2步：理解配置文件（10分钟）

### 2.1 Next.js 配置

**打开文件**: `next.config.js`

```javascript
// 这个文件配置了 Next.js 的行为
const createNextIntlPlugin = require("next-intl/plugin");

// 集成多语言插件
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true, // 严格模式，帮助发现问题
};

module.exports = withNextIntl(nextConfig);
```

**关键点**:

- Next.js 是基于 React 的框架
- 这个配置启用了国际化功能

---

### 2.2 TypeScript 配置

**打开文件**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"] // 👈 这允许你用 @/ 代替相对路径
    }
  }
}
```

**实际效果**:

```typescript
// 不用这样写：
import { cn } from "../../lib/utils";

// 可以这样写：
import { cn } from "@/lib/utils";
```

---

### 2.3 Tailwind CSS 配置

**打开文件**: `tailwind.config.ts`

```typescript
export default {
  darkMode: "class", // 👈 通过 class 切换深色模式
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // 👈 扫描这些文件中的类名
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)", // 👈 使用 CSS 变量
      },
    },
  },
};
```

**关键点**:

- Tailwind 会扫描代码找到用到的类名
- 主题颜色通过 CSS 变量定义，便于切换深色模式

### 🔍 现在做：

1. 打开 `app/globals.css` 看看 CSS 变量定义
2. 注意 `:root` (浅色) 和 `.dark` (深色) 的区别

---

## 🎯 第3步：学习样式系统（15分钟）

### 3.1 CSS 变量的魔法

**打开文件**: `app/globals.css`

```css
/* 浅色主题 */
:root {
  --bg-color: #ffffff;
  --text-primary: #333333;
}

/* 深色主题 */
.dark {
  --bg-color: #1a1a1a;
  --text-primary: #efefef;
}
```

**工作原理**:

1. 默认使用 `:root` 的颜色（浅色）
2. 当 `<html>` 标签有 `class="dark"` 时，使用 `.dark` 的颜色
3. 所有使用 `var(--bg-color)` 的地方自动更新

### 3.2 Tailwind 类名使用

**打开任意组件**，例如 `components/blog-card.tsx`:

```typescript
<div className="p-6 rounded-2xl bg-background-secondary hover:shadow-hover">
  {/*
    p-6             → padding: 1.5rem (24px)
    rounded-2xl     → border-radius: 1rem (16px)
    bg-background-secondary → background: var(--secondary-bg)
    hover:shadow-hover → 鼠标悬停时应用阴影
  */}
</div>
```

**响应式设计**:

```typescript
<div className="text-sm md:text-base lg:text-lg">
  {/*
    默认(< 768px): text-sm (14px)
    平板(768px+):  text-base (16px)
    桌面(1024px+): text-lg (18px)
  */}
</div>
```

### 🔍 现在做：

1. 打开浏览器访问 http://localhost:3000/zh
2. 按 F12 打开开发者工具
3. 点击右上角的月亮图标切换主题
4. 在 Elements 面板看 `<html>` 标签的 class 变化

---

## 🎯 第4步：掌握路由和布局（20分钟）

### 4.1 Next.js App Router 基础

**文件系统即路由**:

```
app/
├── layout.tsx              → 所有页面的根布局
├── [locale]/               → 动态路由（语言）
│   ├── layout.tsx          → 语言特定布局
│   ├── page.tsx            → 首页 (/zh 或 /en)
│   ├── blog/
│   │   ├── page.tsx        → 博客列表 (/zh/blog)
│   │   └── [slug]/
│   │       └── page.tsx    → 文章详情 (/zh/blog/xxx)
```

**URL 对应关系**:

- `/zh` → `app/[locale]/page.tsx` (locale="zh")
- `/en/blog` → `app/[locale]/blog/page.tsx` (locale="en")
- `/zh/blog/my-post` → `app/[locale]/blog/[slug]/page.tsx` (locale="zh", slug="my-post")

---

### 4.2 理解布局嵌套

**打开文件**: `app/layout.tsx`

```typescript
// 根布局 - 最外层
export default function RootLayout({ children }) {
  return children; // 只是传递给下一层
}
```

**打开文件**: `app/[locale]/layout.tsx`

```typescript
// 语言特定布局 - 包含导航栏、主题、翻译
export default async function LocaleLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body>
        <ThemeProvider>        {/* 提供主题功能 */}
          <NextIntlClientProvider>  {/* 提供翻译功能 */}
            <Navigation />      {/* 导航栏 */}
            <main>{children}</main>  {/* 页面内容 */}
            <footer>...</footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**嵌套结构**:

```
RootLayout (app/layout.tsx)
  └── LocaleLayout (app/[locale]/layout.tsx)
        └── Page (app/[locale]/page.tsx)
```

### 🔍 现在做：

1. 打开 `app/[locale]/layout.tsx`
2. 找到 `<Navigation />` 组件
3. 按住 Ctrl 点击 `Navigation` 跳转到组件定义
4. 看看导航栏是如何实现的

---

## 🎯 第5步：理解组件系统（30分钟）

### 5.1 客户端 vs 服务端组件

**服务端组件**（默认）:

```typescript
// app/[locale]/page.tsx
// 没有 "use client" → 服务端组件
export default function HomePage() {
  return <div>首页</div>;
}
```

- 在服务器渲染
- 不能使用 useState, useEffect 等 hooks
- 性能更好

**客户端组件**:

```typescript
// components/theme-toggle.tsx
"use client";  // 👈 必须声明

import { useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  // 可以使用 React hooks
  return <button onClick={() => setTheme("dark")}>切换</button>;
}
```

- 在浏览器运行
- 可以使用交互功能
- 可以访问浏览器 API

---

### 5.2 深入学习核心组件

#### 组件1: 主题切换

**打开文件**: `components/theme-toggle.tsx`

```typescript
"use client";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();  // 从 next-themes 获取主题

  // 等待组件挂载，避免服务端渲染不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
```

**工作流程**:

1. 用户点击按钮
2. 调用 `setTheme("dark")`
3. next-themes 在 `<html>` 添加 `class="dark"`
4. CSS 变量切换到 `.dark` 的值
5. 所有颜色自动更新

---

#### 组件2: 语言切换

**打开文件**: `components/language-toggle.tsx`

```typescript
"use client";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();  // 当前路径
  const currentLocale = params.locale;  // 当前语言

  const toggleLanguage = () => {
    const newLocale = currentLocale === "zh" ? "en" : "zh";
    // 把 /zh/blog 改成 /en/blog
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.replace(newPathname);
  };

  return <button onClick={toggleLanguage}>切换语言</button>;
}
```

---

#### 组件3: 瀑布流布局

**打开文件**: `components/masonry-grid.tsx`

```typescript
export function MasonryGrid({ children }) {
  const [columns, setColumns] = useState(3);

  // 监听窗口大小变化
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);      // 手机
      else if (width < 1024) setColumns(2); // 平板
      else setColumns(3);                   // 桌面
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 轮流分配内容到各列
  const columnItems = Array.from({ length: columns }, () => []);
  children.forEach((child, index) => {
    columnItems[index % columns].push(child);
  });

  return (
    <div style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {columnItems.map((items, i) => (
        <div key={i}>{items}</div>
      ))}
    </div>
  );
}
```

**算法图解**:

```
假设有 6 个卡片，3 列：

卡片：[1, 2, 3, 4, 5, 6]

分配结果：
列1: [1, 4]  (index % 3 = 0)
列2: [2, 5]  (index % 3 = 1)
列3: [3, 6]  (index % 3 = 2)

显示效果：
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
│ 4 │ 5 │ 6 │
└───┴───┴───┘
```

### 🔍 现在做：

1. 打开 `app/[locale]/blog/page.tsx`
2. 看看 `MasonryGrid` 如何使用
3. 打开浏览器，调整窗口大小，观察列数变化

---

## 🎯 第6步：学习多语言实现（15分钟）

### 6.1 翻译文件

**打开文件**: `messages/zh.json`

```json
{
  "nav": {
    "home": "首页",
    "blog": "博客"
  },
  "home": {
    "greeting": "你好，我是"
  }
}
```

**打开文件**: `messages/en.json`

```json
{
  "nav": {
    "home": "Home",
    "blog": "Blog"
  },
  "home": {
    "greeting": "Hi, I'm"
  }
}
```

---

### 6.2 在组件中使用翻译

**打开文件**: `app/[locale]/page.tsx`

```typescript
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");  // 使用 "home" 命名空间

  return (
    <div>
      <p>{t("greeting")}</p>  {/* 中文: "你好，我是" / 英文: "Hi, I'm" */}
    </div>
  );
}
```

---

### 6.3 路由和中间件

**打开文件**: `middleware.ts`

```typescript
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["zh", "en"], // 支持的语言
  defaultLocale: "zh", // 默认语言
  localePrefix: "always", // URL 总是包含语言前缀
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // 匹配所有页面
};
```

**工作流程**:

1. 用户访问 `/` → 自动重定向到 `/zh`
2. 中间件检测 URL 中的语言代码
3. 加载对应的翻译文件
4. 页面使用 `useTranslations` 获取翻译

### 🔍 现在做：

1. 浏览器访问 http://localhost:3000
2. 看看是否自动重定向到 `/zh`
3. 点击地球图标切换语言
4. 观察 URL 和页面内容的变化

---

## 🎯 第7步：实践 - 添加自己的内容（30分钟）

### 实践1: 修改个人信息

**打开文件**: `app/[locale]/page.tsx`

找到这段代码：

```typescript
<h1 className="text-4xl font-bold">
  {t("name")}  {/* 显示 "Geeki" */}
</h1>
```

**任务**:

1. 把 `{t("name")}` 改成你的名字（硬编码）
2. 或者在 `messages/zh.json` 修改 `"name": "你的名字"`
3. 保存，查看浏览器变化

---

### 实践2: 添加一篇博客文章

**打开文件**: `lib/blog-data.ts`

在数组开头添加：

```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: "my-first-post", // URL: /zh/blog/my-first-post
    title: "我的第一篇文章",
    excerpt: "这是我的第一篇测试文章",
    date: "2024-03-20",
    readTime: 3,
    tags: ["测试", "学习"],
  },
  // ... 其他文章
];
```

保存后访问 http://localhost:3000/zh/blog 查看效果！

---

### 实践3: 修改主题颜色

**打开文件**: `app/globals.css`

修改浅色主题的主文字颜色：

```css
:root {
  --text-primary: #1a1a1a; /* 改成更深的黑色 */
}
```

保存后立即看到效果！

---

### 实践4: 添加新的导航链接

**步骤1**: 创建新页面

创建文件 `app/[locale]/about/page.tsx`:

```typescript
import { useTranslations } from "next-intl";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">关于我</h1>
      <p className="mt-4">这是关于页面的内容...</p>
    </div>
  );
}
```

**步骤2**: 添加翻译

在 `messages/zh.json` 添加：

```json
{
  "nav": {
    "home": "首页",
    "blog": "博客",
    "about": "关于" // 新增
  }
}
```

在 `messages/en.json` 添加：

```json
{
  "nav": {
    "about": "About"
  }
}
```

**步骤3**: 添加导航链接

**打开文件**: `components/navigation.tsx`

找到 `navLinks` 数组，添加：

```typescript
const navLinks = [
  { href: `/${locale}`, label: t("home") },
  { href: `/${locale}/blog`, label: t("blog") },
  { href: `/${locale}/about`, label: t("about") }, // 新增
];
```

保存后查看导航栏！

---

## 🎓 进阶学习建议

### 1. 深入理解 Next.js

**推荐顺序**:

1. [Next.js 官方文档](https://nextjs.org/docs)
2. 学习 Server Components vs Client Components
3. 理解 App Router 的数据获取

### 2. 掌握 TypeScript

**学习重点**:

- 接口和类型定义
- 泛型的使用
- 类型推断

### 3. 精通 Tailwind CSS

**实践**:

- 尝试修改现有组件的样式
- 理解响应式设计断点
- 学习自定义配置

### 4. React 进阶

**关键概念**:

- Hooks (useState, useEffect, useRef)
- Context API
- 组件组合模式

---

## 📖 调试技巧

### 技巧1: 使用 console.log

在任何组件中添加：

```typescript
console.log("当前主题:", theme);
console.log("当前语言:", locale);
```

在浏览器按 F12 查看 Console 面板。

### 技巧2: React DevTools

1. 安装 React DevTools 浏览器扩展
2. 打开后可以查看组件树
3. 查看 props 和 state

### 技巧3: 查看网络请求

1. 打开 DevTools → Network 面板
2. 刷新页面
3. 查看加载了哪些资源

---

## ✅ 学习检查清单

完成这些任务，确保你真正理解了项目：

- [ ] 能解释项目的文件夹结构
- [ ] 理解浅色/深色主题如何切换
- [ ] 知道如何添加新的页面
- [ ] 能够添加新的博客文章
- [ ] 理解多语言是如何工作的
- [ ] 能够修改主题颜色
- [ ] 理解瀑布流布局的原理
- [ ] 知道客户端组件和服务端组件的区别
- [ ] 能够添加新的导航链接
- [ ] 理解 TypeScript 的类型定义

---

## 🚀 下一步

当你完成了基础学习，可以尝试：

1. **集成 CMS**: 使用 Contentful 或 Sanity 管理内容
2. **添加评论**: 集成 Giscus 或 Disqus
3. **SEO 优化**: 添加 meta 标签和结构化数据
4. **性能优化**: 使用 Next.js Image 组件
5. **部署上线**: 部署到 Vercel 或 Netlify

---

## 💬 获取帮助

- 查看 `TROUBLESHOOTING.md` 解决常见问题
- 查看 `DEVELOPMENT.md` 了解开发最佳实践
- 搜索相关技术的官方文档

记住：**学习需要时间，不要着急。每次专注理解一个概念！** 🎯

祝学习愉快！✨
