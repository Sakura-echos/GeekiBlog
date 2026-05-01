// components/knowledge/demos/react-diff/step-5-list-diff.tsx
"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  isActive: boolean;
  direction: "forward" | "backward";
}

const code = `// React 列表 Diff 两轮策略
// 第一轮：顺序扫描，处理头部连续可复用节点
// 第二轮：建 key Map，O(1) 查找乱序可复用节点

function reconcileChildrenArray(
  returnFiber, currentFirstChild, newChildren
) {
  let oldFiber = currentFirstChild;
  let newIdx = 0;

  // 第一轮：头部顺序扫描
  for (; oldFiber && newIdx < newChildren.length; newIdx++) {
    const newChild = newChildren[newIdx];
    if (!canReuseNode(oldFiber, newChild)) break;
    placeChild(updateSlot(oldFiber, newChild), newIdx);
    oldFiber = oldFiber.sibling;
  }

  // 第二轮：用 Map 处理乱序节点
  const existingChildren = mapRemainingChildren(oldFiber);
  for (; newIdx < newChildren.length; newIdx++) {
    const matchedFiber = existingChildren.get(
      newChildren[newIdx].key ?? newIdx
    );
    // 找到可复用节点或新建
  }
}`;

const oldNodes = ["A", "B", "C", "D"] as const;
const newOrder = [
  { key: "A", status: "reuse" as const },
  { key: "D", status: "move" as const },
  { key: "B", status: "reuse" as const },
  { key: "E", status: "new" as const },
];

const statusStyle: Record<string, string> = {
  reuse: "border-green-400 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
  move: "border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  new: "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

export function Step5ListDiff({ isActive, direction }: Props) {
  const [phase, setPhase] = useState(0);
  const { resolvedTheme } = useTheme();
  const codeStyle = resolvedTheme === "dark" ? oneDark : oneLight;

  useEffect(() => {
    if (!isActive) setPhase(0);
  }, [isActive]);

  return (
    <div className="flex h-full gap-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 5 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">列表 Diff 优化</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            React 用顺序扫描 + key Map 两轮策略，在 O(n) 时间内完成列表节点的复用匹配。
          </p>
        </div>

        {/* 旧列表 */}
        <div className="w-full max-w-md">
          <p className={cn(
            "mb-2 text-[10px] uppercase tracking-widest text-text-secondary",
            isActive ? "animate__animated animate__fadeIn" : "opacity-0"
          )}>旧列表</p>
          <div className="flex gap-2">
            {oldNodes.map((n, i) => (
              <div
                key={n}
                className={cn(
                  "flex h-10 w-12 items-center justify-center rounded-lg border border-border",
                  "bg-background-secondary font-mono text-sm font-bold text-text-primary",
                  isActive ? "animate__animated animate__fadeInDown" : "opacity-0"
                )}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* 步骤按钮 */}
        <div className={cn(
          "flex gap-3",
          isActive ? "animate__animated animate__fadeIn" : "opacity-0"
        )} style={{ animationDelay: "0.6s" }}>
          <button
            onClick={() => setPhase(1)}
            className={cn(
              "rounded-lg border border-border px-3 py-1.5 text-xs transition-all hover:border-muted-foreground/50",
              phase >= 1 ? "bg-text-primary text-background" : "text-text-secondary"
            )}
          >
            第一轮：顺序扫描
          </button>
          <button
            onClick={() => setPhase(2)}
            className={cn(
              "rounded-lg border border-border px-3 py-1.5 text-xs transition-all hover:border-muted-foreground/50",
              phase >= 2 ? "bg-text-primary text-background" : "text-text-secondary"
            )}
          >
            第二轮：key Map 匹配
          </button>
        </div>

        {/* 新列表结果（第二阶段出现） */}
        {phase >= 2 && (
          <div className="w-full max-w-md">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">新列表（结果）</p>
            <div className="flex gap-2 flex-wrap">
              {newOrder.map((n, i) => (
                <div
                  key={n.key}
                  className={cn(
                    "flex h-10 w-14 items-center justify-center rounded-lg border font-mono text-sm font-bold",
                    statusStyle[n.status],
                    "animate__animated animate__bounceIn"
                  )}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {n.key}
                  <span className="ml-0.5 text-[8px]">
                    {n.status === "new" ? "🆕" : n.status === "move" ? "↕" : "♻"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-4 text-[10px] text-text-secondary">
              <span>♻ 原地复用</span>
              <span>↕ 移动复用</span>
              <span>🆕 新建</span>
            </div>
          </div>
        )}
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="javascript" style={codeStyle} customStyle={{ margin: 0, fontSize: "10px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
