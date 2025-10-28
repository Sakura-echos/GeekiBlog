"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode[];
  className?: string;
}

/**
 * 瀑布流布局组件
 * 自动计算列数并均匀分布内容
 * 支持响应式布局
 */
export function MasonryGrid({ children, className }: MasonryGridProps) {
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // 根据窗口宽度动态调整列数
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1); // 移动端：1列
      } else if (width < 1024) {
        setColumns(2); // 平板：2列
      } else {
        setColumns(3); // 桌面：3列
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 将子元素分配到各列
  const columnItems: React.ReactNode[][] = Array.from(
    { length: columns },
    () => []
  );

  children.forEach((child, index) => {
    columnItems[index % columns].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={cn("grid gap-6", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {columnItems.map((items, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {items.map((item, itemIndex) => (
            <div key={`${columnIndex}-${itemIndex}`}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
