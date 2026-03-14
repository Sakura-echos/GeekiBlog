"use client";

import { AppProgressBar } from "next-nprogress-bar";

/**
 * Global top-of-page navigation progress bar.
 * Mounts once in the root layout; fires on every client-side route change.
 * Color matches the blog's text-primary (adapts between light/dark via CSS var).
 */
export function NavigationProgress() {
  return (
    <AppProgressBar
      height="2px"
      color="var(--text-primary)"
      options={{ showSpinner: false, easing: "ease", speed: 300 }}
      shallowRouting
    />
  );
}
