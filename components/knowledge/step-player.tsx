// components/knowledge/step-player.tsx
"use client";

import { useState, useCallback } from "react";

export interface StepPlayerState {
  currentStep: number;
  totalSteps: number;
  direction: "forward" | "backward";
  goTo: (step: number) => void;
  next: () => void;
  prev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function useStepPlayer(totalSteps: number): StepPlayerState {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const goTo = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;
      setDirection(step > currentStep ? "forward" : "backward");
      setCurrentStep(step);
    },
    [currentStep, totalSteps]
  );

  const next = useCallback(() => goTo(currentStep + 1), [currentStep, goTo]);
  const prev = useCallback(() => goTo(currentStep - 1), [currentStep, goTo]);

  return {
    currentStep,
    totalSteps,
    direction,
    goTo,
    next,
    prev,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
  };
}
