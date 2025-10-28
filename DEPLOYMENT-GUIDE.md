# 🚀 部署指南 - 将你的博客发布到互联网

本指南将手把手教你如何将这个 Next.js 博客项目部署到网上，完全免费！

## 📋 目录

1. [部署前准备](#部署前准备)
2. [方案一：使用 Vercel 部署（推荐）](#方案一使用-vercel-部署推荐)
3. [方案二：使用 Netlify 部署](#方案二使用-netlify-部署)
4. [部署后配置](#部署后配置)
5. [常见问题](#常见问题)

---

## 部署前准备

### 1. 确保代码已上传到 Git 仓库

你需要先将代码上传到 GitHub、GitLab 或 Bitbucket。这里以 GitHub 为例：

#### 如果你还没有 GitHub 账号：

1. 访问 [https://github.com](https://github.com)
2. 点击右上角 "Sign up" 注册账号
3. 按照提示完成注册

#### 创建新仓库并上传代码：

1. 登录 GitHub 后，点击右上角 "+" → "New repository"
2. 填写仓库信息：
   - Repository name: `geeki-blog` (或你喜欢的名字)
   - Description: "My personal blog built with Next.js"
   - 选择 **Public** (公开) 或 **Private** (私有，Vercel 都支持)
3. 点击 "Create repository"

4. 在你的项目目录下，打开终端/命令行，执行：

```bash
# 初始化 git 仓库（如果还没有的话）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: My blog is ready to deploy"

# 连接到 GitHub 仓库（替换成你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/geeki-blog.git

# 推送代码
git branch -M main
git push -u origin main
```

### 2. 测试本地构建

在部署之前，确保项目可以正常构建：

```bash
# 安装依赖（如果还没安装）
npm install

# 本地构建测试
npm run build

# 测试生产环境
npm run start
```

如果构建成功，你就可以开始部署了！

---

## 方案一：使用 Vercel 部署（推荐）⭐

Vercel 是 Next.js 的官方推荐平台，部署速度快、配置简单、完全免费。

### 步骤 1：注册 Vercel 账号

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 "Sign Up"
3. **选择 "Continue with GitHub"** (用 GitHub 账号登录，这样最方便)
4. 授权 Vercel 访问你的 GitHub 账号

### 步骤 2：导入项目

1. 登录后，点击右上角 "Add New..." → "Project"
2. 你会看到你的 GitHub 仓库列表
3. 找到你的 `geeki-blog` 项目，点击 "Import"

### 步骤 3：配置项目

Vercel 会自动检测到这是 Next.js 项目，大部分配置都会自动完成：

- **Framework Preset**: Next.js （已自动选择）
- **Root Directory**: `./` （保持默认）
- **Build Command**: `npm run build` （已自动填写）
- **Output Directory**: `.next` （已自动填写）
- **Install Command**: `npm install` （已自动填写）

你不需要修改任何配置！

### 步骤 4：部署

1. 直接点击底部的 **"Deploy"** 按钮
2. 等待 1-3 分钟，Vercel 会自动：
   - 安装依赖
   - 构建项目
   - 部署到全球 CDN

### 步骤 5：访问你的网站 🎉

部署成功后，你会看到：

- 🎊 庆祝动画
- 你的网站地址，类似：`https://geeki-blog-xxx.vercel.app`
- 点击 "Visit" 或直接访问链接，就能看到你的博客了！

### 步骤 6：自动部署（额外福利）

每次你向 GitHub 推送新代码时，Vercel 会自动重新部署！

```bash
# 修改代码后
git add .
git commit -m "Update blog content"
git push

# Vercel 会自动检测并重新部署，无需手动操作！
```

---

## 方案二：使用 Netlify 部署

Netlify 也是一个优秀的免费托管平台，界面友好。

### 步骤 1：注册 Netlify 账号

1. 访问 [https://netlify.com](https://netlify.com)
2. 点击 "Sign up" → "Continue with GitHub"
3. 授权 Netlify 访问你的 GitHub

### 步骤 2：创建新站点

1. 点击 "Add new site" → "Import an existing project"
2. 选择 "Deploy with GitHub"
3. 选择你的 `geeki-blog` 仓库

### 步骤 3：配置构建设置

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`

点击 "Deploy site"！

### 步骤 4：访问你的网站

部署完成后，你会得到一个类似 `https://xxx.netlify.app` 的地址。

---

## 部署后配置

### 自定义域名（可选）

如果你想要自己的域名（如 `www.geeki.com`），而不是 `xxx.vercel.app`：

#### 在 Vercel 中配置：

1. 在项目页面，点击 "Settings" → "Domains"
2. 输入你的域名（需要先购买域名）
3. 按照提示配置 DNS 记录

#### 购买域名的地方：

- 国内：阿里云（[www.aliyun.com](https://www.aliyun.com)）、腾讯云
- 国外：Namecheap、GoDaddy、Cloudflare

### 环境变量（如果需要）

如果你的项目需要环境变量（如 API 密钥）：

1. 在 Vercel 项目页面，点击 "Settings" → "Environment Variables"
2. 添加你的环境变量
3. 重新部署项目

---

## 常见问题

### Q1: 部署失败了怎么办？

**检查构建日志**：

- 在 Vercel/Netlify 的部署页面，点击失败的部署
- 查看详细的错误日志
- 通常是依赖问题或构建错误

**常见解决方案**：

```bash
# 1. 确保本地可以构建成功
npm run build

# 2. 清除缓存后重试
rm -rf node_modules .next
npm install
npm run build
```

### Q2: 部署成功但网站显示错误

**检查是否使用了环境变量**：

- 如果项目需要环境变量，记得在 Vercel 设置中添加

**检查路由配置**：

- 确保 `next.config.js` 配置正确

### Q3: 部署后如何更新内容？

非常简单！

```bash
# 1. 修改你的代码或内容
# 2. 提交并推送到 GitHub
git add .
git commit -m "Update content"
git push

# 3. Vercel 会自动检测并重新部署（无需手动操作）
```

### Q4: 网站加载速度慢怎么办？

Vercel 和 Netlify 都使用全球 CDN，速度应该很快。如果慢：

1. **检查图片大小**：压缩大图片
2. **使用 Next.js Image 组件**：自动优化图片
3. **启用缓存**：Vercel 默认已启用

### Q5: 免费额度够用吗？

对于个人博客，完全够用！

**Vercel 免费版限制**：

- ✅ 无限带宽
- ✅ 100 GB 带宽/月
- ✅ 自动 HTTPS
- ✅ 自定义域名
- ✅ 适合个人项目和小型网站

**Netlify 免费版限制**：

- ✅ 100 GB 带宽/月
- ✅ 300 分钟构建时间/月
- ✅ 自动 HTTPS
- ✅ 自定义域名

---

## 🎉 完成！

恭喜你！你的博客已经在互联网上了！

**接下来可以做什么**：

1. ✍️ 开始写博客文章（编辑 `lib/blog-data.ts`）
2. 🎨 自定义样式和内容
3. 📱 分享你的网站链接给朋友
4. 🔍 提交到 Google Search Console，让搜索引擎收录
5. 📊 添加 Google Analytics 跟踪访问数据

---

## 需要帮助？

如果遇到问题：

1. 查看 Vercel 文档：[https://vercel.com/docs](https://vercel.com/docs)
2. 查看 Next.js 文档：[https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
3. 检查项目中的其他文档：`README.md`, `TROUBLESHOOTING.md`

祝你部署顺利！🚀
