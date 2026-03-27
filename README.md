# Geeki Blog

一个简约风格的个人博客，采用现代化技术栈构建，支持深色模式和多语言切换。

## ✨ 特性

- 🎨 **简约设计**: 清新简约的 UI 设计，注重用户体验
- 🌓 **深色模式**: 支持浅色/深色主题切换
- 🌍 **多语言**: 支持中英文切换
- 📱 **响应式布局**: 完美适配桌面端、平板和移动端
- 🎯 **瀑布流布局**: 博客和项目页面采用响应式瀑布流布局
- ⚡ **性能优化**: 基于 Next.js 14 的服务端渲染和静态生成
- 📝 **TypeScript**: 完整的类型支持，提升代码质量

## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) - React 全栈框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes) - 主题切换
- **国际化**: [next-intl](https://next-intl-docs.vercel.app/) - i18n 解决方案
- **图标**: [Lucide React](https://lucide.dev/) - 精美的图标库
- **代码规范**: ESLint + Prettier

## 📦 安装

### 前置要求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 克隆项目

```bash
git clone <your-repo-url>
cd geeki-blog
```

### 安装依赖

使用 npm:

```bash
npm install
```

使用 yarn:

```bash
yarn install
```

使用 pnpm:

```bash
pnpm install
```

## 🚀 运行

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

默认会重定向到 `/zh` (中文) 或 `/en` (英文)。

### 生产构建

```bash
npm run build
npm run start
```

### 代码格式化

```bash
npm run format
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
geeki-blog/
├── app/                      # Next.js 应用目录
│   ├── [locale]/            # 国际化路由
│   │   ├── layout.tsx       # 语言特定布局
│   │   ├── page.tsx         # 首页
│   │   └── blog/            # 博客页面
│   ├── globals.css          # 全局样式
│   └── layout.tsx           # 根布局
├── components/              # React 组件
│   ├── providers/          # Context 提供者
│   ├── navigation.tsx      # 导航栏
│   ├── theme-toggle.tsx    # 主题切换
│   ├── language-toggle.tsx # 语言切换
│   ├── masonry-grid.tsx    # 瀑布流布局
│   └── blog-card.tsx       # 博客卡片
├── lib/                     # 工具函数和数据
│   ├── utils.ts            # 工具函数
│   └── blog-data.ts        # 博客数据
├── messages/                # 国际化翻译文件
│   ├── zh.json             # 中文翻译
│   └── en.json             # 英文翻译
├── i18n.ts                 # i18n 配置
├── middleware.ts           # Next.js 中间件
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 🎨 主题配色

### 浅色主题

- 背景色: `#FFFFFF`
- 次要背景: `#F8F8F8`
- 主文字: `#333333`
- 次要文字: `#666666`

### 深色主题

- 背景色: `#1A1A1A`
- 次要背景: `#2A2A2A`
- 主文字: `#EFEFEF`
- 次要文字: `#AAAAAA`

所有颜色都定义为 CSS 变量，可在 `app/globals.css` 中自定义。

## 📝 自定义内容

### 修改个人信息

编辑 `app/[locale]/page.tsx` 文件，修改首页的个人介绍内容。

### 添加博客文章

编辑 `lib/blog-data.ts` 文件，在 `blogPosts` 数组中添加新文章：

```typescript
{
  slug: "your-article-slug",
  title: "Your Article Title",
  excerpt: "Article description...",
  date: "2024-01-01",
  readTime: 5,
  tags: ["Tag1", "Tag2"],
}
```

### 修改社交媒体链接

编辑 `components/navigation.tsx` 文件，在 `socialLinks` 数组中修改链接：

```typescript
const socialLinks = [
  {
    href: "https://github.com/your-username",
    icon: Github,
    label: "GitHub",
  },
  // ... 更多链接
];
```

### 添加新语言

1. 在 `messages/` 目录下创建新的 JSON 文件（如 `ja.json`）
2. 在 `i18n.ts` 中的 `locales` 数组添加新语言代码
3. 复制并翻译现有的翻译文件内容

## 🌐 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 并进行部署

### 其他平台

项目可以部署到任何支持 Node.js 的平台：

- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

### 代码 vs 内容

- **代码部分**（组件、样式、配置等）: MIT License - 可以自由使用、修改和分发
- **内容部分**（博客文章、个人介绍等）: 保留所有权利 - 仅供参考，请勿直接复制

如果你要使用这个博客模板，可以：

- ✅ Fork 项目并修改为自己的博客
- ✅ 使用和修改代码结构
- ✅ 用于学习和商业项目
- ❌ 不要直接复制博客内容和个人信息

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- Email: hello@geeki.dev
- GitHub: [@geeki](https://github.com)
- LinkedIn: [Geeki](https://linkedin.com)
