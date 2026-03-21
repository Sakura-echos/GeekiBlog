"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
}

interface SparklesTextProps {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
  colors?: { first: string; second: string };
}

function generateSparkle(first: string, second: string): Sparkle {
  return {
    id: Math.random().toString(36).slice(2),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    color: Math.random() > 0.5 ? first : second,
    delay: Math.random() * 2,
    scale: Math.random() * 0.6 + 0.3,
  };
}

function SparkleIcon({ sparkle }: { sparkle: Sparkle }) {
  return (
    <motion.svg
      className="pointer-events-none absolute z-20"
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, sparkle.scale, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: sparkle.delay,
        ease: "easeInOut",
      }}
      style={{ left: sparkle.x, top: sparkle.y }}
      width="16"
      height="16"
      viewBox="0 0 160 160"
      fill="none"
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 99.496 60.504C114.707 79.7154 160 80 160 80C160 80 114.707 80.2846 99.496 99.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 60.504 99.496C45.2925 80.2846 0 80 0 80C0 80 45.2925 79.7154 60.504 60.504C75.7154 41.2925 80 0 80 0Z"
        fill={sparkle.color}
      />
    </motion.svg>
  );
}

export function SparklesText({
  children,
  className,
  sparklesCount = 10,
  colors = { first: "#A855F7", second: "#3B82F6" },
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const make = () =>
      Array.from({ length: sparklesCount }, () =>
        generateSparkle(colors.first, colors.second)
      );
    setSparkles(make());
    const interval = setInterval(() => setSparkles(make()), 3000);
    return () => clearInterval(interval);
  }, [sparklesCount, colors.first, colors.second]);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      {sparkles.map((s) => (
        <SparkleIcon key={s.id} sparkle={s} />
      ))}
    </span>
  );
}
