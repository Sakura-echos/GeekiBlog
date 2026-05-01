export interface KnowledgeItem {
  slug: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  tagsZh: string[];
  tagsEn: string[];
  icon: string;
  steps: number;
}

export interface KnowledgeCategory {
  id: string;
  nameZh: string;
  nameEn: string;
  emoji: string;
  items: KnowledgeItem[];
}

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
        tagsZh: ["6 步动画", "树结构可视化", "代码高亮"],
        tagsEn: ["6-step animation", "tree visualization", "code highlight"],
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
