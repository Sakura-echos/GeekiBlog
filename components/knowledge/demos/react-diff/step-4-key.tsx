"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const code = `// 无 key — React 按索引对比，全部更新
<ul>
  <li>Apple</li>  {/* index 0 */}
  <li>Banana</li> {/* index 1 */}
</ul>

// 有 key — React 按 key 对比，精准复用
<ul>
  <li key="a">Apple</li>
  <li key="b">Banana</li>
</ul>

// 新增 Orange 到头部
// 无 key：全部节点更新（3 次 DOM 操作）
// 有 key：仅插入 Orange（1 次 DOM 操作）`;

const items = [
  { key: "a", label: "🍎 Apple" },
  { key: "b", label: "🍌 Banana" },
  { key: "c", label: "🍊 Orange" },
] as const;

export function Step4Key({ isActive }: Props) {
  return (
    <div className="flex h-full gap-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 4 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">key 的作用</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            key 帮助 React 识别同层列表中哪些节点是同一个，从而精准复用，避免不必要的 DOM 操作。
          </p>
        </div>

        <div className="flex w-full max-w-xl gap-6">
          {/* 无 key */}
          <div className="flex-1">
            <p className={cn(
              "mb-2 text-xs font-semibold text-red-600",
              isActive ? "animate__animated animate__fadeIn" : "opacity-0"
            )} style={{ animationDelay: "0.1s" }}>❌ 无 key — 按索引</p>
            <div className="space-y-1.5">
              {items.map((item, i) => (
                <div
                  key={item.key}
                  className={cn(
                    "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
                    "dark:border-red-900 dark:bg-red-950 dark:text-red-400",
                    isActive ? "animate__animated animate__fadeInLeft" : "opacity-0"
                  )}
                  style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                >
                  <span className="text-[10px] text-text-secondary mr-2">index={i}</span>
                  {item.label}
                </div>
              ))}
              <p className={cn(
                "text-[10px] text-red-500 mt-1",
                isActive ? "animate__animated animate__fadeIn" : "opacity-0"
              )} style={{ animationDelay: "0.7s" }}>
                头部插入 → 3 个节点全部更新
              </p>
            </div>
          </div>

          {/* 有 key */}
          <div className="flex-1">
            <p className={cn(
              "mb-2 text-xs font-semibold text-green-600",
              isActive ? "animate__animated animate__fadeIn" : "opacity-0"
            )} style={{ animationDelay: "0.1s" }}>✅ 有 key — 精准匹配</p>
            <div className="space-y-1.5">
              {/* 新增的 Orange */}
              <div
                className={cn(
                  "rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-700",
                  "dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400",
                  isActive ? "animate__animated animate__bounceIn" : "opacity-0"
                )}
                style={{ animationDelay: "0.9s" }}
              >
                <span className="text-[10px] text-text-secondary mr-2">key=&quot;c&quot; 🆕</span>
                🍊 Orange
              </div>
              {/* 复用的 Apple & Banana */}
              {items.slice(0, 2).map((item, i) => (
                <div
                  key={item.key}
                  className={cn(
                    "rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700",
                    "dark:border-green-900 dark:bg-green-950 dark:text-green-400",
                    isActive ? "animate__animated animate__fadeInLeft" : "opacity-0"
                  )}
                  style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                >
                  <span className="text-[10px] text-text-secondary mr-2">key=&quot;{item.key}&quot; ♻️</span>
                  {item.label}
                </div>
              ))}
              <p className={cn(
                "text-[10px] text-green-600 mt-1",
                isActive ? "animate__animated animate__fadeIn" : "opacity-0"
              )} style={{ animationDelay: "1.1s" }}>
                头部插入 → 仅 Orange 新建，其余复用
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="jsx" style={oneLight} customStyle={{ margin: 0, fontSize: "11px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
