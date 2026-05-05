export type ResumeLocale = "zh" | "en";

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface WorkItem {
  company: string;
  role: string;
  period: string;
  companyDesc?: string;
  companyUrl?: string;
  points: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  stack?: string;
  points: string[];
}

export interface EducationItem {
  major: string;
  school: string;
  location: string;
  period: string;
  points: string[];
}

export interface ResumeData {
  name: string;
  headline: string;
  summary: string;
  contact: {
    location: string;
    email: string;
    // phone: string;
    blogLabel: string;
    blogUrl: string;
    age: string;
    languages: string;
  };
  skillGroups: SkillGroup[];
  work: WorkItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export const resumeData: Record<ResumeLocale, ResumeData> = {
  zh: {
    name: "黄子杰",
    headline: "全栈开发工程师",
    summary:
      "约 4 年港澳政企项目经验，专注 React 与 React Native 的 Web / App 交付；熟悉 OAuth2、JS Bridge、大列表与相机等场景的性能与工程化实践，具备需求分析、方案设计、上线与部分 DevOps 的端到端能力；日常使用 Cursor 与 MCP 等工具提升交付效率。",
    contact: {
      location: "广东省珠海市",
      email: "qqa12348999@gmail.com",
      // phone: "+86 133 4644 6698",
      blogLabel: "geekiblog.com",
      blogUrl: "https://www.geekiblog.com",
      age: "25 岁",
      languages: "粤语（母语）、普通话、英语（CET-6）",
    },
    skillGroups: [
      {
        title: "核心框架",
        items: [
          "熟练 React 生态（Redux、React Navigation）及底层机制（如 Diff 与更新流程）。",
        ],
      },
      {
        title: "移动端",
        items: [
          "React Native 跨平台（Android / iOS），熟悉 Google Play、App Store 上架与发布流程。",
        ],
      },
      {
        title: "Web 基础",
        items: [
          "深入理解 JavaScript（闭包、this、原型链）、ES6+与 TypeScript。",
          "熟练使用 CSS（媒体查询、Flex / Grid）做响应式布局。",
        ],
      },
      {
        title: "工程与运维",
        items: [
          "Webpack、Git / SVN、Prettier、ESLint；Charles / Wireshark 抓包调试。",
        ],
      },
      {
        title: "AI 辅助开发",
        items: ["熟练使用 Cursor，了解 MCP、Skills、Rules 等自动化工作流。"],
      },
      {
        title: "其他",
        items: ["了解 Angular、Vue 2/3、VuePress 等栈，可快速接入既有项目。"],
      },
    ],
    work: [
      {
        company: "萬訊電腦科技有限公司",
        role: "软件开发工程师",
        period: "2022.10 – 2024.10",
        companyDesc: "爱达利控股有限公司（香港上市编号 8033）成员企业。",
        companyUrl: "https://www.megadatatech.com/en/about/",
        points: [
          "独立负责澳门政府多个 Web 与移动端项目的前端开发与维护（React、Angular、React Native）。",
          "覆盖需求分析、技术方案、生产部署与部分 DevOps，完成端到端交付。",
          "使用 VuePress 与 Markdown 搭建内部技术文档体系，降低团队沟通与上手成本。",
        ],
      },
    ],
    projects: [
      {
        name: "政务大厅筹号服务系统（Android）",
        description:
          "面向线下政务大厅的 Android 应用：筹号、排队与调度等业务。",
        stack:
          "React Native、Redux、React Navigation、WebView、react-native-vision-camera、Android Studio",
        points: [
          "使用 FlashList 虚拟列表，并结合 memo / useMemo 优化大列表渲染，减少卡顿。",
          "设计同时支持 XML 与 JSON 的网络层，兼容遗留接口。",
          "基于 react-native-vision-camera 实现高性能扫码，并优化相机触发策略。",
        ],
      },
      {
        name: "澳门政府柜台预约系统（React Web）",
        description:
          "嵌入官方政府 App 的 H5 预约平台，通过 JS Bridge 与原生交互。",
        stack: "React、Redux、OAuth2、antd-mobile、i18n",
        points: [
          "封装 JS Bridge，打通 App 与 H5；使用 OAuth2 + PKCE 实现 SSO。",
          "在多层 iframe 场景下保持会话与多语言切换一致。",
          "搭建 Dev / Uat / Prod / Gray 多环境 CI/CD，构建唯一 ID，并集成 Eruda 便于生产环境可视化调试。",
        ],
      },
      {
        name: "个人技术博客",
        description: "全栈博客站点与在线简历，持续迭代内容与工程实践。",
        stack: "Next.js、Tailwind CSS、TypeScript、Supabase、Vercel",
        points: [
          "Markdown 编辑、草稿、图片上传、无限滚动等完整内容管理能力。",
          "SEO：generateMetadata、JSON-LD、自动化 sitemap 等。",
          "基于 Supabase Realtime（PostgreSQL CDC）与 WebSocket 的即时通讯能力。",
        ],
      },
    ],
    education: [
      {
        major: "软件工程 · 学士",
        school: "广东海洋大学",
        location: "湛江市，广东省",
        period: "2017.09 – 2022.06",
        points: [
          "GPA 3.66 / 5.0（专业前 10%）",
          "多次获奖学金；软件工程卓越班成员；计算机协会会长；以第一作者发表 EI 论文一篇。",
        ],
      },
      {
        major: "海洋环境工程系 · 交换生",
        school: "高雄科技大学",
        location: "高雄市，台湾",
        period: "2018.09 – 2019.01",
        points: [
          "GPA 4.1 / 5.0（专业前 5%）",
          "全英文授课环境下的跨学科学习经历。",
        ],
      },
    ],
  },
  en: {
    name: "Zijie Huang",
    headline: "Frontend & Cross-Platform Developer",
    summary:
      "Around 3+ years delivering government-facing Web and mobile apps in Macau/HK, focused on React and React Native. Strong in OAuth2, JS Bridge, list/camera performance, and end-to-end delivery from requirements to production—including light DevOps. Day-to-day user of Cursor, MCP, and workflow automation to ship faster.",
    contact: {
      location: "Zhuhai, Guangdong, China",
      email: "qqa12348999@gmail.com",
      // phone: "+86 133 4644 6698",
      blogLabel: "geekiblog.com",
      blogUrl: "https://www.geekiblog.com",
      age: "25",
      languages: "Cantonese (native), Mandarin (fluent), English (CET-6)",
    },
    skillGroups: [
      {
        title: "Core frameworks",
        items: [
          "React ecosystem (Redux, React Navigation) and underlying behavior (e.g. reconciliation / Diff).",
        ],
      },
      {
        title: "Mobile",
        items: [
          "React Native on Android & iOS; familiar with Google Play and App Store release flows.",
        ],
      },
      {
        title: "Web fundamentals",
        items: [
          "JavaScript (closures, `this`, prototype chain), ES6+, TypeScript.",
          "CSS (media queries, Flexbox / Grid) for responsive layouts.",
        ],
      },
      {
        title: "Engineering & DevOps",
        items: [
          "Webpack; Git / SVN; Prettier / ESLint; packet capture with Charles / Wireshark.",
        ],
      },
      {
        title: "AI-assisted development",
        items: ["Cursor; MCP, Skills, and Rules for repeatable automation."],
      },
      {
        title: "Also",
        items: [
          "Working knowledge of Angular, Vue 2/3, and VuePress for brownfield work.",
        ],
      },
    ],
    work: [
      {
        company: "MEGA Datatech Co., Ltd.",
        role: "Software Development Engineer",
        period: "Oct 2022 – Oct 2024",
        companyDesc:
          "Member company of Avatech Holdings Limited (HK stock code 8033).",
        companyUrl: "https://www.megadatatech.com/en/about/",
        points: [
          "Owned front-end delivery for multiple Macau government Web and mobile projects (React, Angular, React Native).",
          "Covered requirements, technical design, production deployment, and light DevOps for end-to-end releases.",
          "Built an internal VuePress + Markdown documentation system to cut onboarding and communication overhead.",
        ],
      },
    ],
    projects: [
      {
        name: "Government hall ticketing & queueing (Android)",
        description:
          "Offline hall Android app for ticketing, queueing, and scheduling.",
        stack:
          "React Native, Redux, React Navigation, WebView, react-native-vision-camera, Android Studio",
        points: [
          "Tuned large lists with FlashList plus memo / useMemo to remove jank.",
          "Designed a network layer handling both XML and JSON for legacy backends.",
          "Shipped high-performance QR/barcode scanning and refined camera triggers.",
        ],
      },
      {
        name: "Macau government counter appointment (React Web)",
        description:
          "H5 appointment experience embedded in the official app via JS Bridge.",
        stack: "React, Redux, OAuth2, antd-mobile, i18n",
        points: [
          "Wrapped JS Bridge for native–web messaging; SSO with OAuth2 + PKCE.",
          "Kept session and language state consistent across nested iframes.",
          "Multi-env CI/CD (Dev/Uat/Prod/Gray) with unique build IDs and Eruda for field debugging.",
        ],
      },
      {
        name: "Personal technical blog",
        description: "Full-stack blog and online resume.",
        stack: "Next.js, Tailwind CSS, TypeScript, Supabase, Vercel",
        points: [
          "CMS-style authoring: Markdown, drafts, uploads, infinite scroll.",
          "SEO: generateMetadata, JSON-LD, automated sitemaps.",
          "Realtime chat on Supabase Realtime (PostgreSQL CDC) and WebSockets.",
        ],
      },
    ],
    education: [
      {
        major: "BEng, Software Engineering",
        school: "Guangdong Ocean University",
        location: "Zhanjiang, Guangdong",
        period: "Sep 2017 – Jun 2022",
        points: [
          "GPA 3.66 / 5.0 (top 10% in major)",
          "Scholarships; Software Engineering honors class; president of the CS association; first-author EI paper.",
        ],
      },
      {
        major: "Exchange, Marine Environmental Engineering",
        school: "National Kaohsiung University of Science and Technology",
        location: "Kaohsiung, Taiwan",
        period: "Sep 2018 – Jan 2019",
        points: [
          "GPA 4.1 / 5.0 (top 5% in major)",
          "Cross-disciplinary study in an English-medium program.",
        ],
      },
    ],
  },
};
