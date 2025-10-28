import type { Config } from "tailwindcss";

const config: Config = {
  // 启用深色模式，使用 class 策略
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 自定义颜色变量
      colors: {
        background: "var(--bg-color)",
        "background-secondary": "var(--secondary-bg)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-light": "var(--text-light)",
        border: "var(--border-color)",
      },
      // 自定义阴影
      boxShadow: {
        base: "var(--shadow)",
        hover: "var(--shadow-hover)",
      },
      // 响应式断点
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
