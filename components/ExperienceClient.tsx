"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterHero } from "./ChapterHero";

/* ── Types ─────────────────────────────────────────────────── */
interface ExperienceRecord {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string | null;
  order: number;
}

/* ── Animation helpers ──────────────────────────────────────── */
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function ExperienceClient({
  experiences,
}: {
  experiences: ExperienceRecord[];
}) {
  /* Derive stats from the data */
  const companies = [...new Set(experiences.map((e) => e.company))];

  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <ChapterHero
        chapter="04"
        metaLabel="Career"
        titlePrefix="The "
        titleAccent="Journey."
        description="Professional history — roles, companies, and what was built."
      >
        {/* Animated rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.48, ease: "easeOut" }}
          className="mt-8 h-px bg-border"
        />

        {/* Stats strip */}
        <motion.div
          {...fadeUp(0.55)}
          className="mt-8 flex flex-wrap gap-x-10 gap-y-3"
        >
          {[
            { value: "4+", label: "Years" },
            { value: `${experiences.length}`, label: "Roles" },
            { value: `${companies.length}`, label: "Companies" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span
                className="text-4xl font-bold text-secondary tracking-tighter"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {value}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </ChapterHero>

      {/* ════════════════════════════════════════════════════
          TIMELINE — editorial numbered list
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-label text-muted-foreground mb-2">Timeline</p>
              <h2
                className="text-headline text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Full History.
              </h2>
            </div>
          </motion.div>

          {/* Experience rows */}
          {experiences.length === 0 ? (
            <p className="text-muted-foreground">No experience records yet.</p>
          ) : (
            <ol>
              {experiences.map((exp, i) => (
                <motion.li
                  key={exp.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                  className="group border-b border-border last:border-b-0 py-7"
                >
                  {/* Row: index · title + company · period */}
                  <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4">
                    <span className="text-label text-muted-foreground/30 tabular-nums text-right select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span
                        className="text-base sm:text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-150"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                      >
                        {exp.title}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        · {exp.company}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground/50 shrink-0">
                      {exp.period.toLowerCase().includes("present") && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      )}
                      {exp.period}
                    </span>
                  </div>

                  {/* Description — collapses in, indented past the number col */}
                  {exp.description && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.07 + 0.1 }}
                      className="mt-3 pl-[calc(2.5rem+1rem)] pr-0 sm:pr-16"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ol>
          )}
        </div>
      </section>



    </div>
  );
}
