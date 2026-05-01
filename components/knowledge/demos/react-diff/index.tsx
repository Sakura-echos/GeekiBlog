// components/knowledge/demos/react-diff/index.tsx
"use client";
import { useStepPlayer } from "@/components/knowledge/step-player";
import { DemoShell, type DemoStep } from "@/components/knowledge/demo-shell";
import { Step1Vdom } from "./step-1-vdom";
import { Step2SameLevel } from "./step-2-same-level";
import { Step3TypeDiff } from "./step-3-type-diff";
import { Step4Key } from "./step-4-key";
import { Step5ListDiff } from "./step-5-list-diff";
import { Step6Summary } from "./step-6-summary";

interface Props {
  locale: string;
  backHref: string;
}

export function ReactDiffDemo({ locale, backHref }: Props) {
  const player = useStepPlayer(6);
  const { currentStep } = player;

  const steps: DemoStep[] = [
    {
      labelZh: "什么是 Virtual DOM",
      labelEn: "What is Virtual DOM",
      content: <Step1Vdom isActive={currentStep === 0} />,
    },
    {
      labelZh: "同层比较策略",
      labelEn: "Same-level Comparison",
      content: <Step2SameLevel isActive={currentStep === 1} />,
    },
    {
      labelZh: "类型不同直接替换",
      labelEn: "Type Mismatch",
      content: <Step3TypeDiff isActive={currentStep === 2} />,
    },
    {
      labelZh: "key 的作用",
      labelEn: "Role of Keys",
      content: <Step4Key isActive={currentStep === 3} />,
    },
    {
      labelZh: "列表 Diff 优化",
      labelEn: "List Diff Optimization",
      content: <Step5ListDiff isActive={currentStep === 4} />,
    },
    {
      labelZh: "完整流程回顾",
      labelEn: "Full Summary",
      content: <Step6Summary isActive={currentStep === 5} />,
    },
  ];

  return (
    <DemoShell
      locale={locale}
      categoryEmoji="⚛"
      categoryName="React"
      titleZh="Diff 算法原理"
      titleEn="Diff Algorithm"
      steps={steps}
      player={player}
      backHref={backHref}
    />
  );
}

export default ReactDiffDemo;
