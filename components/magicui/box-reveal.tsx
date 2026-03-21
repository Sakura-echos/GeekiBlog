"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BoxRevealProps {
  children: React.ReactNode;
  className?: string;
  boxColor?: string;
  duration?: number;
  delay?: number;
  width?: string;
}

export function BoxReveal({
  children,
  className,
  boxColor = "#A855F7",
  duration = 0.5,
  delay = 0,
  width = "fit-content",
}: BoxRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{ width }}
      className={cn("relative overflow-hidden py-0.5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.01, delay: delay + duration * 0.5 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 z-20"
        style={{ backgroundColor: boxColor }}
        initial={{ x: "-101%" }}
        animate={isInView ? { x: ["-101%", "0%", "0%", "101%"] } : {}}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 1],
        }}
      />
    </div>
  );
}
