"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, GitFork, ArrowRight, Briefcase, Clock } from "lucide-react";
import { motion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface MetricItem {
  label: string;
  value: string;
}

interface ProjectRecord {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  fullDescription: string | null;
  category: string | null;
  role: string | null;
  timeline: string | null;
  techStack: readonly string[];
  highlights: readonly string[];
  metrics: unknown | null;
  githubUrls: readonly string[];
  demoUrl: string | null;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

/* ─── Animation helpers ──────────────────────────────────────────────── */
/* Runs on mount — for hero content above the fold */
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

/* Triggered by scroll — for below-the-fold sections */
function scrollFadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

/* ─── Helper: safely parse metrics JSON ─────────────────────────────── */
function parseMetrics(raw: unknown): MetricItem[] | null {
  if (!raw) return null;
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr as MetricItem[];
  } catch {
    return null;
  }
}

/* ─── Stack category grouping ───────────────────────────────────────── */
const STACK_CATEGORIES: Record<string, string[]> = {
  Frontend:  ["react","next","vue","svelte","angular","vite","tailwind","css","html","typescript","javascript","framer","shadcn","radix","zustand","redux","tanstack","htmx"],
  Backend:   ["node","express","fastify","hono","bun","deno","python","django","fastapi","flask","rust","go","java","spring","prisma","drizzle","trpc","graphql","rest","api","socket"],
  Database:  ["postgres","postgresql","mysql","sqlite","mongodb","redis","supabase","firebase","neon","planetscale","turso","dynamodb","elasticsearch"],
  DevOps:    ["vercel","docker","kubernetes","aws","gcp","azure","cloudflare","nginx","github actions","ci/cd","railway","render","fly.io","terraform"],
  AI:        ["openai","langchain","pinecone","gemini","anthropic","hugging","llm","rag","vector","embedding","ollama","replicate"],
};

function groupByCategory(stack: readonly string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const tech of stack) {
    const lower = tech.toLowerCase();
    let matched = false;
    for (const [cat, keywords] of Object.entries(STACK_CATEGORIES)) {
      if (keywords.some((k) => lower.includes(k))) {
        (groups[cat] = groups[cat] ?? []).push(tech);
        matched = true;
        break;
      }
    }
    if (!matched) (groups["Other"] = groups["Other"] ?? []).push(tech);
  }
  return groups;
}

/* ─── Helper: parse fullDescription into brief split ─────────────────── */
function parseBrief(raw: string): { problem: string; approach: string | null } {
  const parts = raw.split(/\n\n+/);
  if (parts.length >= 2) {
    return {
      problem: parts[0].trim(),
      approach: parts.slice(1).join("\n\n").trim(),
    };
  }
  return { problem: raw.trim(), approach: null };
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ProjectDetailClient({
  project,
  projectIndex,
  nextProject,
}: {
  project: ProjectRecord;
  projectIndex: string;
  nextProject: ProjectRecord;
}) {
  const metrics = parseMetrics(project.metrics);

  return (
    /* Matches About/Experience/Skills: bleeds to viewport edges */
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HERO — same structure as About / Experience pages
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col px-5 sm:px-10 xl:px-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 88% 12%, rgba(37,99,235,0.04) 0%, transparent 50%)",
        }}
      >
        {/* Ghost number — matches clamp / opacity from About/Experience */}
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
          {projectIndex}
        </div>

        {/* Meta bar — label left, Chapter right, border-b */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-label text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Selected Work
          </Link>
          <span className="text-label text-muted-foreground">
            Chapter {projectIndex}
          </span>
        </motion.div>

        {/* Hero content */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">

          {/* Category label */}
          {project.category && (
            <motion.p
              {...fadeUp(0.1)}
              className="text-label text-muted-foreground mb-5 uppercase tracking-widest"
            >
              {project.category}
            </motion.p>
          )}

          {/* Title — clip reveal, first word in accent */}
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.15)} className="block leading-[0.95]">
              <span className="text-primary">
                {project.title.split(" ")[0]}
              </span>
              {project.title.split(" ").length > 1 && (
                <span className="text-foreground">
                  {" "}
                  {project.title.split(" ").slice(1).join(" ")}
                </span>
              )}
            </motion.div>
          </div>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="mt-8 h-px bg-border"
          />

          {/* Description / hook */}
          {project.description && (
            <motion.p
              {...fadeUp(0.5)}
              className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              {project.description}
            </motion.p>
          )}

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mt-8 h-px bg-border"
          />

          {/* Meta row: role · timeline · links */}
          <motion.div
            {...fadeUp(0.65)}
            className="mt-8 pb-14 md:pb-20 flex flex-wrap items-center gap-3"
          >
            {/* Role */}
            {project.role && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5 shrink-0 opacity-60" />
                {project.role}
              </span>
            )}
            {project.role && (project.timeline || project.githubUrls.length > 0 || project.demoUrl) && (
              <span className="text-border select-none">·</span>
            )}

            {/* Timeline */}
            {project.timeline && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5 shrink-0 opacity-60" />
                {project.timeline}
              </span>
            )}
            {project.timeline && (project.githubUrls.length > 0 || project.demoUrl) && (
              <span className="text-border select-none">·</span>
            )}

            {/* GitHub */}
            {project.githubUrls.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {project.githubUrls.map((url, i) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm gap-2"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    GitHub {project.githubUrls.length > 1 ? i + 1 : ""}
                  </a>
                ))}
              </div>
            )}

            {/* Live Demo */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HERO IMAGE — full-bleed, no border, rounded-3xl
      ══════════════════════════════════════════════════════════════ */}
      {project.imageUrl && (
        <section className="w-full px-5 sm:px-10 xl:px-16 py-8 md:py-12">
          <motion.div
            {...scrollFadeUp(0)}
            className="w-full relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-card"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover object-top"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNGY0ZjUiLz48L3N2Zz4="
              sizes="100vw"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          AT-A-GLANCE STRIP (computed, no data entry needed)
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full px-5 sm:px-10 xl:px-16 py-10 md:py-12 max-w-5xl mx-auto">
        <motion.div
          {...scrollFadeUp(0)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden"
        >
          {[
            { label: "Stack Size", value: `${project.techStack.length} Technologies` },
            { label: "Category", value: project.category ?? "—" },
            { label: "Status", value: project.isActive ? "Live" : "Archived" },
            { label: "Type", value: project.isFeatured ? "Featured" : "Project" },
          ].map((item, idx) => (
            <div key={idx} className="bg-background px-6 py-5 flex flex-col gap-1">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                {item.label}
              </span>
              <span
                className="text-sm font-semibold text-foreground leading-snug"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          THE BRIEF — Problem + Approach (with single-block fallback)
      ══════════════════════════════════════════════════════════════ */}
      {project.fullDescription && (() => {
        const { problem, approach } = parseBrief(project.fullDescription);
        return (
          <section className="w-full px-5 sm:px-10 xl:px-16 py-16 md:py-24 max-w-5xl mx-auto">
            {approach ? (
              /* Two-column split: Problem | Approach */
              <motion.div {...scrollFadeUp(0)}>
                <p className="text-label text-muted-foreground mb-10 uppercase tracking-widest">
                  The Brief
                </p>
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-4">
                      Problem
                    </p>
                    <p className="text-base md:text-lg text-foreground leading-relaxed">
                      {problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-4">
                      Approach
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {approach}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Single-block fallback when no \n\n separator exists */
              <motion.div {...scrollFadeUp(0)} className="max-w-2xl">
                <p className="text-label text-muted-foreground mb-8 uppercase tracking-widest">
                  The Brief
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {problem}
                </p>
              </motion.div>
            )}
          </section>
        );
      })()}

      {/* ══════════════════════════════════════════════════════════════
          IMPACT METRICS — only when real data exists
      ══════════════════════════════════════════════════════════════ */}
      {metrics && (
        <section className="w-full bg-muted/30 py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-10 xl:px-16">
            <motion.p
              {...scrollFadeUp(0)}
              className="text-label text-muted-foreground mb-10 uppercase tracking-widest"
            >
              Impact
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {metrics.map((m, idx) => (
                <motion.div
                  key={idx}
                  {...scrollFadeUp(0.08 * idx)}
                  className="flex flex-col"
                >
                  <span
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {m.value}
                  </span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          KEY HIGHLIGHTS
      ══════════════════════════════════════════════════════════════ */}
      {project.highlights.length > 0 && (
        <section className="w-full px-5 sm:px-10 xl:px-16 py-16 md:py-24 max-w-5xl mx-auto">
          <motion.div {...scrollFadeUp(0)}>
            <p className="text-label text-muted-foreground mb-10 uppercase tracking-widest">
              Key Highlights
            </p>
            <ul className="space-y-0 max-w-2xl divide-y divide-border">
              {project.highlights.map((item, idx) => (
                <motion.li
                  key={idx}
                  {...scrollFadeUp(0.04 * idx)}
                  className="flex gap-8 py-8"
                >
                  <span
                    className="text-label font-mono text-primary shrink-0 w-6 text-right mt-1"
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TECH STACK — grouped by category
      ══════════════════════════════════════════════════════════════ */}
      {project.techStack.length > 0 && (() => {
        const groups = groupByCategory(project.techStack);
        const categoryOrder = ["Frontend","Backend","Database","DevOps","AI","Other"];
        const activeGroups = categoryOrder.filter((c) => groups[c]?.length);
        return (
          <section className="w-full px-5 sm:px-10 xl:px-16 py-16 md:py-24 max-w-5xl mx-auto">
            <motion.div {...scrollFadeUp(0)}>
              <p className="text-label text-muted-foreground mb-10 uppercase tracking-widest">
                Built With
              </p>
              <div className="space-y-8">
                {activeGroups.map((cat, idx) => (
                  <motion.div key={cat} {...scrollFadeUp(0.05 * idx)} className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest w-20 shrink-0 pt-1">
                      {cat}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {groups[cat].map((tech) => (
                        <span
                          key={tech}
                          className="btn btn-outline btn-sm pointer-events-none select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        );
      })()}

      {/* ══════════════════════════════════════════════════════════════
          NEXT PROJECT — compact card, canonical order
      ══════════════════════════════════════════════════════════════ */}
      <div className="px-5 sm:px-10 xl:px-16 pb-20 pt-4 max-w-4xl mx-auto">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block w-full bg-card border border-border/50 rounded-3xl p-6 md:p-10 transition-all duration-300 hover:bg-muted/50 hover:scale-[1.01] hover:shadow-md shadow-sm"
        >
          <motion.div
            {...scrollFadeUp(0)}
            className="flex items-center justify-between gap-6"
          >
            <div className="min-w-0">
              <p className="text-label text-muted-foreground mb-2 uppercase tracking-widest">
                Next Project
              </p>
              <h2
                className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors truncate"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {nextProject.title}
              </h2>
            </div>
            <div className="h-12 w-12 shrink-0 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        </Link>
      </div>

    </div>
  );
}
