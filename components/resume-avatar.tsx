"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResumeAvatarProps {
  src: string;
  alt: string;
  /** Tailwind size classes, e.g. `w-28 h-28` */
  className?: string;
}

export function ResumeAvatar({ src, alt, className }: ResumeAvatarProps) {
  const [error, setError] = useState(false);
  const box = cn(
    "rounded-full border-2 border-border bg-background-secondary shrink-0",
    className ?? "w-24 h-24",
  );

  if (error) {
    return (
      <div
        className={cn(
          box,
          "flex items-center justify-center text-2xl font-semibold text-text-light",
        )}
      >
        {alt.slice(0, 1)}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", box)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={className?.includes("w-28") ? "112px" : "96px"}
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  );
}
