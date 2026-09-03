"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, GitFork, X, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, Suspense, useRef, useState, useEffect, useTransition } from "react";
import { getPaginatedTemplates } from "@/app/actions/projectActions";
import { CollaborateCTA } from "./CollaborateCTA";

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

/* ── Animation helpers ──────────────────────────────────────── */
const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

function FeaturedProjectCard({ proj, index, onFilter }: { proj: ProjectRecord, index: number, onFilter: (tech: string) => void }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 5% subtle parallax offset: -5% to +5%
  const yOffset = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const transformY = prefersReducedMotion ? "0%" : yOffset;

  return (
    <motion.article
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...springTransition, delay: prefersReducedMotion ? 0 : index * 0.1 }}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 items-center mb-24 last:mb-0"
    >
      {/* Image Area - takes up ~60% on desktop */}
      <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] relative rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
        {proj.imageUrl ? (
          <Link href={`/projects/${proj.slug}`} className="block w-full h-full relative overflow-hidden">
            <motion.div style={{ y: transformY }} className="w-full h-[110%] -top-[5%] relative">
              <Image
                src={proj.imageUrl}
                alt={proj.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNGY0ZjUiLz48L3N2Zz4="
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          </Link>
        ) : (
          <Link href={`/projects/${proj.slug}`} className="flex w-full h-full items-center justify-center">
            <span
              className="text-4xl font-bold text-muted-foreground/30"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {proj.title.slice(0, 2).toUpperCase()}
            </span>
          </Link>
        )}
      </div>

      {/* Content Area - takes up ~40% on desktop */}
      <div className="w-full md:w-2/5 flex flex-col flex-1 py-4 md:py-8">
        <div className="space-y-4">
          <Link href={`/projects/${proj.slug}`}>
            <h3
              className="text-2xl md:text-3xl font-semibold text-foreground leading-snug group-hover:text-secondary transition-colors"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {proj.title}
            </h3>
          </Link>
          {proj.description && (
            <p className="text-base text-muted-foreground leading-relaxed">
              {proj.description}
            </p>
          )}
        </div>

        {proj.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {proj.techStack.map((tech) => (
              <button
                key={tech}
                onClick={(e) => {
                  e.preventDefault();
                  onFilter(tech);
                }}
                className="badge hover:bg-foreground hover:text-background transition-colors bg-background"
              >
                {tech}
              </button>
            ))}
          </div>
        )}

        {(proj.githubUrls.length > 0 || proj.demoUrl) && (
          <div className="flex gap-3 pt-8 mt-auto">
            {proj.githubUrls.length > 0 && (
              <a
                href={proj.githubUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 justify-center gap-2"
              >
                <GitFork className="w-4 h-4" />
                Code
              </a>
            )}
            {proj.demoUrl && (
              <a
                href={proj.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-1 justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsClient({
  featuredProjects,
  initialTemplates,
  allTechStacks
}: {
  featuredProjects: ProjectRecord[];
  initialTemplates: ProjectRecord[];
  allTechStacks: (readonly string[])[];
}) {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading projects...</div>}>
      <ProjectsContent 
        featuredProjects={featuredProjects} 
        initialTemplates={initialTemplates} 
        allTechStacks={allTechStacks} 
      />
    </Suspense>
  );
}

function ProjectsContent({
  featuredProjects,
  initialTemplates,
  allTechStacks
}: {
  featuredProjects: ProjectRecord[];
  initialTemplates: ProjectRecord[];
  allTechStacks: (readonly string[])[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTech = searchParams.get("tech");

  // Keep featured projects fully client-filtered (since we load all of them)
  const filteredFeatured = useMemo(() => {
    if (!selectedTech) return featuredProjects;
    return featuredProjects.filter((p) => p.techStack.includes(selectedTech));
  }, [featuredProjects, selectedTech]);

  const popularTechs = useMemo(() => {
    const counts: Record<string, number> = {};
    allTechStacks.forEach((stack) =>
      stack.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      })
    );
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
      .slice(0, 8);
  }, [allTechStacks]);

  const handleFilter = (tech: string | null) => {
    if (tech === selectedTech || tech === null) {
      router.replace(pathname, { scroll: false });
    } else {
      const params = new URLSearchParams();
      params.set("tech", tech);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const [templates, setTemplates] = useState<ProjectRecord[]>(initialTemplates);
  const [hasMore, setHasMore] = useState(initialTemplates.length === 9);
  const [isPending, startTransition] = useTransition();

  const prefersReducedMotion = useReducedMotion();

  const handleLoadMore = async () => {
    startTransition(async () => {
      try {
        const nextBatch = await getPaginatedTemplates(templates.length, 9, selectedTech);
        setTemplates((prev) => {
          // Avoid duplicates if called twice quickly
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = nextBatch.filter((p: ProjectRecord) => !existingIds.has(p.id));
          return [...prev, ...newItems];
        });
        setHasMore(nextBatch.length === 9);
      } catch (err) {
        console.error("Failed to load more templates:", err);
      }
    });
  };

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
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition }}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Selected Work</span>
          <span className="text-label text-muted-foreground">Chapter 03</span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 1 } : { y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ ...springTransition, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="block leading-[0.95]"
            >
              <span className="text-foreground">What I </span>
              <span className="text-secondary">Build.</span>
            </motion.div>
          </div>

          {/* Role line */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            A selection of full-stack applications, AI integrations, and tools.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROJECTS GRID & FILTER
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Section header & Filter */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...springTransition }}
            className="flex flex-col gap-8 mb-16"
          >
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleFilter(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  !selectedTech
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                All Projects
              </button>
              {popularTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleFilter(tech)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border flex items-center gap-1.5 ${
                    selectedTech === tech
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {tech}
                </button>
              ))}
              {selectedTech && !popularTechs.includes(selectedTech) && (
                <button
                  onClick={() => handleFilter(selectedTech)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors border flex items-center gap-1.5 bg-foreground text-background border-foreground"
                >
                  {selectedTech}
                  <X className="w-3.5 h-3.5 opacity-70" />
                </button>
              )}
            </div>
          </motion.div>

          {(filteredFeatured.length === 0 && templates.length === 0) && (
             <p className="text-muted-foreground text-center py-12">No projects found matching the filter.</p>
          )}

          {/* ── Featured Projects ── */}
          {filteredFeatured.length > 0 && (
            <div className="flex flex-col mb-16 md:mb-24 relative z-10">
              {filteredFeatured.map((proj, idx) => (
                <FeaturedProjectCard
                  key={proj.id}
                  proj={proj}
                  index={idx}
                  onFilter={handleFilter}
                />
              ))}
            </div>
          )}

          {/* ── Other Projects Grid ── */}
          {templates.length > 0 && (
            <>
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition }}
                className="flex items-center justify-between pt-4 pb-6 border-b border-border mb-12 md:mb-16"
              >
                <h2 className="text-xl md:text-3xl font-semibold text-foreground tracking-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
                  Templates &amp; Experiments.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
                {templates.map((proj, index) => (
                  <motion.article
                    key={proj.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      ...springTransition,
                      delay: prefersReducedMotion ? 0 : (index % 6) * 0.08,
                    }}
                    className="card card-hover flex flex-col overflow-hidden group h-full"
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
                        {/* We use demoUrl for templates if githubUrls doesn't exist, else github. Or just slug. */}
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
                            <button
                              key={tech}
                              onClick={(e) => {
                                e.preventDefault();
                                handleFilter(tech);
                              }}
                              className={`badge hover:bg-foreground hover:text-background transition-colors ${
                                selectedTech === tech ? "bg-foreground text-background" : ""
                              }`}
                            >
                              {tech}
                            </button>
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
              
              {hasMore && (
                <div className="flex justify-center mt-12 mb-24">
                  <button
                    onClick={handleLoadMore}
                    disabled={isPending}
                    className="btn btn-outline px-8 py-3 rounded-full text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
                  >
                    {isPending ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════ */}
      <CollaborateCTA />

    </div>
  );
}
