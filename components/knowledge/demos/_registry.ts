// components/knowledge/demos/_registry.ts
import type { ComponentType } from "react";

// 每个演示组件接收的标准 props
export interface DemoProps {
  locale: string;
  backHref: string;
}

// slug → 动态导入函数映射表
// 新增知识点时在此注册
export const DEMO_REGISTRY: Record<
  string,
  () => Promise<{ default: ComponentType<DemoProps> }>
> = {
  "react-diff": () => import("./react-diff/index"),
};
