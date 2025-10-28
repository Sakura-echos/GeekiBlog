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
}

/**
 * 示例博客文章数据
 * 实际项目中可以从 CMS、Markdown 文件或数据库获取
 */
export const blogPosts: BlogPost[] = [];
// export const blogPosts: BlogPost[] = [
//   {
//     slug: "getting-started-with-nextjs",
//     title: "Getting Started with Next.js 14",
//     excerpt:
//       "Learn how to build modern web applications with Next.js 14, the latest version of the popular React framework. Discover new features like Server Components and improved routing.",
//     date: "2024-01-15",
//     readTime: 8,
//     tags: ["Next.js", "React", "Web Development"],
//   },
//   {
//     slug: "typescript-best-practices",
//     title: "TypeScript Best Practices for 2024",
//     excerpt:
//       "Explore the best practices and patterns for writing maintainable TypeScript code. From type safety to advanced generics.",
//     date: "2024-01-20",
//     readTime: 12,
//     tags: ["TypeScript", "JavaScript", "Best Practices"],
//   },
//   {
//     slug: "tailwind-css-tips",
//     title: "10 Tailwind CSS Tips You Should Know",
//     excerpt:
//       "Maximize your productivity with these essential Tailwind CSS tips and tricks. Learn about custom configurations, utilities, and responsive design patterns.",
//     date: "2024-02-01",
//     readTime: 6,
//     tags: ["CSS", "Tailwind", "Design"],
//   },
//   {
//     slug: "react-performance-optimization",
//     title: "React Performance Optimization Guide",
//     excerpt:
//       "Deep dive into React performance optimization techniques. Learn about memoization, code splitting, and rendering optimization strategies.",
//     date: "2024-02-10",
//     readTime: 15,
//     tags: ["React", "Performance", "Optimization"],
//   },
//   {
//     slug: "building-accessible-web-apps",
//     title: "Building Accessible Web Applications",
//     excerpt:
//       "A comprehensive guide to web accessibility. Learn how to make your applications usable for everyone, following WCAG guidelines.",
//     date: "2024-02-15",
//     readTime: 10,
//     tags: ["Accessibility", "Web Development", "UX"],
//   },
//   {
//     slug: "modern-css-features",
//     title: "Modern CSS Features You Should Use",
//     excerpt:
//       "Explore the latest CSS features that can revolutionize your styling workflow. From container queries to cascade layers.",
//     date: "2024-02-20",
//     readTime: 7,
//     tags: ["CSS", "Web Development"],
//   },
//   {
//     slug: "api-design-principles",
//     title: "RESTful API Design Principles",
//     excerpt:
//       "Learn the fundamental principles of designing clean and maintainable RESTful APIs. Best practices for endpoint naming, status codes, and error handling.",
//     date: "2024-02-25",
//     readTime: 9,
//     tags: ["API", "Backend", "Architecture"],
//   },
//   {
//     slug: "state-management-react",
//     title: "State Management in React Applications",
//     excerpt:
//       "Compare different state management solutions for React. From Context API to Zustand and Redux, find the right tool for your project.",
//     date: "2024-03-01",
//     readTime: 11,
//     tags: ["React", "State Management", "Architecture"],
//   },
// ];
