"use client";

import { useEffect, useRef } from "react";
import { incrementArticleViewCount } from "@/lib/actions";

/**
 * Calls incrementArticleViewCount(slug) once when mounted (e.g. on article detail page).
 * Uses a ref to avoid double increment in React Strict Mode.
 */
export function IncrementArticleView({ slug }: { slug: string }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current || !slug) return;
    done.current = true;
    incrementArticleViewCount(slug);
  }, [slug]);
  return null;
}
