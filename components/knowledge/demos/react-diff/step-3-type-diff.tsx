"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  isActive: boolean;
  direction: "forward" | "backward";
}

const code = `function updateElement(current, element) {
  if (current?.type === element.type) {
    // ✅ 类型相同 → 复用 Fiber，更新 props
    return useFiber(current, element.props);
  }
  // ❌ 类型不同 → 销毁旧 Fiber，创建新 Fiber
  return createFiberFromElement(element);
}`;

export function Step3TypeDiff({ isActive, direction }: Props) {
  const { resolvedTheme } = useTheme();
  const codeStyle = resolvedTheme === "dark" ? oneDark : oneLight;
  return (
    <div className="flex h-full gap-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-10 border-r border-border">
        <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-text-secondary">步骤 3 / 6</p>
          <h2 className="text-lg font-bold text-text-primary">类型不同 → 直接替换</h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary leading-relaxed">
            节点类型（tag 名）改变时，React 不会尝试复用，直接卸载整棵旧子树，挂载新子树。
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-6">
          {/* 场景 A：类型相同 */}
          <div className={cn(
            "rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950",
            isActive ? "animate__animated animate__fadeInLeft" : "opacity-0"
          )} style={{ animationDelay: "0.2s" }}>
            <p className="mb-2 text-xs font-semibold text-green-700 dark:text-green-400">✅ 类型相同 — 复用</p>
            <div className="flex items-center gap-4 font-mono text-sm">
              <span className="rounded border border-green-400 bg-white px-3 py-1.5 text-green-700">&lt;div&gt;</span>
              <span className="text-text-secondary">→</span>
              <span className="rounded border border-green-400 bg-white px-3 py-1.5 text-green-700">&lt;div&gt;</span>
              <span className="text-xs text-green-600">仅更新 props，保留 DOM 节点</span>
            </div>
          </div>

          {/* 场景 B：类型不同 */}
          <div className={cn(
            "rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950",
            isActive ? "animate__animated animate__fadeInLeft" : "opacity-0"
          )} style={{ animationDelay: "0.5s" }}>
            <p className="mb-2 text-xs font-semibold text-red-700 dark:text-red-400">❌ 类型不同 — 销毁重建</p>
            <div className="flex items-center gap-4 font-mono text-sm">
              <span className={cn(
                "rounded border border-red-400 bg-white px-3 py-1.5 text-red-600",
                isActive ? "animate__animated animate__flipOutX" : ""
              )} style={{ animationDelay: "0.8s" }}>&lt;div&gt;</span>
              <span className="text-text-secondary">→</span>
              <span className={cn(
                "rounded border border-amber-400 bg-white px-3 py-1.5 text-amber-700",
                isActive ? "animate__animated animate__flipInX" : ""
              )} style={{ animationDelay: "1.1s" }}>&lt;span&gt;</span>
              <span className="text-xs text-red-600">整棵子树卸载 + 重新挂载</span>
            </div>
          </div>

          {/* 警告提示 */}
          <div className={cn(
            "rounded-xl border border-border bg-background-secondary p-3 text-xs text-text-secondary",
            isActive ? "animate__animated animate__fadeIn" : "opacity-0"
          )} style={{ animationDelay: "1.4s" }}>
            ⚠️ 因此，不要用条件渲染在同位置切换不同组件类型，会触发整棵子树的卸载（state 丢失、动画中断）。
          </div>
        </div>
      </div>

      {/* 代码面板 */}
      <div className="w-72 shrink-0 overflow-y-auto bg-background-secondary p-5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-text-secondary">核心源码</p>
        <div className="rounded-xl border border-border overflow-hidden text-xs">
          <SyntaxHighlighter language="javascript" style={codeStyle} customStyle={{ margin: 0, fontSize: "11px", background: "transparent" }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
