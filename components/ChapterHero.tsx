"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Note: This component is for the public full-bleed page heroes (Home, About, Projects, Experience, Skills, Contact).
// For the simpler, internal/generic headers (e.g. /admin/settings, /blog placeholder), see PageHeader.tsx.

interface ChapterHeroProps {
  chapter: string; // e.g., "05"
  metaLabel: string; // e.g., "Capabilities"
  titlePrefix: string; // e.g., "The "
  titleAccent: string; // e.g., "Arsenal."
  description?: string;
  prefersReducedMotion?: boolean | null;
  children?: React.ReactNode;
}

export function ChapterHero({
  chapter,
  metaLabel,
  titlePrefix,
  titleAccent,
  description,
  prefersReducedMotion,
  children,
}: ChapterHeroProps) {
  // We use spring transitions consistently across these pages
  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
  };

  // Helper for fadeUp (handles reduced motion)
  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springTransition, delay: prefersReducedMotion ? 0 : delay },
  });

  // Helper for reveal (handles reduced motion)
  const reveal = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { y: "105%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { ...springTransition, delay: prefersReducedMotion ? 0 : delay },
  });

  return (
    <section className="relative flex flex-col px-5 sm:px-10 xl:px-16 overflow-hidden">
      {/* Ghost Chapter Number */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 right-4 sm:right-10 xl:right-16 font-bold text-foreground leading-none"
        style={{
          fontFamily: "var(--font-bricolage)",
          fontSize: "clamp(8rem, 22vw, 22rem)",
          opacity: 0.04,
          letterSpacing: "-0.05em",
        }}
      >
        {chapter}
      </div>

      {/* ── Meta bar ── */}
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between pt-4 pb-6 border-b border-border"
      >
        <span className="text-label text-muted-foreground">{metaLabel}</span>
        <span className="text-label text-muted-foreground">
          Chapter {chapter}
        </span>
      </motion.div>

      {/* ── Headline ── */}
      <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
        <div className="text-page-title overflow-hidden">
          <motion.div {...reveal(0.1)} className="block leading-[0.95]">
            <span className="text-foreground">{titlePrefix}</span>
            <span className="text-secondary">{titleAccent}</span>
          </motion.div>
        </div>

        {/* Role / Description line */}
        {description && (
          <motion.p
            {...fadeUp(0.2)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            {description}
          </motion.p>
        )}

        {/* Dynamic Children slot */}
        {children}
      </div>
    </section>
  );
}
