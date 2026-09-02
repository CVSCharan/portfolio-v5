"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

function reveal(delay = 0) {
  return {
    initial: { y: "105%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { duration: 0.75, delay, ease: "easeOut" as const },
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
      <section
        className="relative flex flex-col px-5 sm:px-10 xl:px-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 85% 15%, rgba(37,99,235,0.04) 0%, transparent 52%)",
        }}
      >
        {/* Ghost "04" */}
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
          04
        </div>

        {/* ── Meta bar ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Career</span>
          <span className="text-label text-muted-foreground">Chapter 04</span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">The </span>
              <span className="text-secondary">Journey.</span>
            </motion.div>
          </div>

          {/* Role line */}
          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            Professional history — roles, companies, and what was built.
          </motion.p>

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

        </div>
      </section>

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
                    <span className="text-xs font-mono text-muted-foreground/50 shrink-0">
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

      {/* ════════════════════════════════════════════════════
          CTA — identical to home + about
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border bg-muted/20 px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <p className="text-label text-muted-foreground mb-2">
              Let&apos;s Collaborate
            </p>
            <h2
              className="text-headline text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              Have a project in mind?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-3">
              Open to ambitious projects, creative ideas, and new opportunities
              to build something meaningful.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="btn btn-primary btn-lg group">
              Get in Touch{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/projects" className="btn btn-outline btn-lg">
              View Work
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
