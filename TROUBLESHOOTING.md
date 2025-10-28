# 故障排除指南

## 已修复的问题

### ✅ next-intl 警告信息

**问题描述**:

```
The `locale` parameter in `getRequestConfig` is deprecated
A `locale` is expected to be returned from `getRequestConfig`
```

**解决方案**:
已更新 `i18n.ts` 文件，使用新的 `requestLocale` API 并返回 `locale` 字段。

**修改内容**:

```typescript
// 旧代码
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

// 新代码
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale, // ✅ 现在返回 locale
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

---

## 常见问题

### 1. favicon.ico 404 错误

**问题**: 浏览器请求 favicon 但找不到

**解决方案 A**: 添加 favicon 文件

1. 访问 https://favicon.io/ 生成 favicon
2. 下载 `favicon.ico` 文件
3. 放到 `app/` 目录下

**解决方案 B**: 在 layout 中配置 metadata

```typescript
// app/[locale]/layout.tsx
export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};
```

### 2. 端口被占用

**问题**: `Error: listen EADDRINUSE: address already in use :::3000`

**解决方案**: 使用其他端口

```bash
npm run dev -- -p 3001
```

或者找到并关闭占用 3000 端口的进程：

```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Git Bash
lsof -i :3000
kill -9 <PID>
```

### 3. 模块未找到错误

**问题**: `Module not found: Can't resolve 'xxx'`

**解决方案**:

```bash
# 清除缓存并重新安装
rm -rf node_modules
rm package-lock.json
npm install

# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 4. 样式不生效

**问题**: Tailwind CSS 类名没有应用

**检查清单**:

- [ ] `tailwind.config.ts` 的 `content` 配置正确
- [ ] `app/globals.css` 包含 Tailwind 指令
- [ ] 开发服务器已重启
- [ ] 浏览器缓存已清除

**解决方案**:

```bash
# 重启开发服务器
# Ctrl+C 停止，然后
npm run dev
```

### 5. TypeScript 错误

**问题**: 类型检查错误

**解决方案**:

```bash
# 检查错误
npm run lint

# 如果是依赖问题，重新安装类型定义
npm install --save-dev @types/node @types/react @types/react-dom
```

### 6. 深色模式不工作

**问题**: 主题切换按钮点击无效

**检查清单**:

- [ ] `ThemeProvider` 正确包裹在 layout 中
- [ ] `darkMode: "class"` 在 tailwind.config.ts 中配置
- [ ] CSS 变量在 `globals.css` 中正确定义

**测试方法**:
打开浏览器开发者工具，检查 `<html>` 标签是否有 `class="dark"` 属性。

### 7. 语言切换后 404

**问题**: 切换语言后页面显示 404

**原因**: 中间件配置问题

**检查**:

- `middleware.ts` 的 `matcher` 配置
- `i18n.ts` 的 `locales` 配置
- URL 路径是否正确（应该包含 `/zh` 或 `/en`）

### 8. 图片加载失败

**问题**: 图片显示不出来

**解决方案**:

- 将图片放在 `public/` 目录下
- 使用正确的路径：`/images/photo.jpg`（不需要 `public/` 前缀）
- 如果使用 `next/image`，确保配置了正确的域名

### 9. 构建错误

**问题**: `npm run build` 失败

**常见原因**:

1. TypeScript 类型错误
2. 缺少环境变量
3. 导入路径错误

**解决步骤**:

```bash
# 1. 运行 lint 检查
npm run lint

# 2. 检查 TypeScript 错误
npx tsc --noEmit

# 3. 清除 .next 目录
rm -rf .next
npm run build
```

### 10. 瀑布流布局显示异常

**问题**: 卡片分布不均匀

**原因**: 窗口大小变化时没有重新计算

**解决方案**: 已在 `masonry-grid.tsx` 中添加 resize 监听器，应该自动处理。如果还有问题：

- 刷新页面
- 检查浏览器控制台是否有错误
- 确保内容数量足够（至少 3 个项目）

---

## 性能问题

### 1. 开发服务器启动慢

**优化建议**:

- 关闭不必要的浏览器标签
- 减少文件监听范围
- 使用 SSD 硬盘
- 增加 Node.js 内存限制：
  ```bash
  NODE_OPTIONS=--max_old_space_size=4096 npm run dev
  ```

### 2. 页面加载慢

**检查**:

- 打开浏览器 Network 面板
- 查看哪些资源加载慢
- 考虑使用图片优化

**优化**:

- 使用 Next.js Image 组件
- 启用代码分割
- 减少不必要的依赖

---

## 调试技巧

### 1. 使用 React DevTools

- 安装浏览器扩展
- 查看组件树和 props
- 检查 hooks 状态

### 2. 查看网络请求

- 打开浏览器 DevTools (F12)
- 切换到 Network 面板
- 查看请求和响应

### 3. 控制台调试

```typescript
// 在代码中添加调试信息
console.log("Debug:", variable);
console.table(arrayData);
console.error("Error:", error);
```

### 4. 使用断点

- 在浏览器 DevTools 的 Sources 面板设置断点
- 或在代码中添加 `debugger` 语句

---

## 获取帮助

如果以上方法都无法解决问题：

1. **检查错误信息**: 仔细阅读终端和浏览器控制台的错误信息
2. **查看官方文档**:
   - [Next.js 文档](https://nextjs.org/docs)
   - [next-intl 文档](https://next-intl-docs.vercel.app)
   - [Tailwind CSS 文档](https://tailwindcss.com/docs)
3. **搜索问题**: 在 GitHub Issues 或 Stack Overflow 搜索类似问题
4. **提交 Issue**: 如果是 bug，考虑在相应的 GitHub 仓库提交 issue

---

## 预防措施

### 开发时的最佳实践

1. **频繁保存**: 现代编辑器支持自动保存
2. **及时提交**: 使用 Git 频繁提交代码
3. **运行测试**: 修改后运行 `npm run lint`
4. **清除缓存**: 遇到奇怪问题时先清除缓存
5. **保持更新**: 定期更新依赖（但要测试）

### 代码质量

```bash
# 提交前检查
npm run lint
npm run format
npm run build  # 确保能成功构建
```

---

## 环境要求

确保你的开发环境满足以下要求：

- ✅ Node.js >= 18.0.0
- ✅ npm >= 9.0.0 或 yarn >= 1.22.0
- ✅ 支持 ES6+ 的浏览器
- ✅ 足够的磁盘空间（至少 500MB）
- ✅ 稳定的网络连接（首次安装依赖）

检查版本：

```bash
node --version
npm --version
```

---

## 更新日志

### 2024-03-XX

- ✅ 修复 next-intl 配置警告
- ✅ 更新 i18n.ts 使用新的 requestLocale API
- ✅ 添加 favicon 配置说明

---

祝你开发顺利！如果遇到新的问题，可以更新这个文档。🚀
