"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ─────────────────────────────────────────────── */
interface UserRecord { name: string | null; bio: string | null }
interface ProjectRecord { id: number; title: string; slug: string; description: string | null; imageUrl: string | null }
interface ExperienceRecord { id: number; title: string; company: string; period: string }

/* ── Stagger helper ─────────────────────────────────────── */
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

/* ── Clip-reveal from bottom ─────────────────────────────── */
function reveal(delay = 0) {
  return {
    initial: { y: "105%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { duration: 0.75, delay, ease: "easeOut" as const },
  };
}

const STACK = [
  "Next.js","Python","PostgreSQL","Snowflake","Prisma","LangChain",
  "AWS","TypeScript","FastAPI","N8N","React Native","Pinecone",
  "OpenAI","Tailwind CSS","Vercel","LLM Engineering",
];

export function HomeClient({ user, featuredProjects, experiences }: {
  user: UserRecord | null;
  featuredProjects: ProjectRecord[];
  experiences: ExperienceRecord[];
}) {
  const name = user?.name ?? "CVS Charan";
  const bio = user?.bio ?? "I design and ship production-grade applications that fuse modern AI capabilities with thoughtful engineering — LLM integrations, data pipelines, and full-stack systems built to last.";

  const projects = featuredProjects.length > 0 ? featuredProjects : [
    { id: -1, title: "Antigravity AI Portfolio", slug: "antigravity-ai", description: "Full-stack CMS — Next.js 16, Prisma 8, NextAuth, custom Admin Dashboard.", imageUrl: null },
    { id: -2, title: "Data Analytics Platform", slug: "data-analytics", description: "Scalable ingestion & visualisation platform — AWS, PostgreSQL, Python, Snowflake.", imageUrl: null },
  ];

  const exps = experiences.length > 0 ? experiences : [
    { id: -1, title: "AI-Augmented Full-Stack Developer", company: "Freelance", period: "2023 – Present" },
    { id: -2, title: "Data Analytics Specialist", company: "Corporate Tech", period: "2020 – 2023" },
  ];

  const marquee = [...STACK, ...STACK];

  return (
    <div className="-mt-28 -mx-5 md:-mx-10 bg-background overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          HERO — Manifesto style
      ════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex flex-col px-5 sm:px-10 xl:px-16 overflow-hidden"
        style={{
          background: [
            "radial-gradient(ellipse at 12% 55%, rgba(37,99,235,0.055) 0%, transparent 52%)",
            "radial-gradient(ellipse at 88% 18%, rgba(37,99,235,0.03) 0%, transparent 48%)",
          ].join(", "),
        }}
      >

        {/* Ghost "01" background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-24 right-4 sm:right-10 xl:right-16 font-bold text-foreground leading-none"
          style={{
            fontFamily: "var(--font-bricolage)",
            fontSize: "clamp(8rem, 22vw, 22rem)",
            opacity: 0.04,
            letterSpacing: "-0.05em",
          }}
        >
          01
        </div>

        {/* ── Top meta bar ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-24 md:pt-28 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">{name}</span>
          <div className="flex items-center gap-3">
            <span className="text-label text-muted-foreground">2024 · India</span>
            <span className="inline-flex items-center gap-1.5 text-label text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Available
            </span>
          </div>
        </motion.div>

        {/* ── Manifesto headline ── */}
        <div className="flex-1 flex flex-col justify-center py-10 md:py-14">

          {/* Two-line clip-reveal headline */}
          <div className="text-hero">
            <div className="overflow-hidden">
              <motion.span {...reveal(0.1)} className="block text-foreground">
                I build things
              </motion.span>
            </div>
            <div className="overflow-hidden mt-1">
              <motion.span {...reveal(0.22)} className="block text-secondary">
                that think.
              </motion.span>
            </div>
          </div>

          {/* Role line */}
          <motion.p
            {...fadeUp(0.42)}
            className="mt-6 md:mt-8 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            Full-Stack Engineer <span className="opacity-40">×</span> AI / LLM{" "}
            <span className="opacity-40">×</span> Data Analytics
          </motion.p>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-6 md:mt-8 h-px bg-border"
          />

          {/* Bio */}
          <motion.p
            {...fadeUp(0.52)}
            className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {bio}
          </motion.p>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mt-6 md:mt-8 h-px bg-border"
          />

          {/* ── CTAs + social ── */}
          <motion.div
            {...fadeUp(0.65)}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-10 md:pb-16"
          >
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-primary btn-lg group">
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Get in Touch
              </Link>
            </div>

            <div className="flex items-center gap-5 sm:gap-6">
              {[
                { label: "GitHub", href: "https://github.com/CVSCharan" },
                { label: "LinkedIn", href: "https://linkedin.com/in/cvscharan" },
                { label: "Email", href: "mailto:charan.cvs@gmail.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MARQUEE TICKER
      ════════════════════════════════════════════════════ */}
      <div className="w-full overflow-hidden border-y border-border bg-muted/20 py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {marquee.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/55 shrink-0"
            >
              <span className="mx-5">{t}</span>
              <span className="opacity-30">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          BENTO GRID
      ════════════════════════════════════════════════════ */}
      <section className="w-full bg-muted/25 px-5 sm:px-10 xl:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Currently building — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <Link
              href={`/projects#${projects[0].slug}`}
              className="group card card-hover h-full min-h-[190px] p-6 md:p-7 flex flex-col justify-between relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 opacity-[0.12] pointer-events-none"
                style={{ background: "radial-gradient(circle, var(--secondary), transparent 65%)", transform: "translate(25%,-25%)" }}
              />
              <p className="text-label text-muted-foreground">Currently building</p>
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold text-foreground group-hover:text-secondary transition-colors leading-snug mt-3"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {projects[0].title}
                  <ArrowUpRight className="inline-block w-5 h-5 ml-1.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                {projects[0].description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{projects[0].description}</p>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Years */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.07 }}
          >
            <div className="card h-full min-h-[150px] p-6 md:p-7 flex flex-col justify-between">
              <p className="text-label text-muted-foreground">Experience</p>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-secondary tracking-tighter leading-none" style={{ fontFamily: "var(--font-bricolage)" }}>4+</p>
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">years</p>
              </div>
            </div>
          </motion.div>

          {/* Available */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <Link href="/contact" className="group card card-hover h-full min-h-[150px] p-6 md:p-7 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <p className="text-label text-muted-foreground">Status</p>
              </div>
              <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-secondary transition-colors leading-snug">
                Available for new opportunities
              </p>
            </Link>
          </motion.div>

          {/* AI Assistant — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="col-span-2 md:col-span-3"
          >
            <div className="group card h-full min-h-[130px] p-6 md:p-7 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center gap-2 relative z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <p className="text-label text-muted-foreground">Ask AI</p>
              </div>
              
              <div className="mt-4 md:mt-0 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-foreground leading-snug group-hover:text-secondary transition-colors"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    Chat with Resume.
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    Ask my AI clone about my experience, skills, and projects.
                  </p>
                </div>
                <button
                  onClick={() => alert("Chat feature coming soon")}
                  className="btn btn-outline btn-sm shrink-0 w-fit group-hover:border-foreground/30 group-hover:text-foreground transition-all"
                >
                  Start Chat
                </button>
              </div>

              {/* Subtle background accent */}
              <div
                className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.06] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.12]"
                style={{ background: "radial-gradient(circle, var(--foreground), transparent 70%)", transform: "translate(20%, 40%)" }}
              />
            </div>
          </motion.div>

          {/* Projects count */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card h-full min-h-[130px] p-6 md:p-7 flex flex-col justify-between">
              <p className="text-label text-muted-foreground">Shipped</p>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-secondary tracking-tighter leading-none" style={{ fontFamily: "var(--font-bricolage)" }}>20+</p>
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          EXPERIENCE
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-label text-muted-foreground mb-2">Work History</p>
              <h2 className="text-headline text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>The Journey.</h2>
            </div>
            <Link href="/experience" className="btn btn-outline btn-md group shrink-0">
              Full Timeline <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <ol>
            {exps.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-5 border-b border-border last:border-b-0 cursor-default"
              >
                <span className="text-label text-muted-foreground/30 tabular-nums text-right select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span
                    className="text-base sm:text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-150"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >{exp.title}</span>
                  <span className="text-sm text-muted-foreground ml-2">· {exp.company}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground/50 shrink-0">{exp.period}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border bg-muted/20 px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-label text-muted-foreground mb-2">Selected Work</p>
              <h2 className="text-headline text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>What I Build.</h2>
            </div>
            <Link href="/projects" className="btn btn-outline btn-md group shrink-0">
              All Projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/projects#${p.slug}`} className="card card-hover flex flex-col overflow-hidden group block">
                  {p.imageUrl ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image src={p.imageUrl} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                    </div>
                  ) : (
                    <div className="h-44 w-full bg-muted flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground/20" style={{ fontFamily: "var(--font-bricolage)" }}>
                        {p.title.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-semibold text-foreground leading-snug group-hover:text-secondary transition-colors" style={{ fontFamily: "var(--font-bricolage)" }}>{p.title}</h3>
                      {p.description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 transition-all group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <p className="text-label text-muted-foreground mb-2">Let&apos;s Collaborate</p>
            <h2 className="text-headline text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>Have a project in mind?</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-3">
              Open to ambitious projects, creative ideas, and new opportunities to build something meaningful.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="btn btn-primary btn-lg group">
              Get in Touch <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/resume" className="btn btn-outline btn-lg">View Resume</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
