"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Code2, ArrowUpRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface UserRecord {
  id: number;
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
}

interface ProjectRecord {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
}

const STATS = [
  { value: "4+",  label: "Years Experience" },
  { value: "30+", label: "Projects Shipped" },
  { value: "12+", label: "Technologies" },
  { value: "5+",  label: "Open Source" },
];

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", 
  "Prisma", "Python", "Tailwind CSS", "AWS", "OpenAI",
  "Docker", "GraphQL", "Redis"
];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

export function HomeClient({ 
  user, 
  featuredProject 
}: { 
  user: UserRecord | null;
  featuredProject: ProjectRecord | null;
}) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a foundation in Data Analytics. I build intelligent, scalable web applications using LLMs, modern cloud infrastructure, and clean engineering principles.";

  return (
    <div className="w-full max-w-6xl mx-auto pt-4 md:pt-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        
        {/* ── 1. Hero Card (Span 2) ── */}
        <motion.section 
          {...fadeUp(0)}
          className="md:col-span-2 card flex flex-col justify-between p-8 md:p-12 min-h-[360px]"
        >
          <div className="space-y-6 max-w-2xl">
            <p className="text-label text-primary flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Available for new opportunities
            </p>

            <h1
              className="text-display text-foreground leading-[1.05]"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {name}. <br />
              <span className="text-muted-foreground">Full-Stack Engineer.</span>
            </h1>

            <p className="text-base text-muted-foreground leading-[1.8]">
              {bio}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            <Link href="/projects" className="btn btn-primary btn-md group">
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" className="btn btn-outline btn-md">
              Get in Touch
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto hidden sm:flex">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>India — Remote worldwide</span>
            </div>
          </div>
        </motion.section>

        {/* ── 2. Featured Project Card (Span 1) ── */}
        <motion.section 
          {...fadeUp(0.1)}
          className="md:col-span-1 card relative overflow-hidden group min-h-[300px] md:min-h-[360px] flex flex-col"
        >
          {featuredProject ? (
            <Link href={`/projects#${featuredProject.slug}`} className="absolute inset-0 block">
              {featuredProject.imageUrl ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={featuredProject.imageUrl} 
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  {/* Subtle overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <Code2 className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}
              
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                <p className="text-label text-primary-foreground/80">Featured Work</p>
                <h3 className="text-xl font-bold text-white flex items-center justify-between" style={{ fontFamily: "var(--font-bricolage)" }}>
                  {featuredProject.title}
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </h3>
              </div>
            </Link>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Code2 className="w-10 h-10 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">No featured project available.</p>
            </div>
          )}
        </motion.section>

        {/* ── 3. Tech Stack Marquee (Span 3) ── */}
        <motion.section 
          {...fadeUp(0.2)}
          className="md:col-span-3 card overflow-hidden py-6 md:py-8 flex items-center"
        >
          <div className="flex w-max animate-marquee gap-8 md:gap-12 pr-8 md:pr-12">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span 
                key={i} 
                className="text-lg md:text-2xl font-bold text-muted-foreground/40 hover:text-foreground transition-colors whitespace-nowrap cursor-default"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── 4. Stats Card (Span 2) ── */}
        <motion.section 
          {...fadeUp(0.3)}
          className="md:col-span-2 card p-8 md:p-10"
        >
          <p className="text-label text-muted-foreground mb-6">By the Numbers</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-4xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {value}
                </span>
                <span className="text-sm font-medium text-muted-foreground leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 5. Resume Action Card (Span 1) ── */}
        <motion.section 
          {...fadeUp(0.4)}
          className="md:col-span-1 card p-8 md:p-10 card-hover flex flex-col justify-center items-start group"
        >
          <Link href="/resume" className="w-full flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-bricolage)" }}>
                Interactive Resume
              </h3>
              <p className="text-sm text-muted-foreground">
                View my full career timeline, skills matrix, and download CV.
              </p>
            </div>
            <div className="mt-2 text-sm font-semibold text-primary flex items-center gap-1">
              Explore Resume <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </motion.section>

      </div>
    </div>
  );
}