# Vercel 部署 Markdown 文件读取问题修复

## 问题描述

在 Vercel 上部署 Next.js 应用时，`lib/trip/泰国/泰国.md` 等 markdown 文件无法被正确读取。

## 根本原因

### 1. Vercel Serverless 函数限制

- Vercel 使用 serverless 函数运行 Next.js
- 默认情况下，只有必要的构建输出被包含在函数包中
- `lib/trip/` 目录下的 markdown 文件可能不会被自动包含

### 2. 静态生成 vs 运行时

- **构建时**：文件读取成功（本地可以正常生成）
- **运行时**：如果页面需要重新生成（ISR），文件可能不存在

## 解决方案

我们实施了双保险策略：

### 方案 A：Next.js 配置文件

**文件：`next.config.js`**

```javascript
experimental: {
  outputFileTracingIncludes: {
    "/[locale]/blog/[slug]": ["./lib/trip/**/*"],
  },
}
```

✅ 使用 Next.js 的 `outputFileTracingIncludes` 配置
✅ 告诉 Vercel 在部署博客详情页时包含 `lib/trip/` 目录
✅ 这是官方推荐的方式，确保所有 markdown 和图片文件被包含

### 方案 B：专用 Markdown 加载器

**文件：`lib/markdown-loader.ts`**

创建了一个专门的 markdown 加载器，具有：

- ✅ 更好的错误处理
- ✅ 统一的加载逻辑
- ✅ 详细的错误日志

### 方案 C：改进的页面代码

**文件：`app/[locale]/blog/[slug]/page.tsx`**

- 使用专用加载器而不是直接使用 `fs`
- 添加了友好的错误提示
- 确保在构建时内容被嵌入到静态页面中

## 工作原理

### 构建时（Build Time）

1. Next.js 执行 `generateStaticParams()` 生成所有文章路由
2. 对每个路由，执行页面组件代码
3. `loadMarkdownContent()` 读取 markdown 文件
4. 内容被嵌入到生成的 HTML 中
5. 文件通过 `outputFileTracingIncludes` 被包含在部署包中

### 运行时（Runtime）

1. 如果页面已预生成，直接返回静态 HTML
2. 如果需要重新生成（如 ISR）：
   - 从文件系统读取 markdown（通过 `outputFileTracingIncludes` 确保文件存在）
   - 如果失败，显示友好的错误消息

## 验证步骤

### 1. 本地测试

```bash
# 清理缓存
rm -rf .next

# 构建
npm run build

# 运行生产构建
npm run start

# 访问：http://localhost:3000/zh/blog/thailand-trip
```

### 2. 部署到 Vercel

```bash
git add .
git commit -m "fix: 修复 Vercel 上 markdown 文件读取问题"
git push
```

### 3. 检查部署日志

- 访问 Vercel Dashboard
- 查看 Build Logs，确认没有文件读取错误
- 访问线上 URL，确认文章内容正常显示

## 如果仍然失败

如果部署后仍然看不到内容，请检查：

### 1. 查看 Vercel 函数日志

```bash
vercel logs [your-deployment-url]
```

### 2. 检查构建输出

在 Vercel Dashboard 的 Build Logs 中搜索：

- "Error loading markdown content"
- markdown 文件路径

### 3. 验证文件是否被包含

在 Vercel Dashboard 的 "Source" 标签中检查部署包是否包含 `lib/trip/` 文件

### 4. 检查 Next.js 配置

确认 `next.config.js` 中的 `outputFileTracingIncludes` 配置正确

## 备选方案（如果上述方案都失败）

### 方案 D：将 Markdown 内容移到 Public 目录

```bash
# 将 markdown 文件移动到 public
mv lib/trip public/content

# 通过 HTTP 请求获取内容
fetch('/content/泰国/泰国.md')
```

### 方案 E：使用环境变量或数据库

- 将 markdown 内容存储在环境变量中
- 或使用 Vercel KV / PostgreSQL 存储内容

## 额外优化建议

### 1. 启用增量静态再生成（ISR）

```typescript
export const revalidate = 3600; // 1小时重新验证一次
```

### 2. 添加缓存

```typescript
// 缓存 markdown 内容
const markdownCache = new Map<string, string>();
```

### 3. 使用 CDN

将图片上传到 Vercel Blob 或其他 CDN 服务

## 总结

通过以上修复，您的 Vercel 部署应该能够：

- ✅ 在构建时正确读取所有 markdown 文件
- ✅ 在运行时也能访问文件（通过 `vercel.json` 配置）
- ✅ 提供友好的错误提示（如果仍然失败）

记住：**重新部署**是必需的，只有在新的部署中这些更改才会生效。
