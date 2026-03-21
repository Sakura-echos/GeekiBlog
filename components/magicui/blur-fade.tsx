"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  blur?: string;
  inView?: boolean;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  blur = "6px",
  inView = true,
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isVisible = !inView || isInView;

  return (
    <motion.div
      ref={ref}
      initial={{ y: offset, opacity: 0, filter: `blur(${blur})` }}
      animate={
        isVisible
          ? { y: 0, opacity: 1, filter: "blur(0px)" }
          : { y: offset, opacity: 0, filter: `blur(${blur})` }
      }
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
