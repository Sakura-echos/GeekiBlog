export type ResumeLocale = "zh" | "en";

export interface ResumeSkills {
  techStack: string;
  languages: string;
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
  contact: {
    address: string;
    email: string;
    phone: string;
  };
  skills: ResumeSkills;
  work: WorkItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export const resumeData: Record<ResumeLocale, ResumeData> = {
  zh: {
    name: "黄子杰",
    contact: {
      address: "中国 广东省 珠海市",
      email: "qqa12348999@gmail.com",
      phone: "+86 133 266 13688",
    },
    skills: {
      techStack:
        "技术栈: React, React-Native, Redux, Angular, MySQL, Git, JavaScript, TypeScript, Vue, HTML, CSS, Android, IOS, Charles, WireShark.",
      languages: "语言: 粤语, 普通话, 英语(通过CET-6).",
    },
    work: [
      {
        company: "萬訊電腦科技有限公司",
        role: "软件开发工程师",
        period: "2022.10 - 2024.10",
        companyDesc:
          "公司为爱达利控股有限公司(香港股票代码8033)成员。详见 https://www.megadatatech.com/en/about/",
        companyUrl: "https://www.megadatatech.com/en/about/",
        points: [
          "在 MEGA Datatech 担任前端开发工程师，负责评估、开发和维护移动应用和网页应用。",
          "通过创建可复用组件、优化构建流程及提升页面加载速度，对项目进行优化。",
          "负责应用程序在 Google Play 和 App Store 上的发布管理工作。",
          "处理部分 DevOps 任务，包括项目打包及生产环境的部署。",
          "使用 VuePress 框架和 Markdown 编写内部使用的技术文档及部署指南。",
        ],
      },
    ],
    projects: [
      {
        name: "柜台预约系统",
        description: "一款嵌入澳门政府 app 的 web 网页应用(使用 React 开发)",
        points: [
          "实现 OAuth2 第三方授权。",
          "集成 iframe 实现多语言切换、用户登录/登出。",
          "通过签名校验访问移动端设备能力。",
          "开发并集成深色模式。",
          "使用 Git commit ID 优化构建文件版本管理。",
          "集成 Eruda 实现 app 内网页日志可见。",
          "使用 Charles 及浏览器开发工具进行调试。",
        ],
      },
      {
        name: "筹号服务系统",
        description:
          "一款基于安卓平台的取票系统(如预约、叫号功能)(使用 React-Native 开发)",
        points: [
          "定制组件，使用 Redux 管理状态、React Navigation 管理路由。",
          "封装 XML、JSON 网络请求。",
          "在 Android 应用中嵌入 WebView，集成 OAuth2。",
          "使用 react-native-vision-camera 实现二维码扫描。",
          "针对 dev、uat、prod 环境优化打包。",
        ],
      },
      {
        name: "ARQ- 排队、预约及轮候系统",
        description: "(使用 Angular 开发)",
        points: [
          "实现繁体中文、简体中文、英文、葡文 i18n。",
          "为不同政府部门定制 CSS 样式。",
          "使用可复用组件优化代码，降低维护成本。",
        ],
      },
    ],
    education: [
      {
        major: "软件工程",
        school: "广东海洋大学",
        location: "湛江市, 广东省",
        period: "2017.9 - 2022.9",
        points: [
          "GPA: 3.66/5.0 (专业前10%)",
          "多次获得大学奖学金(包括台湾免学费海外学习项目)",
        ],
      },
      {
        major: "海洋环境工程系",
        school: "高雄科技大学",
        location: "高雄市, 台湾",
        period: "2018.9 - 2019.1",
        points: ["GPA: 4.1/5.0 (专业前5%)"],
      },
    ],
  },
  en: {
    name: "ZIJIE HUANG",
    contact: {
      address: "China",
      email: "qqa12348999@gmail.com",
      phone: "+86 133 266 13688",
    },
    skills: {
      techStack:
        "React, React-Native, Redux, Angular, MySQL, Git, JavaScript, TypeScript, Vue, HTML, CSS, Android, IOS, Charles, WireShark.",
      languages:
        "Mandarin (native), Cantonese (native), English (fluent, passed CET-6).",
    },
    work: [
      {
        company: "MEGA Datatech",
        role: "Software Development Engineer at MEGA Datatech, Macao",
        period: "Oct 2022 - Oct 2024",
        companyDesc:
          "MEGA Datatech, its history, and its affiliation with Vodatel Networks Holdings Limited. https://www.megadatatech.com/en/about/",
        companyUrl: "https://www.megadatatech.com/en/about/",
        points: [
          "Front-end Development Engineer: evaluated, developed, and maintained mobile and web applications.",
          "Optimized projects with reusable components, build pipeline improvements, and faster page loads.",
          "Managed app releases on Google Play and App Store.",
          "Handled DevOps tasks including packaging and production deployment.",
          "Wrote internal technical docs and deployment guides using VuePress and Markdown.",
        ],
      },
    ],
    projects: [
      {
        name: "Counter Reservation System",
        description:
          "An Appointment for counter service web application embedded in the Government App (Developed using React).",
        points: [
          "Implemented OAuth2 for third-party authorization.",
          "Integrated third-party platform iframes (with multi-language and login/logout).",
          "Accessed mobile device features via third-party platform's signature verification.",
          "Developed and integrated dark mode theme.",
          "Used Git commit ID for build version management.",
          "Integrated Eruda debug script for in-app web logging.",
          "Used Charles and browser dev tools for debugging.",
        ],
      },
      {
        name: "Ticket Service System",
        description:
          "An Android system of Ticket Service (e.g., appointment, call Ticket) (Developed using React-Native).",
        points: [
          "Customized components, state management using Redux, React Navigation for routing.",
          "Encapsulated network requests for XML and JSON.",
          "Embedded WebView in Android app, integrated OAuth2 for third-party authorization.",
          "Implemented QR code scanning with react-native-vision-camera.",
          "Optimized build commands for dev, uat, and prod environments.",
        ],
      },
      {
        name: "ARQ - Appointment, Getting Remote Ticket Web Application",
        description: "(Developed using Angular).",
        points: [
          "Implemented i18n for Traditional Chinese, Simplified Chinese, English, Portuguese.",
          "Customized CSS styles for different government departments.",
          "Optimized code with reusable components to reduce maintenance.",
        ],
      },
    ],
    education: [
      {
        major: "BEng in Software Engineering",
        school: "Guangdong Ocean University",
        location: "Zhanjiang, China",
        period: "Sep 2017 - Sep 2022",
        points: [
          "GPA: 3.66/5.0 (Top 10% in Major)",
          "Multiple scholarships in University (Including Tuition-Free Study Abroad Program in Taiwan)",
        ],
      },
      {
        major: "Exchange program at the Department of Marine Environment",
        school: "National Kaohsiung University of Science and Technology",
        location: "Kaohsiung, Taiwan",
        period: "Sep 2018 - Jan 2019",
        points: ["GPA: 4.1/5.0 (Top 5% in Major)"],
      },
    ],
  },
};
