# 开发指南

## 🛠️ 开发环境设置

### 必需工具

- Node.js 18+
- npm/yarn/pnpm
- Git
- 代码编辑器 (推荐 VS Code)

### VS Code 推荐扩展

- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Tailwind CSS IntelliSense**: Tailwind 智能提示
- **TypeScript and JavaScript Language Features**: TS 支持

### 环境变量

创建 `.env.local` 文件（可选）：

```env
# 站点 URL (生产环境)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📂 项目结构详解

```
geeki-blog/
├── app/                          # Next.js 应用目录
│   ├── [locale]/                # 国际化动态路由
│   │   ├── layout.tsx           # 语言特定布局
│   │   ├── page.tsx             # 首页
│   │   ├── blog/                # 博客模块
│   │   │   ├── page.tsx         # 博客列表
│   │   │   └── [slug]/          # 博客详情
│   │   │       └── page.tsx
│   │   └── projects/            # 项目模块
│   │       └── page.tsx
│   ├── globals.css              # 全局样式和 CSS 变量
│   ├── layout.tsx               # 根布局
│   └── not-found.tsx            # 404 页面
├── components/                   # React 组件
│   ├── providers/               # Context 提供者
│   │   └── theme-provider.tsx  # 主题提供者
│   ├── navigation.tsx           # 导航栏组件
│   ├── theme-toggle.tsx         # 主题切换按钮
│   ├── language-toggle.tsx      # 语言切换按钮
│   ├── masonry-grid.tsx         # 瀑布流布局组件
│   ├── blog-card.tsx            # 博客卡片组件
│   └── project-card.tsx         # 项目卡片组件
├── lib/                         # 工具和数据
│   ├── utils.ts                # 工具函数
│   ├── blog-data.ts            # 博客数据
│   └── project-data.ts         # 项目数据
├── messages/                    # 国际化翻译
│   ├── zh.json                 # 中文翻译
│   └── en.json                 # 英文翻译
├── i18n.ts                     # i18n 配置
├── middleware.ts               # Next.js 中间件
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖
├── .eslintrc.json              # ESLint 配置
├── .prettierrc                 # Prettier 配置
└── .gitignore                  # Git 忽略文件
```

## 🎨 样式系统

### Tailwind CSS 类名规范

#### 响应式设计

```tsx
// 移动端优先
<div className="text-sm md:text-base lg:text-lg">
  // 小屏幕: text-sm // 中等屏幕: text-base // 大屏幕: text-lg
</div>
```

#### 深色模式

```tsx
<div className="bg-white dark:bg-gray-900">
  // 浅色: 白色背景 // 深色: 灰色背景
</div>
```

#### 自定义颜色变量

```tsx
<div className="text-text-primary bg-background">// 使用自定义的 CSS 变量</div>
```

### CSS 变量使用

在 `app/globals.css` 中定义的变量可以这样使用：

```css
.my-component {
  background-color: var(--bg-color);
  color: var(--text-primary);
  box-shadow: var(--shadow);
}
```

## 🧩 组件开发

### 创建新组件

1. 在 `components/` 目录创建文件
2. 使用 TypeScript 定义 props 接口
3. 添加注释说明组件用途
4. 导出组件

示例：

```typescript
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * 我的自定义组件
 * 用于显示标题和描述
 */
export function MyComponent({
  title,
  description,
  className,
}: MyComponentProps) {
  return (
    <div className={cn("p-4 rounded-lg", className)}>
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}
```

### 客户端组件

如果组件需要使用 React hooks 或浏览器 API，添加 `"use client"` 指令：

```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## 📝 添加内容

### 添加博客文章

编辑 `lib/blog-data.ts`：

```typescript
export const blogPosts: BlogPost[] = [
  // ... 现有文章
  {
    slug: "my-new-post", // URL 路径
    title: "我的新文章", // 标题
    excerpt: "这是文章摘要...", // 摘要
    date: "2024-03-01", // 发布日期
    readTime: 5, // 阅读时间（分钟）
    tags: ["标签1", "标签2"], // 标签
  },
];
```

### 添加项目

编辑 `lib/project-data.ts`：

```typescript
export const projects: Project[] = [
  // ... 现有项目
  {
    id: "my-project", // 唯一 ID
    title: "我的项目", // 项目名称
    description: "项目描述...", // 项目描述
    tags: ["React", "TypeScript"], // 技术栈
    demoUrl: "https://demo.com", // 演示链接（可选）
    githubUrl: "https://github.com/", // 源码链接（可选）
  },
];
```

### 更新翻译

同时更新中英文翻译文件：

**messages/zh.json**:

```json
{
  "mySection": {
    "title": "我的标题",
    "description": "我的描述"
  }
}
```

**messages/en.json**:

```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

在组件中使用：

```typescript
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("mySection");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

## 🎯 常见开发任务

### 1. 修改导航栏

编辑 `components/navigation.tsx`：

```typescript
// 添加新的导航链接
const navLinks = [
  { href: `/${locale}`, label: t("home") },
  { href: `/${locale}/blog`, label: t("blog") },
  { href: `/${locale}/projects`, label: t("projects") },
  { href: `/${locale}/about`, label: t("about") }, // 新增
];
```

### 2. 修改主题颜色

编辑 `app/globals.css`：

```css
:root {
  --bg-color: #ffffff; /* 改为你喜欢的颜色 */
  --text-primary: #333333; /* 改为你喜欢的颜色 */
  /* ... */
}
```

### 3. 添加新页面

1. 创建文件: `app/[locale]/about/page.tsx`
2. 添加页面内容:

```typescript
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      {/* 页面内容 */}
    </div>
  );
}
```

3. 更新翻译文件
4. 添加导航链接

### 4. 修改响应式断点

编辑 `components/masonry-grid.tsx`：

```typescript
const updateColumns = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // 修改断点
    setColumns(1);
  } else if (width < 1280) {
    setColumns(2);
  } else {
    setColumns(3);
  }
};
```

## 🧪 测试和调试

### 检查代码质量

```bash
# ESLint 检查
npm run lint

# 代码格式化
npm run format
```

### 调试技巧

1. **使用 console.log**:

```typescript
console.log("Debug:", variable);
```

2. **React DevTools**:
   - 安装浏览器扩展
   - 查看组件树和 props

3. **Network 面板**:
   - 检查 API 请求
   - 查看资源加载

4. **Lighthouse**:
   - 性能分析
   - SEO 检查
   - 可访问性评分

## 📦 构建和部署

### 本地构建测试

```bash
# 构建生产版本
npm run build

# 运行生产服务器
npm start
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

或通过 Vercel 网站导入 GitHub 仓库。

### 环境变量配置

在 Vercel 项目设置中添加环境变量：

- `NEXT_PUBLIC_SITE_URL`: 你的站点 URL

## 🔍 性能优化建议

### 1. 图片优化

使用 Next.js Image 组件：

```typescript
import Image from "next/image";

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

### 2. 代码分割

动态导入大组件：

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

### 3. 字体优化

使用 next/font：

```typescript
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
```

## 🐛 常见问题解决

### 问题 1: 样式不生效

**原因**: Tailwind 没有扫描到文件
**解决**: 检查 `tailwind.config.ts` 的 `content` 配置

### 问题 2: 翻译不显示

**原因**: 翻译键不匹配
**解决**: 检查 JSON 文件的键名和代码中的使用

### 问题 3: 主题切换不工作

**原因**: 组件没有正确包裹在 ThemeProvider 中
**解决**: 检查布局文件中的 ThemeProvider

### 问题 4: 构建错误

**原因**: TypeScript 类型错误
**解决**: 运行 `npm run lint` 查看具体错误

## 📚 参考资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app)

## 💡 开发技巧

1. **使用快捷键**: 熟悉编辑器快捷键提升效率
2. **组件复用**: 抽取可复用的组件避免重复代码
3. **类型定义**: 充分利用 TypeScript 的类型系统
4. **Git 提交**: 频繁提交，保持提交信息清晰
5. **代码审查**: 提交前检查代码质量和格式

祝开发顺利！🚀
