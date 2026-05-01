# Knowledge 模块设计规格

**日期**：2026-05-01  
**状态**：已批准

---

## 一、目标

在现有 Home / Articles / Resume 基础上，新增 **Knowledge** 模块。该模块以可视化动画演示前端技术原理（首个知识点：React Diff 算法），让访问者通过交互式步进演示深入理解底层实现。

---

## 二、布局方案（C2）

### 列表页 `/[locale]/knowledge`

```
┌──────────────────────────────────────────────┐
│  导航栏（复用现有 Navigation 组件）              │
├────────────┬─────────────────────────────────┤
│            │  React                          │
│  ⚛ React  │  React 核心原理，通过动画可视化    │
│  🟡 JS    │  ┌─────────────────────────────┐ │
│  📱 RN    │  │ 🌳  Diff 算法原理            │ │
│  🎨 CSS   │  │    描述 · 标签               │ │
│           │  └─────────────────────────────┘ │
└────────────┴─────────────────────────────────┘
```

- **左侧**：固定分类侧边栏，宽 200px，含分类 emoji + 名称 + 知识点数量徽章
- **右侧**：当前分类的知识点列表，含图标、标题、描述、标签（步骤数 / 动画类型）
- 点击知识点跳转到演示路由

### 演示页 `/[locale]/knowledge/[slug]`

```
┌──────────────────────────────────────────────────┐
│  ← 返回   ⚛ React › Diff 算法原理                 │
├──────────┬──────────────────────────┬─────────────┤
│          │                          │             │
│ 步骤导航 │    可视化动画区域          │  代码面板   │
│ (竖排)  │    (animate.css 驱动)    │  (代码高亮) │
│          │                          │             │
├──────────┴──────────────────────────┴─────────────┤
│  ← 上一步        ●●○○○○        下一步 →           │
└──────────────────────────────────────────────────┘
```

- **左列**：步骤导航（竖排），可点击跳转，已完成步骤显示绿色 ✓
- **中列**：知识点专属可视化组件，animate.css 驱动入场/切换动画
- **右列**：对应步骤的代码高亮面板（固定 300px）
- **底部**：上一步 / 下一步按钮 + 进度圆点

---

## 三、数据结构

知识点元数据**硬编码**在 `lib/knowledge-data.ts`，**不走数据库**。每个知识点的演示内容写在独立的 React 组件中。

```typescript
// lib/knowledge-data.ts
export type KnowledgeItem = {
  slug: string;          // URL slug，如 "react-diff"
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  tags: string[];        // 如 ["6 步动画", "树结构可视化"]
  icon: string;          // emoji
  steps: number;         // 步骤总数
};

export type KnowledgeCategory = {
  id: string;            // 如 "react"
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
        descZh: "React 如何高效对比新旧 Virtual DOM？理解三大假设、同层比较策略与 key 的关键作用。",
        descEn: "How React efficiently diffs Virtual DOM trees. Understanding the three assumptions, same-level comparison, and the role of keys.",
        tags: ["6 步动画", "树结构可视化", "代码高亮"],
        icon: "🌳",
        steps: 6,
      },
    ],
  },
  { id: "javascript", nameZh: "JavaScript", nameEn: "JavaScript", emoji: "🟡", items: [] },
  { id: "react-native", nameZh: "React Native", nameEn: "React Native", emoji: "📱", items: [] },
  { id: "css", nameZh: "CSS", nameEn: "CSS", emoji: "🎨", items: [] },
];
```

---

## 四、文件结构

```
app/[locale]/knowledge/
  page.tsx                      # 列表页（Server Component）
  [slug]/
    page.tsx                    # 演示路由页（Server Component，渲染对应演示）

components/knowledge/
  knowledge-layout.tsx          # C2 双栏布局（Client）
  knowledge-sidebar.tsx         # 左侧分类侧边栏（Client）
  knowledge-list.tsx            # 右侧知识点列表（Client）
  knowledge-card.tsx            # 单个知识点卡片
  demo-shell.tsx                # 演示页外壳（顶栏 + 步骤导航 + 底部控制）
  step-player.tsx               # 步进控制逻辑（useStepPlayer hook）
  demos/
    react-diff/
      index.tsx                 # React Diff 演示入口（注册 6 个步骤）
      step-1-vdom.tsx           # 什么是 Virtual DOM
      step-2-same-level.tsx     # 同层比较策略（animate.css 树动画）
      step-3-type-diff.tsx      # 类型不同直接替换
      step-4-key.tsx            # key 的作用
      step-5-list-diff.tsx      # 列表 Diff 优化
      step-6-summary.tsx        # 完整流程回顾（代码总览）
    _registry.ts                # { slug → 演示组件 } 映射表

lib/
  knowledge-data.ts             # 知识点元数据
```

---

## 五、React Diff 演示内容规划（6 步）

| 步骤 | 标题 | 可视化方式 | 动画技术 |
|------|------|-----------|---------|
| 1 | 什么是 Virtual DOM | JS 对象 ↔ DOM 树对比图 | animate.css `fadeInDown` |
| 2 | 同层比较策略 | 新旧树节点颜色对比（绿=复用，红=销毁，橙=新增） | animate.css `fadeInDown` + `shakeX` + `bounceIn` |
| 3 | 类型不同直接替换 | `<div>` → `<span>` 动画替换 | animate.css `flipOutX` / `flipInX` |
| 4 | key 的作用 | 无 key vs 有 key 的列表 reorder 对比 | animate.css `slideInLeft` + 位置交换 |
| 5 | 列表 Diff 优化 | 双指针扫描动画（头头/尾尾/头尾/key 映射） | CSS position transition + animate.css `fadeIn` |
| 6 | 完整流程回顾 | 代码路径高亮 + 流程图 | animate.css `fadeIn` 逐行高亮 |

每个步骤组件接收 `{ isActive: boolean; direction: "forward" | "backward" }` props，`isActive` 为 true 时触发入场动画类。

---

## 六、依赖

| 包 | 用途 | 安装方式 |
|----|------|---------|
| `animate.css` | 节点入场/切换动画 | `npm install animate.css` |
| `react-syntax-highlighter` | 代码面板语法高亮 | `npm install react-syntax-highlighter @types/react-syntax-highlighter` |

---

## 七、导航栏 & i18n 更新

- `components/navigation.tsx`：navLinks 数组新增 `{ href: '/${locale}/knowledge', label: t('knowledge') }`
- `messages/zh.json`：`"nav": { ..., "knowledge": "知识库" }`
- `messages/en.json`：`"nav": { ..., "knowledge": "Knowledge" }`

---

## 八、主题规范

- 完全复用现有 CSS 变量：`--bg-color`、`--secondary-bg`、`--text-primary`、`--text-secondary`、`--border-color`
- 演示页可视化中的状态色：
  - 复用节点：`#22c55e`（绿）
  - 销毁节点：`#ef4444`（红）
  - 新增节点：`#f59e0b`（橙）
  - 这三种颜色**仅出现在演示可视化区域**，不影响整体 UI 风格

---

## 九、路由与 i18n

- 遵循现有 `app/[locale]/` 结构
- 演示路由：`/zh/knowledge/react-diff`、`/en/knowledge/react-diff`
- `generateStaticParams` 根据 `KNOWLEDGE_CATEGORIES` 生成所有 slug

---

## 十、不在本次范围内

- 后台管理界面
- 搜索功能
- 用户评论 / 收藏
- 移动端侧边栏折叠（下一个知识点迭代时处理）
