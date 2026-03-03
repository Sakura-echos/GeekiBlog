"use client";

import Image from "next/image";
import { useState } from "react";

interface ResumeAvatarProps {
  src: string;
  alt: string;
}

export function ResumeAvatar({ src, alt }: ResumeAvatarProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-24 h-24 rounded-full border-2 border-border bg-background-secondary flex items-center justify-center text-2xl font-semibold text-text-light shrink-0">
        {alt.slice(0, 1)}
      </div>
    );
  }

  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-background-secondary shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="96px"
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  );
}
