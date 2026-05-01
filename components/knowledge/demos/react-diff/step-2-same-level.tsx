"use client";
import "animate.css";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const code = `function reconcileChildFibers(
  returnFiber,
  currentFirstChild,
  newChild
) {
  // ✅ 只处理同层节点，不跨层
  if (isArray(newChild)) {
    return reconcileChildrenArray(
      returnFiber,
      currentFirstChild,
      newChild
    );
  }
}`;

type NodeState = "normal" | "matched" | "removed" | "added";

function VNode({
  label,
  state,
  delay,
  isActive,
}: {
  label: string;
  state: NodeState;
  delay: string;
  isActive: boolean;
}) {
  const base = "flex h-9 w-12 items-center justify-center rounded-lg border-[1.5px] font-mono text-xs font-semibold";
  const stateClass: Record<NodeState, string> = {
    normal: "border-border bg-background-secondary text-text-secondary",
    matched: "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
    removed: "border-red-400 bg-red-50 text-red-600 line-through dark:bg-red-950 dark:text-red-400",
    added: "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  };

  const animClass: Record<NodeState, string> = {
    normal: "animate__animated animate__fadeInDown",
    matched: "animate__animated animate__pulse",
    removed: "animate__animated animate__shakeX",
    added: "animate__animated animate__bounceIn",
  };

  return (
    <span
      className={cn(base, stateClass[state], isActive ? animClass[state] : "opacity-0")}
      style={{ animationDelay: delay }}
    >
      {label}
    </span>
  );
}

export function Step2SameLevel({ isActive }: Props) {
  return (
    <div className="flex h-full gap-0">
      {/* 可视化区域 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 2 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">同层比较策略</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            React 只对比同层级节点，不会跨层移动。<br />相同位置同类型节点复用，否则销毁重建。
          </p>
        </div>

        <div className="flex items-start gap-10">
          {/* 旧树 */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary">旧树 Old</p>
            <VNode label="<A>" state="normal" delay="0.1s" isActive={isActive} />
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-2">
              <VNode label="<B>" state="normal" delay="0.2s" isActive={isActive} />
              <VNode label="<C>" state="normal" delay="0.3s" isActive={isActive} />
            </div>
          </div>

          {/* 箭头 */}
          <div
            className={cn("pt-8 text-2xl text-border", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}
            style={{ animationDelay: "0.4s" }}
          >
            ⟶
          </div>

          {/* 新树 */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary">新树 New</p>
            <VNode label="<A>" state="matched" delay="0.5s" isActive={isActive} />
            <div className="h-4 w-px bg-border" />
            <div className="flex gap-2">
              <VNode label="<B>" state="matched" delay="0.6s" isActive={isActive} />
              <VNode label="<D>" state="added" delay="0.75s" isActive={isActive} />
            </div>
          </div>

          {/* 新增 E */}
          <div
            className={cn("flex flex-col items-center gap-2 self-end", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}
            style={{ animationDelay: "0.9s" }}
          >
            <p className="text-[10px] tracking-widest text-text-secondary">新增</p>
            <VNode label="<E>" state="added" delay="1s" isActive={isActive} />
          </div>
        </div>

        {/* 图例 */}
        <div
          className={cn("flex gap-5 text-[11px]", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}
          style={{ animationDelay: "1.1s" }}
        >
          {(
            [
              ["#22c55e", "复用节点"],
              ["#ef4444", "销毁重建"],
              ["#f59e0b", "新增节点"],
            ] as const
          ).map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-text-secondary">
              <span
                className="h-2.5 w-2.5 rounded-sm border-[1.5px]"
                style={{ borderColor: color, background: color + "20" }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter
            language="javascript"
            style={oneLight}
            customStyle={{ margin: 0, fontSize: "11px", background: "transparent" }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
