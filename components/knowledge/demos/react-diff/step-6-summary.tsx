// components/knowledge/demos/react-diff/step-6-summary.tsx
"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const summaryPoints = [
  { icon: "🌳", title: "Virtual DOM", desc: "JS 对象描述 UI，render 前先在内存 diff，再批量更新真实 DOM" },
  { icon: "↔", title: "同层比较", desc: "只比较同一层级，不跨层移动，O(n) 时间复杂度" },
  { icon: "🔄", title: "类型判断", desc: "类型相同复用 Fiber，类型不同销毁整棵子树后重建" },
  { icon: "🔑", title: "key 优化", desc: "key 唯一标识列表节点，头部插入只需 1 次 DOM 操作" },
  { icon: "📋", title: "列表 Diff", desc: "顺序扫描 + key Map 两轮策略，最大化节点复用" },
] as const;

const finalCode = `// React Diff 三大假设
// 1. Web UI 中跨层级移动操作极少 → 只做同层比较
// 2. 类型不同的组件生成不同结构 → 直接替换
// 3. 开发者用 key 标识同层节点 → key 驱动列表优化

// 整体时间复杂度：O(n)（传统 diff 是 O(n³)）`;

export function Step6Summary({ isActive }: Props) {
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-8 py-10">
      <div className={cn(
        "mb-8 text-center",
        isActive ? "animate__animated animate__fadeIn" : "opacity-0"
      )}>
        <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 6 / 6</p>
        <h2 className="text-lg font-bold text-text-primary">完整流程回顾</h2>
        <p className="mt-2 text-sm text-text-secondary">React Diff 的三大假设 + 五个核心策略</p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {summaryPoints.map((p, i) => (
          <div
            key={p.title}
            className={cn(
              "rounded-xl border border-border bg-background-secondary p-4",
              isActive ? "animate__animated animate__fadeInUp" : "opacity-0"
            )}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div className="mb-2 text-xl">{p.icon}</div>
            <p className="mb-1 text-sm font-semibold text-text-primary">{p.title}</p>
            <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className={cn(
        "w-full max-w-2xl rounded-xl border border-border overflow-hidden",
        isActive ? "animate__animated animate__fadeInUp" : "opacity-0"
      )} style={{ animationDelay: "0.7s" }}>
        <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "12px", background: "var(--secondary-bg)" }}>
          {finalCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
