// components/knowledge/demo-shell.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { StepPlayerState } from "./step-player";

export interface DemoStep {
  labelZh: string;
  labelEn: string;
  content: ReactNode;
}

interface DemoShellProps {
  locale: string;
  categoryEmoji: string;
  categoryName: string;
  titleZh: string;
  titleEn: string;
  steps: DemoStep[];
  player: StepPlayerState;
  backHref: string;
}

export function DemoShell({
  locale,
  categoryEmoji,
  categoryName,
  titleZh,
  titleEn,
  steps,
  player,
  backHref,
}: DemoShellProps) {
  const t = useTranslations("knowledge");
  const { currentStep, goTo, next, prev, isFirst, isLast } = player;

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
      {/* 顶栏 */}
      <div className="flex h-13 shrink-0 items-center gap-4 border-b border-border px-6">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
        >
          ← {t("backToList")}
        </Link>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>{categoryEmoji} {categoryName}</span>
          <span className="text-border">›</span>
          <span className="font-semibold text-text-primary">
            {locale === "zh" ? titleZh : titleEn}
          </span>
        </div>
      </div>

      {/* 主体：步骤导航 + 内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧步骤导航 */}
        <nav className="w-44 shrink-0 overflow-y-auto border-r border-border px-3 py-5">
          <p className="mb-3 px-2 text-[10px] uppercase tracking-widest text-text-secondary">
            {t("steps")}
          </p>
          <ol className="space-y-0.5">
            {steps.map((step, i) => (
              <li key={i}>
                <button
                  onClick={() => goTo(i)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition-colors",
                    i === currentStep
                      ? "bg-background-secondary"
                      : "hover:bg-background-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold transition-all",
                      i < currentStep
                        ? "border-green-500 bg-green-500 text-white"
                        : i === currentStep
                        ? "border-text-primary bg-text-primary text-background"
                        : "border-border text-text-secondary"
                    )}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] leading-snug",
                      i === currentStep
                        ? "font-medium text-text-primary"
                        : "text-text-secondary"
                    )}
                  >
                    {locale === "zh" ? step.labelZh : step.labelEn}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* 演示内容区 */}
        <div className="flex-1 overflow-y-auto">
          {steps[currentStep]?.content}
        </div>
      </div>

      {/* 底部步进控制 */}
      <div className="flex h-15 shrink-0 items-center justify-between border-t border-border px-8">
        <button
          onClick={prev}
          disabled={isFirst}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs transition-all",
            isFirst
              ? "cursor-not-allowed opacity-40 text-text-secondary"
              : "text-text-secondary hover:border-muted-foreground/50 hover:text-text-primary"
          )}
        >
          ← {t("prevStep")}
        </button>

        {/* 进度点 */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i < currentStep
                  ? "w-1.5 bg-green-500"
                  : i === currentStep
                  ? "w-5 bg-text-primary"
                  : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={isLast}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs transition-all",
            isLast
              ? "cursor-not-allowed opacity-40 border border-border text-text-secondary"
              : "bg-text-primary text-background hover:opacity-85"
          )}
        >
          {t("nextStep")} →
        </button>
      </div>
    </div>
  );
}
