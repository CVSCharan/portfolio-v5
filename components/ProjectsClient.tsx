"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────── */
interface ProjectRecord {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  techStack: readonly string[];
  githubUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
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

export default function ProjectsClient({
  projects,
}: {
  projects: ProjectRecord[];
}) {
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
        {/* Ghost "03" */}
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
          03
        </div>

        {/* ── Meta bar ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Selected Work</span>
          <span className="text-label text-muted-foreground">Chapter 03</span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">What I </span>
              <span className="text-secondary">Build.</span>
            </motion.div>
          </div>

          {/* Role line */}
          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            A selection of full-stack applications, AI integrations, and tools.
          </motion.p>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROJECTS GRID
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
              <p className="text-label text-muted-foreground mb-2">Portfolio</p>
              <h2
                className="text-headline text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Featured Projects.
              </h2>
            </div>
          </motion.div>

          {/* Grid */}
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No projects found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj, i) => (
                <motion.article
                  key={proj.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className="card card-hover flex flex-col overflow-hidden group"
                >
                  {/* Image Area */}
                  {proj.imageUrl ? (
                    <Link href={`/projects/${proj.slug}`} className="h-48 w-full overflow-hidden border-b border-border/50 block relative">
                      <Image
                        src={proj.imageUrl}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNGY0ZjUiLz48L3N2Zz4="
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  ) : (
                    <Link href={`/projects/${proj.slug}`} className="h-48 w-full bg-muted/40 border-b border-border/50 flex items-center justify-center block">
                      <span
                        className="text-3xl font-bold text-muted-foreground/30"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                      >
                        {proj.title.slice(0, 2).toUpperCase()}
                      </span>
                    </Link>
                  )}

                  {/* Content Area */}
                  <div className="flex flex-col flex-1 p-5 md:p-6 gap-5">
                    <div className="space-y-2">
                      <Link href={`/projects/${proj.slug}`}>
                        <h3
                          className="text-lg font-semibold text-foreground leading-snug group-hover:text-secondary transition-colors"
                          style={{ fontFamily: "var(--font-bricolage)" }}
                        >
                          {proj.title}
                        </h3>
                      </Link>
                      {proj.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                      )}
                    </div>

                    {proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {proj.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="badge">
                            {tech}
                          </span>
                        ))}
                        {proj.techStack.length > 4 && (
                          <span className="badge text-muted-foreground/60">
                            +{proj.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {(proj.githubUrl || proj.demoUrl) && (
                      <div className="flex gap-2 pt-4 border-t border-border mt-1">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm flex-1 justify-center gap-1.5"
                          >
                            <GitFork className="w-3.5 h-3.5" />
                            Code
                          </a>
                        )}
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm flex-1 justify-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
