/**
 * 博客文章数据类型
 */
export interface BlogPost {
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
// export const blogPosts: BlogPost[] = [];
export const blogPosts: BlogPost[] = [
  // {
  //   slug: "thailand-trip",
  //   title: "泰国游记",
  //   excerpt:
  //     "记录我在泰国的9天8晚旅行，包括芭提雅、西昌岛、曼谷的精彩行程和实用攻略。",
  //   date: "2023-04-19",
  //   readTime: 20,
  //   tags: ["旅游", "泰国", "攻略"],
  //   contentPath: "lib/trip/泰国/泰国.md",
  // },
  // {
  //   slug: "yunnan-trip",
  //   title: "云南（大理-丽江-香格里拉-德钦）",
  //   excerpt: "记录我在云南9天的精彩行程和实用攻略。",
  //   date: "2022-10-19",
  //   readTime: 20,
  //   tags: ["旅游", "云南", "攻略"],
  //   contentPath: "lib/trip/中国/云南/大理-丽江-香格里拉-德钦.md",
  // },
  // {
  //   slug: "yunnan-trip",
  //   title: "广西（柳州-阳朔-龙脊梯田）",
  //   excerpt: "记录我在广西的7行程和实用攻略。",
  //   date: "2022-10-19",
  //   readTime: 20,
  //   tags: ["旅游", "云南", "攻略"],
  //   contentPath: "lib/trip/中国/广西/柳州-阳朔-龙脊梯田.md",
  // },
];
