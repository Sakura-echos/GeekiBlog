"use client";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props { isActive: boolean }

const jsCode = `// Virtual DOM 本质上是一个 JS 对象
const vdom = {
  type: "div",
  props: { className: "container" },
  children: [
    {
      type: "h1",
      props: {},
      children: ["Hello, React!"],
    },
    {
      type: "p",
      props: { id: "desc" },
      children: ["这是一段描述"],
    },
  ],
};`;

export function Step1Vdom({ isActive }: Props) {
  const anim = isActive ? "animate__animated animate__fadeInDown" : "opacity-0";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-8 py-10 border-r border-border">
      <div className={cn("text-center", isActive ? "animate__animated animate__fadeIn" : "opacity-0")}>
        <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">步骤 1 / 6</p>
        <h2 className="text-lg font-bold text-text-primary">什么是 Virtual DOM？</h2>
        <p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
          Virtual DOM 是真实 DOM 的轻量 JS 对象描述。React 先在内存中对比两棵 VNode 树，再将最小差异批量更新到真实 DOM。
        </p>
      </div>

      <div className="flex w-full max-w-2xl items-start gap-6">
        {/* JS 对象 */}
        <div className={cn("flex-1", anim)} style={{ animationDelay: "0.1s" }}>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">JS 对象（VNode）</p>
          <div className="rounded-xl border border-border overflow-hidden text-xs">
            <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, fontSize: "11px", background: "var(--secondary-bg)" }}>
              {jsCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* 箭头 */}
        <div className={cn("flex flex-col items-center gap-1 pt-12 text-text-secondary", isActive ? "animate__animated animate__fadeIn" : "opacity-0")} style={{ animationDelay: "0.3s" }}>
          <span className="text-xl">⟶</span>
          <span className="text-[10px] text-text-secondary">render</span>
        </div>

        {/* 真实 DOM */}
        <div className={cn("flex-1", anim)} style={{ animationDelay: "0.4s" }}>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-text-secondary">真实 DOM</p>
          <div className="rounded-xl border border-border bg-background-secondary p-4 font-mono text-xs text-text-secondary space-y-1 leading-6">
            <div><span className="text-blue-500">&lt;div</span> <span className="text-amber-600">class</span>=<span className="text-green-600">&quot;container&quot;</span><span className="text-blue-500">&gt;</span></div>
            <div className="pl-4"><span className="text-blue-500">&lt;h1&gt;</span>Hello, React!<span className="text-blue-500">&lt;/h1&gt;</span></div>
            <div className="pl-4"><span className="text-blue-500">&lt;p</span> <span className="text-amber-600">id</span>=<span className="text-green-600">&quot;desc&quot;</span><span className="text-blue-500">&gt;</span>这是一段描述<span className="text-blue-500">&lt;/p&gt;</span></div>
            <div><span className="text-blue-500">&lt;/div&gt;</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
