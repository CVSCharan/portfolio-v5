"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, GitFork, X, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, Suspense, useRef, useState, useEffect, useTransition, useCallback } from "react";
import { getPaginatedTemplates } from "@/app/actions/projectActions";
import { CollaborateCTA } from "./CollaborateCTA";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";
import { ChapterHero } from "./ChapterHero";
import { projectOgUrl, projectCoverUrl } from "@/lib/og-url";

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

/* ── Animation config ───────────────────────────────────────── */
// Smooth cubic-bezier easing — no bounce, no spring
const easeTransition = {
  duration: 0.55,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

// Number characters used for the index flicker effect
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Micro-animation: cycles through random digits then lands on the real value */
function FlickerNumber({ value, inView }: { value: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState(value);
  const iterations = useRef(0);

  useEffect(() => {
    if (!inView) return;
    iterations.current = 0;
    const id = setInterval(() => {
      iterations.current += 1;
      if (iterations.current >= 8) {
        setDisplayed(value);
        clearInterval(id);
      } else {
        setDisplayed(DIGITS[Math.floor(Math.random() * DIGITS.length)]);
      }
    }, 40);
    return () => clearInterval(id);
  }, [inView, value]);

  return <>{displayed}</>;
}

function FeaturedProjectCard({ proj, index, onFilter }: { proj: ProjectRecord; index: number; onFilter: (tech: string) => void }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Deepened parallax: -8% to +8% — clearly perceptible but not distracting
  const yOffset = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const transformY = prefersReducedMotion ? "0%" : yOffset;

  // Formatted index e.g. "01", "02"
  const idxStr = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      // Pure opacity dissolve — no translation. Content doesn't "jump up".
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...easeTransition, delay: prefersReducedMotion ? 0 : index * 0.12 }}
      onAnimationComplete={() => setInView(true)}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center mb-24 last:mb-0"
    >
      {/* Image Area — ~60% on desktop */}
      <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] relative rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
        {/* Subtle left-edge accent line that grows in on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-10 rounded-l-2xl" />
        <Link href={`/projects/${proj.slug}`} className="block w-full h-full relative overflow-hidden">
          <motion.div style={{ y: transformY }} className="w-full h-[116%] -top-[8%] relative">
            <Image
              src={projectCoverUrl(proj)}
              alt={`${proj.title} — cover image`}
              fill
              // More restrained scale on hover
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </motion.div>
        </Link>
      </div>

      {/* Content Area — ~40% on desktop */}
      <div className="w-full md:w-2/5 flex flex-col flex-1 py-4 md:py-8">
        {/* Index counter with flicker on entry */}
        <span className="text-xs font-mono text-muted-foreground/50 tracking-[0.2em] uppercase mb-4 select-none tabular-nums">
          <FlickerNumber value={idxStr[0]} inView={inView} />
          <FlickerNumber value={idxStr[1]} inView={inView} />
          {" / Featured"}
        </span>

        <div className="space-y-4">
          <Link href={`/projects/${proj.slug}`}>
            <h3 className="text-headline text-foreground leading-snug group-hover:text-secondary transition-colors duration-300">
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
                onClick={(e) => { e.preventDefault(); onFilter(tech); }}
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
              <a href={proj.githubUrls[0]} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1 justify-center gap-2">
                <GitFork className="w-4 h-4" />
                Code
              </a>
            )}
            {proj.demoUrl && (
              <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 justify-center gap-2">
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

  const handleLoadMore = useCallback(() => {
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
  }, [templates.length, selectedTech]);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isPending) {
          handleLoadMore();
        }
      },
      { rootMargin: "400px" } // trigger well before the element comes into view
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, isPending, handleLoadMore]);


  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <ChapterHero
        chapter="03"
        metaLabel="Selected Work"
        titlePrefix="What I "
        titleAccent="Build."
        description="A selection of full-stack applications, AI integrations, and tools."
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ════════════════════════════════════════════════════
          PROJECTS GRID & FILTER
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Section header & Filter */}
          {/* Filter Bar — pure fade, no y jump */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...easeTransition }}
            className="flex flex-col gap-8 mb-16"
          >
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
              {/* Section heading — pure dissolve */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...easeTransition }}
                className="flex items-center justify-between pt-4 pb-6 border-b border-border mb-12 md:mb-16"
              >
                <h2 className="text-headline text-xl text-foreground tracking-tight">
                  Templates &amp; Experiments.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
                {templates.map((proj, index) => (
                  <motion.article
                    key={proj.id}
                    // Microscopic scale: card "materialises" rather than slides
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                    whileInView={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{
                      ...easeTransition,
                      // 80ms stagger — readable without feeling slow
                      delay: prefersReducedMotion ? 0 : (index % 3) * 0.08,
                    }}
                    className="card card-hover flex flex-col overflow-hidden group h-full"
                  >
                    {/* Image Area */}
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="h-40 w-full overflow-hidden border-b border-border/50 block relative shrink-0"
                    >
                      <Image
                        src={projectCoverUrl(proj)}
                        alt={`${proj.title} — cover image`}
                        fill
                        // Restrained zoom + subtle brightness lift
                        className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    {/* Content Area */}
                    <div className="flex flex-col flex-1 p-5 md:p-6 gap-5">
                      <div className="space-y-2">
                        {/* We use demoUrl for templates if githubUrls doesn't exist, else github. Or just slug. */}
                        <Link href={`/projects/${proj.slug}`}>
                          <h3
                            className="text-subtitle text-foreground leading-snug group-hover:text-secondary transition-colors"
                            
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
                
                {isPending && [1, 2, 3].map((i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
              <div ref={observerRef} className="h-4 w-full" />

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
