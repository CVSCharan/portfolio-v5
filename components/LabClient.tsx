"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, GitFork } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChapterHero } from "./ChapterHero";

/* ── Types ─────────────────────────────────────────────────── */
interface ProjectRecord {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  techStack: readonly string[];
  githubUrls: readonly string[];
  demoUrl: string | null;
  imageUrl: string | null;
  order: number;
  isFeatured: boolean;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

export default function LabClient({
  experiments,
}: {
  experiments: ProjectRecord[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <ChapterHero
        chapter="08"
        metaLabel="Experiments"
        titlePrefix="The "
        titleAccent="Lab."
        description="A collection of technical work-in-progress, raw implementations, and unpolished experiments. Not meant for production, just for learning."
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ════════════════════════════════════════════════════
          EXPERIMENTS GRID
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {experiments.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No experiments found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {experiments.map((proj, index) => (
                <motion.article
                  key={proj.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "150px" }}
                  transition={{
                    ...springTransition,
                    delay: prefersReducedMotion ? 0 : (index % 3) * 0.05,
                  }}
                  className="card card-hover flex flex-col overflow-hidden group h-full border-border/50"
                >
                  {/* Image Area */}
                  {proj.imageUrl ? (
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="h-40 w-full overflow-hidden border-b border-border/50 block relative shrink-0"
                    >
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
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="h-40 w-full bg-muted/40 border-b border-border/50 flex items-center justify-center block shrink-0"
                    >
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
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                        {proj.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="badge text-muted-foreground bg-muted/30"
                          >
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

                    {(proj.githubUrls.length > 0 || proj.demoUrl) && (
                      <div className="flex gap-2 pt-4 border-t border-border mt-1">
                        {proj.githubUrls.length > 0 && (
                          <a
                            href={proj.githubUrls[0]}
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
      {/* Note: Deliberately no CollaborateCTA here based on the strict rules */}
    </div>
  );
}
