### Geeki Blog SEO 优化说明

> 本文档记录了在现有项目基础上完成的 SEO 优化项，方便后期维护、排查，或在简历 / 项目说明中展示。

---

## 1. 全局站点信息（`app/layout.tsx`）

- **站点基础 Metadata**
  - 配置 `metadataBase`，使用环境变量 `NEXT_PUBLIC_SITE_URL`，默认 `https://geekiblog.vercel.app`。
  - 设置全局标题模板：
    - `title.default`: `Geeki's Blog`
    - `title.template`: `"%s | Geeki's Blog"`
  - 设置全局 `description`，内容覆盖中英文个人定位与博客主题。
  - 声明 `authors`、`creator` 信息。
- **社交分享基础信息**
  - 配置全局 `openGraph.siteName = "Geeki's Blog"`。
  - 配置全局 `twitter.card = "summary_large_image"`，为后续页面级配置提供默认值。

---

## 2. 多语言与 hreflang（`app/[locale]/layout.tsx`）

- **多语言版本声明**
  - 在 locale layout 中新增 `generateMetadata`：
    - 通过 `alternates.languages` 指出：
      - `zh: {SITE_URL}/zh`
      - `en: {SITE_URL}/en`
      - `x-default: {SITE_URL}/zh`
  - 作用：
    - 告诉搜索引擎 `/zh` 与 `/en` 是同一站点的不同语言版本。
    - 避免中英文页面互相「抢排名」，提高多语言 SEO 表现。

---

## 3. 首页 SEO（`app/[locale]/page.tsx`）

- **动态页面 Metadata**
  - 新增 `generateMetadata({ params: { locale } })`：
    - 根据 `locale` 输出：
      - 中文：标题「首页」、描述「你好，我是 Geeki，热爱技术、旅游与生活的前端开发工程师」。
      - 英文：标题「Home」、描述「Hi, I'm Geeki — a frontend developer passionate about tech, travel & life」。
  - 设置：
    - `alternates.canonical = {SITE_URL}/{locale}`。
    - `openGraph`：
      - `title`: 对应中英文「Geeki 的博客 / Geeki's Blog」。
      - `description`: 与当前语言描述保持一致。
      - `url`: 对应语言首页 URL。

---

## 4. 文章列表页 SEO（`app/[locale]/articles/page.tsx`）

- **渲染策略优化**
  - 删除原来的 `export const dynamic = "force-dynamic"`。
  - 改为使用增量静态再生成（ISR）：
    - `export const revalidate = 60;`
  - 好处：
    - 构建时可预渲染文章列表，提高首屏性能。
    - 每 60 秒自动刷新缓存，兼顾数据新鲜度与性能，对搜索引擎更友好。

- **列表页 Metadata**
  - 新增 `generateMetadata({ params: { locale } })`：
    - 标题：
      - 中文：「文章」
      - 英文：「Articles」
    - 描述：
      - 中文：「博客、旅游、摄影，记录生活的每一面」
      - 英文：「Blog, travel, photography — capturing every side of life」
  - 设置：
    - `alternates.canonical = {SITE_URL}/{locale}/articles`。
    - `openGraph`：
      - `title`: 「文章 | Geeki's Blog / Articles | Geeki's Blog」。
      - `description`: 同上。
      - `url`: 对应语言文章列表页 URL。

---

## 5. 文章详情页 SEO（`app/[locale]/articles/[slug]/page.tsx`）

- **文章级动态 Metadata**
  - 新增 `getArticleMeta(slug)`，只查询必要元信息：
    - `title`, `excerpt`, `tags`, `cover_image`, `created_at`, `updated_at`, `category`, `slug` 等。
  - 新增 `generateMetadata({ params: { locale, slug } })`：
    - `title`: 使用文章标题。
    - `description`: 使用文章摘要 `excerpt`。
    - `alternates.canonical`: `{SITE_URL}/{locale}/articles/{slug}`。
    - `openGraph`：
      - `type: "article"`。
      - `title`, `description`：来自文章数据。
      - `url`: 文章完整 URL。
      - `publishedTime`, `modifiedTime`：对应文章创建 / 更新日期。
      - `tags`: 使用文章标签。
      - `images`: 若文章配置了 `cover_image`，则加入为分享卡片的预览图。
    - `twitter`：
      - `card`: 有封面图时使用 `"summary_large_image"`，否则 `"summary"`。
      - `title`, `description`, `images`: 同步自文章数据。

- **结构化数据：JSON-LD（BlogPosting）**
  - 在页面组件 `return` 中插入：
    - `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />`
  - `jsonLd` 结构为：
    - `@context: "https://schema.org"`
    - `@type: "BlogPosting"`
    - `headline`: 文章标题。
    - `description`: 文章摘要。
    - `datePublished` / `dateModified`: 对应文章创建与更新时间。
    - `author`: 固定为 `Person`，名称 `Geeki`。
    - `image`: 若存在封面图则加入。
    - `url`: 当前文章的完整 URL。
    - `keywords`: 将文章标签 `tags` 拼接为字符串。
  - 作用：
    - 帮助搜索引擎识别页面为博客文章，提高「富结果（Rich Results）」触发概率。

> 说明：文章详情页暂时保留 `export const dynamic = "force-dynamic"`，便于始终获取最新评论；未来可视情况改为带 `revalidate` 的 ISR。

---

## 6. 简历页 SEO（`app/[locale]/resume/page.tsx`）

- **渲染策略调整**
  - 移除 `export const dynamic = "force-dynamic"`，使用默认静态渲染。

- **简历页 Metadata**
  - 新增 `generateMetadata({ params: { locale } })`：
    - 标题：
      - 中文：「简历」
      - 英文：「Resume」
    - 描述：
      - 中文：强调「黄梓杰的个人简历 — 前端开发工程师，3 年港澳 Web / App 开发经验」。
      - 英文：对应英文版经验描述。
  - 设置：
    - `alternates.canonical = {SITE_URL}/{locale}/resume`。
    - `openGraph`：
      - `title`: 「简历 | Geeki's Blog / Resume | Geeki's Blog」。
      - `description`: 同上。
      - `url`: 对应语言简历页 URL。

---

## 7. 项目页 SEO（`app/[locale]/projects/page.tsx`）

- **项目页 Metadata**
  - 新增 `generateMetadata({ params: { locale } })`：
    - 标题：
      - 中文：「项目」
      - 英文：「Projects」
    - 描述：
      - 中文：「我的开源项目与作品集」
      - 英文：「My open source projects and portfolio」
  - 设置：
    - `alternates.canonical = {SITE_URL}/{locale}/projects`。
    - `openGraph`：
      - `title`: 「项目 | Geeki's Blog / Projects | Geeki's Blog」。
      - `description`: 同上。
      - `url`: 对应语言项目页 URL。

---

## 8. 全站 Sitemap（`app/sitemap.ts`）

- **自动生成 `/sitemap.xml`**
  - 使用 `MetadataRoute.Sitemap` 导出 `sitemap()` 函数，让 Next.js 自动在构建 / 请求时生成站点地图。
  - 内容包括：
    - **静态页面**（按语言展开）：
      - `/{locale}`（首页）
      - `/{locale}/articles`（文章列表）
      - `/{locale}/projects`（项目页）
      - `/{locale}/resume`（简历页）
    - 为每个静态路径配置：
      - `lastModified`: 当前时间。
      - `changeFrequency`: 不同页面设置为 `monthly` / `daily` 等。
      - `priority`: 首页最高，其次文章列表，再是项目与简历。
    - **动态文章页面**：
      - 从 Supabase 的 `article` 表查询已发布文章（`published = true`），读取 `slug` 和 `updated_at`。
      - 为每篇文章生成：
        - `/{locale}/articles/{slug}`（中英两种语言）。
        - `lastModified`: 使用数据库中的 `updated_at`。
        - `changeFrequency`: `weekly`。
        - `priority`: 0.8。
  - 作用：
    - 让搜索引擎系统性地发现所有重要页面与文章。
    - 利用更新时间优化爬取策略，提升收录效率。

---

## 9. robots.txt（`app/robots.ts`）

- **自动生成 `/robots.txt`**
  - 使用 `MetadataRoute.Robots` 导出 `robots()`：
    - 对所有搜索引擎（`userAgent: "\*"）：
      - `allow: "/"`，允许抓取前台内容。
      - `disallow: ["/admin/", "/api/"]`，禁止抓取后台管理与接口路由。
    - 设置：
      - `sitemap: {SITE_URL}/sitemap.xml`
  - 作用：
    - 保护管理后台与 API，不被搜索引擎索引。
    - 明确提供 sitemap 地址，方便搜索引擎高效抓取。

---

## 10. 性能与索引友好性的小结

- **动态 -> ISR 或静态**
  - 文章列表页由 `force-dynamic` 改为 `revalidate = 60`（ISR），兼顾性能与数据时效。
  - 简历页 / 项目页 / 首页保持静态渲染或轻量数据读取，提高首屏速度。
- **统一 Metadata 管理**
  - 根布局配置全局默认信息，各页面通过 `generateMetadata` 延伸具体内容：
    - 标题统一走模板 `"%s | Geeki's Blog"`。
    - 描述围绕「前端开发 + 技术 / 旅游 / 生活 / 项目 / 简历」展开。
  - 多语言 hreflang、canonical、Open Graph、Twitter 卡片、JSON-LD 一起配合，整体提升搜索表现与分享体验。

---

## 11. 可以写进简历 / 项目说明的简短描述参考

- 「为个人博客实现了系统化的 SEO 优化，包括 Next.js App Router 的动态 `generateMetadata`、多语言 `hreflang`、文章级 Open Graph 与 Twitter Card、BlogPosting JSON-LD 结构化数据、自动生成 sitemap.xml 与 robots.txt，并通过 ISR 提升首屏性能与搜索引擎抓取效率。」
