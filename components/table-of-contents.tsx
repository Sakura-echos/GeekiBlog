"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

/**
 * 文章目录组件
 * 自动提取 H1-H4 标题并生成可点击的目录
 */
export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 从 markdown 内容中提取标题
  useEffect(() => {
    const extractedHeadings: Heading[] = [];
    const lines = content.split("\n");
    let headingIndex = 0; // 标题顺序索引

    lines.forEach((line) => {
      const match = line.match(/^(#{1,4})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = `heading-${headingIndex}-${text
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5]+/g, "-")}`;

        extractedHeadings.push({ id, text, level });
        headingIndex++; // 递增标题索引
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  // 监听滚动事件，高亮当前章节
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((heading) =>
        document.getElementById(heading.id)
      );

      // 找到当前可见的标题
      let currentId = "";
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentId = headings[i].id;
            break;
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始调用

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // 点击跳转到对应标题
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 30;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block fixed top-32 right-8 w-64 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="bg-background-secondary rounded-lg p-4 shadow-base border border-border">
        {/* 标题 */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <List className="w-4 h-4 text-text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">目录</h3>
        </div>

        {/* 目录列表 */}
        <ul className="space-y-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const paddingLeft = (heading.level - 1) * 12;

            return (
              <li key={heading.id} style={{ paddingLeft: `${paddingLeft}px` }}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`
                    text-left w-full text-sm transition-all duration-200
                    hover:text-text-primary
                    ${
                      isActive
                        ? "text-text-primary font-semibold"
                        : "text-text-secondary"
                    }
                    ${heading.level === 1 ? "text-base" : ""}
                    ${heading.level === 2 ? "text-sm" : ""}
                    ${heading.level === 3 ? "text-xs" : ""}
                    ${heading.level === 4 ? "text-xs opacity-80" : ""}
                  `}
                >
                  <span
                    className={`
                    block py-1 px-2 rounded transition-colors
                    ${isActive ? "bg-background" : "hover:bg-background"}
                  `}
                  >
                    {heading.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 自定义滚动条样式 */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          width: 4px;
        }
        nav::-webkit-scrollbar-track {
          background: transparent;
        }
        nav::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 2px;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: var(--text-light);
        }
      `}</style>
    </nav>
  );
}
