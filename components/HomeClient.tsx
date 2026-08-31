"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, ArrowUpRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load the 3D scene to ensure TTI and mobile performance aren't blocked
const SpatialHero3D = dynamic(() => import("./SpatialHero3D"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  )
});

interface UserRecord {
  name: string | null;
  bio: string | null;
}

interface ProjectRecord {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

interface ExperienceRecord {
  id: number;
  title: string;
  company: string;
  period: string;
}

export function HomeClient({ 
  user,
  featuredProjects,
  experiences
}: { 
  user: UserRecord | null;
  featuredProjects: ProjectRecord[];
  experiences: ExperienceRecord[];
}) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a foundation in Data Analytics. I specialize in building intelligent and scalable web and mobile applications that leverage LLMs, prompt engineering, and AI automation.";

  // Fallback to dummy data if the database is currently empty so the layout is visible
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : [
    {
      id: -1,
      title: "Antigravity AI Portfolio",
      slug: "antigravity-ai",
      description: "A highly interactive, fluid 3D portfolio powered by React Three Fiber, Next.js, and Prisma 8.",
      imageUrl: null,
    },
    {
      id: -2,
      title: "Data Analytics Platform",
      slug: "data-analytics",
      description: "Scalable data ingestion and visualization platform built with AWS, PostgreSQL, and Python.",
      imageUrl: null,
    }
  ];

  const displayExperiences = experiences.length > 0 ? experiences : [
    {
      id: -1,
      title: "AI-Augmented Full-Stack Developer",
      company: "Independent / Freelance",
      period: "2023 - Present",
    },
    {
      id: -2,
      title: "Data Analytics Specialist",
      company: "Corporate Tech",
      period: "2020 - 2023",
    }
  ];

  return (
    <div className="w-full relative">
      {/* ── 3D Canvas Background (Fixed Full Screen) ── */}
      <div className="fixed inset-0 w-full h-[100svh] z-[-1] bg-background">
        <SpatialHero3D />
      </div>

      {/* ── SECTION A: HUD HERO (100svh) ── */}
      <div className="relative z-10 w-full min-h-[calc(100svh-180px)] flex flex-col justify-between pointer-events-none mb-32 max-w-6xl mx-auto px-5 md:px-0">
        {/* HUD Top: Massive Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="pt-4 md:pt-12 pointer-events-auto max-w-full flex flex-col items-start text-left"
        >
          <h1 
            className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-foreground leading-[0.9] tracking-tighter"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            {name}.
          </h1>
          <p 
            className="text-xl md:text-3xl text-muted-foreground mt-4 md:mt-6 font-medium max-w-3xl" 
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Building uncompromising digital experiences & intelligent data systems.
          </p>
        </motion.div>

        {/* HUD Bottom: Bio, Action & Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-start text-left gap-10 pb-12 md:pb-16 pointer-events-auto max-w-xl"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-[1.75]">
            {bio}
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4">
            <Link href="/projects" className="btn btn-primary btn-lg group">
              Enter Portfolio 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/experience" className="text-base font-semibold text-foreground hover:text-secondary transition-colors underline-offset-4 hover:underline">
              View Experience
            </Link>
        </motion.div>

        {/* Floating Deck: Core Stack & Status (Right side) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-8 md:mt-0 md:absolute md:bottom-16 md:right-12 lg:right-24 xl:right-32 flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-2xl z-20 pointer-events-auto w-full md:w-auto max-w-sm"
        >
           <div className="space-y-1.5">
             <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground/80">Core Stack</p>
             <p className="text-sm font-medium text-foreground/90 leading-relaxed">
               React, Next.js, Node.js, Python,<br/>PostgreSQL, Prisma, Tailwind, AWS
             </p>
           </div>
           
           <div className="w-full h-px bg-border/50" />
           
           <div className="space-y-1.5">
             <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground/80">Status</p>
             <p className="text-sm font-medium text-foreground flex items-center gap-2.5">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
               </span>
               Available for opportunities
             </p>
           </div>
        </motion.div>
      </div>

      {/* ── SCROLLABLE SECTIONS (Glimpses) ── */}
      {/* Container is completely transparent so the 3D globe stays visible while scrolling */}
      <div className="relative z-20 py-24 md:py-32 -mx-5 px-5 md:-mx-10 md:px-10">
        
        {/* ── SECTION B: EXPERIENCE GLIMPSE ── */}
        <section className="max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column: Typography & Action */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <h2 className="text-headline text-foreground mb-4">The Journey So Far.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: "var(--font-bricolage)" }}>
                From Data Analytics to Full-Stack Engineering, I have built AI-driven platforms and cross-platform architecture that scale.
              </p>
              <Link href="/experience" className="btn btn-outline btn-md group mt-auto">
                Full Experience <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Column: Cards */}
            <div className="lg:col-span-7 space-y-4">
              {displayExperiences.map((exp) => (
                <div key={exp.id} className="card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 card-hover shadow-sm backdrop-blur-md bg-card/90">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>{exp.title}</h3>
                      <p className="text-base text-muted-foreground">{exp.company}</p>
                    </div>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground md:text-right">
                    {exp.period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION C: FEATURED PROJECTS GLIMPSE ── */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column: Typography & Action */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <h2 className="text-headline text-foreground mb-4">Engineering Philosophy.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: "var(--font-bricolage)" }}>
                I believe in building uncompromising digital experiences and intelligent data systems using modern frameworks and Large Language Models.
              </p>
              <Link href="/projects" className="btn btn-outline btn-md group mt-auto">
                View All Projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Column: Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayProjects.map((project) => (
                <Link 
                  href={`/projects#${project.slug}`} 
                  key={project.id}
                  className="group rounded-2xl border border-border relative overflow-hidden min-h-[300px] flex flex-col transition-all duration-300 hover:border-primary"
                  style={{ 
                    backgroundColor: "var(--card-elevated)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)"
                  }}
                >
                  {project.imageUrl ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <Code2 className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2 z-10">
                    <h3 className={`text-xl font-bold flex items-center justify-between ${project.imageUrl ? "text-white" : "text-foreground"}`} style={{ fontFamily: "var(--font-bricolage)" }}>
                      {project.title}
                      <ArrowUpRight className={`w-5 h-5 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 ${project.imageUrl ? "text-white/50 group-hover:text-white" : "text-muted-foreground group-hover:text-foreground"}`} />
                    </h3>
                    {project.description && (
                      <p className={`text-xs line-clamp-2 mt-1 leading-relaxed ${project.imageUrl ? "text-white/80" : "text-muted-foreground"}`}>
                        {project.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}