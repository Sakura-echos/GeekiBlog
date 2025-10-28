# 快速开始指南

## 🚀 快速运行项目

### 1. 安装依赖

在项目根目录打开命令行（Windows 可以使用 Git Bash 或 PowerShell），运行：

```bash
npm install
```

这将安装所有必需的依赖包。安装过程可能需要几分钟。

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问应用

在浏览器中打开：

- 中文版: [http://localhost:3000/zh](http://localhost:3000/zh)
- 英文版: [http://localhost:3000/en](http://localhost:3000/en)

直接访问 [http://localhost:3000](http://localhost:3000) 会自动重定向到中文版。

## 📱 查看效果

### 首页

- 访问 `/zh` 或 `/en` 查看个人介绍页面
- 点击右上角的月亮/太阳图标切换深色/浅色主题
- 点击地球图标切换中英文

### 博客页面

- 访问 `/zh/blog` 或 `/en/blog`
- 查看瀑布流布局的文章列表
- 点击任意文章卡片可以查看文章详情

### 项目页面

- 访问 `/zh/projects` 或 `/en/projects`
- 查看瀑布流布局的项目展示

## 🎨 自定义内容

### 修改个人信息

编辑以下文件来自定义你的个人信息：

1. **首页内容**: `app/[locale]/page.tsx`
2. **导航栏链接**: `components/navigation.tsx`
3. **博客文章**: `lib/blog-data.ts`
4. **项目信息**: `lib/project-data.ts`

### 修改社交媒体链接

在 `components/navigation.tsx` 文件中找到 `socialLinks` 数组：

```typescript
const socialLinks = [
  {
    href: "https://github.com/你的用户名", // 修改为你的 GitHub
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/你的用户名", // 修改为你的 LinkedIn
    icon: Linkedin,
    label: "LinkedIn",
  },
];
```

### 修改翻译文本

- 中文翻译: `messages/zh.json`
- 英文翻译: `messages/en.json`

## 🎯 测试响应式布局

### 在浏览器中测试

1. 按 `F12` 打开开发者工具
2. 点击设备工具栏图标（或按 `Ctrl+Shift+M`）
3. 选择不同的设备预设（iPhone、iPad 等）
4. 查看瀑布流布局在不同屏幕尺寸下的表现

### 断点说明

- 移动端（< 640px）：1列布局
- 平板端（640px - 1024px）：2列布局
- 桌面端（> 1024px）：3列布局

## 🔧 常见问题

### 问题 1: 安装依赖失败

**解决方案**:

- 确保 Node.js 版本 >= 18
- 尝试清除缓存: `npm cache clean --force`
- 删除 `node_modules` 文件夹和 `package-lock.json`，重新运行 `npm install`

### 问题 2: 端口被占用

如果 3000 端口被占用，可以指定其他端口：

```bash
npm run dev -- -p 3001
```

### 问题 3: 样式没有生效

确保 Tailwind CSS 正确配置：

- 检查 `tailwind.config.ts` 文件是否存在
- 确认 `app/globals.css` 包含了 Tailwind 的指令

## 📦 生产构建

### 构建项目

```bash
npm run build
```

### 运行生产版本

```bash
npm start
```

生产版本会在 [http://localhost:3000](http://localhost:3000) 运行。

## 🎨 主题颜色自定义

所有主题颜色都定义在 `app/globals.css` 文件中。

### 修改浅色主题颜色

找到 `:root` 部分：

```css
:root {
  --bg-color: #ffffff; /* 修改背景色 */
  --text-primary: #333333; /* 修改主文字颜色 */
  /* ... 更多颜色 */
}
```

### 修改深色主题颜色

找到 `.dark` 部分：

```css
.dark {
  --bg-color: #1a1a1a; /* 修改深色背景 */
  --text-primary: #efefef; /* 修改深色主文字 */
  /* ... 更多颜色 */
}
```

## 🌐 部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. Vercel 会自动检测 Next.js 并配置构建设置
6. 点击 "Deploy"

部署完成后，Vercel 会提供一个 URL 访问你的博客。

## 📝 下一步

- [ ] 添加更多博客文章
- [ ] 添加你的真实项目
- [ ] 自定义主题颜色
- [ ] 修改社交媒体链接
- [ ] 添加更多页面（如 About、Contact）
- [ ] 集成真实的 CMS（如 Contentful、Sanity）
- [ ] 添加评论功能
- [ ] 添加文章搜索功能

## 💡 提示

- 修改代码后，开发服务器会自动重新加载
- 使用 `npm run format` 格式化代码
- 使用 `npm run lint` 检查代码质量
- 查看浏览器控制台的错误信息来调试问题

祝你使用愉快！🎉
