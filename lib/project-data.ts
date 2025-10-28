/**
 * 项目数据类型
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

/**
 * 示例项目数据
 * 实际项目中可以从 API 或数据库获取
 */
export const projects: Project[] = [];
// export const projects: Project[] = [
//   {
//     id: "geeki-blog",
//     title: "Geeki Blog",
//     description:
//       "A minimalist personal blog built with Next.js 14, TypeScript, and Tailwind CSS. Features dark mode, i18n support, and responsive masonry layout.",
//     tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
//     demoUrl: "https://geeki.dev",
//     githubUrl: "https://github.com/geeki/blog",
//   },
//   {
//     id: "task-manager",
//     title: "Task Manager Pro",
//     description:
//       "A powerful task management application with real-time collaboration features. Built with React, Node.js, and MongoDB.",
//     tags: ["React", "Node.js", "MongoDB", "Socket.io"],
//     demoUrl: "https://tasks.geeki.dev",
//     githubUrl: "https://github.com/geeki/task-manager",
//   },
//   {
//     id: "design-system",
//     title: "UI Design System",
//     description:
//       "A comprehensive design system and component library for building consistent user interfaces. Includes 50+ components with full documentation.",
//     tags: ["React", "Storybook", "TypeScript", "CSS"],
//     githubUrl: "https://github.com/geeki/design-system",
//   },
//   {
//     id: "weather-app",
//     title: "Weather Dashboard",
//     description:
//       "Real-time weather dashboard with beautiful visualizations. Integrates with multiple weather APIs for accurate forecasts.",
//     tags: ["Vue.js", "Chart.js", "API Integration"],
//     demoUrl: "https://weather.geeki.dev",
//     githubUrl: "https://github.com/geeki/weather-app",
//   },
//   {
//     id: "code-snippets",
//     title: "Code Snippets Manager",
//     description:
//       "Save, organize, and share your code snippets. Features syntax highlighting, tags, and full-text search.",
//     tags: ["Next.js", "PostgreSQL", "Prisma", "Auth"],
//     demoUrl: "https://snippets.geeki.dev",
//     githubUrl: "https://github.com/geeki/snippets",
//   },
//   {
//     id: "portfolio-template",
//     title: "Portfolio Template",
//     description:
//       "A modern portfolio template for developers and designers. Fully customizable with easy deployment to Vercel.",
//     tags: ["Next.js", "Framer Motion", "MDX"],
//     demoUrl: "https://portfolio.geeki.dev",
//     githubUrl: "https://github.com/geeki/portfolio-template",
//   },
// ];
