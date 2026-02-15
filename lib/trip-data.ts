/**
 * 博客文章数据类型
 */
export interface TripPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  contentPath?: string; // 可选的 markdown 文件路径
}

/**
 * 示例博客文章数据
 * 实际项目中可以从 CMS、Markdown 文件或数据库获取
 */
// export const tripPosts: TripPost[] = [];
export const tripPosts: TripPost[] = [
  {
    slug: "thailand-trip",
    title: "泰国游记",
    excerpt:
      "记录我在泰国的9天8晚旅行，包括芭提雅、西昌岛、曼谷的精彩行程和实用攻略。",
    date: "2023-04-19",
    readTime: 20,
    tags: ["旅游", "泰国", "攻略"],
    contentPath: "lib/trip/泰国/泰国.md",
  },
  {
    slug: "yunnan-trip",
    title: "云南（大理-丽江-香格里拉-德钦）",
    excerpt: "记录我在云南9天的精彩行程和实用攻略。",
    date: "2022-10-19",
    readTime: 20,
    tags: ["旅游", "云南", "攻略"],
    contentPath: "lib/trip/中国/云南/大理-丽江-香格里拉-德钦.md",
  },
  {
    slug: "yunnan-trip",
    title: "广西（柳州-阳朔-龙脊梯田）",
    excerpt: "记录我在广西的7天行程和实用攻略。",
    date: "2022-10-19",
    readTime: 20,
    tags: ["旅游", "云南", "攻略"],
    contentPath: "lib/trip/中国/广西/柳州-阳朔-龙脊梯田.md",
  },
  {
    slug: "jiangxi-trip",
    title: "江西",
    excerpt: "记录我在江西的7天行程和实用攻略。",
    date: "2022-10-19",
    readTime: 20,
    tags: ["旅游", "江西", "攻略"],
    contentPath: "lib/trip/中国/江西/江西之旅.md",
  },
  {
    slug: "jiangzhehu-trip",
    title: "江浙沪",
    excerpt: "记录我在江浙沪的7天行程和实用攻略。",
    date: "2025-10-09",
    readTime: 20,
    tags: ["旅游", "江浙沪", "攻略"],
    contentPath: "lib/trip/中国/江浙沪/江浙沪之旅.md",
  },
];
