"use client";

import Link from "next/link";
import { Download, GitFork, Link2, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChapterHero } from "./ChapterHero";

/* ── Types ─────────────────────────────────────────────────── */
interface UserRecord {
  id: number;
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
  story: string | null;
  createdAt: string;
}

/* ── Animation helpers ──────────────────────────────────────── */
function fadeUp(delay = 0, prefersReducedMotion = false) {
  return {
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: prefersReducedMotion ? 0 : delay, ease: "easeOut" as const },
  };
}

export function AboutClient({
  user,
}: {
  user: UserRecord | null;
}) {
  const name = user?.name ?? "CVS Charan";
  const prefersReducedMotion = useReducedMotion();
  
  // Hardcoded for the new narrative (or we could rely on user.bio, but we want a specific vibe).
  // "The human behind the code, engineering mindset, personality"
  const bio =
    "I believe great software is built at the intersection of discipline and curiosity. I care deeply about the details—from writing resilient systems that handle failure gracefully, to designing interfaces that respect the user's time and attention. When I'm not writing code, I'm usually exploring new paradigms in AI, reading, or finding ways to simplify complex problems.";
    
  const story = user?.story ?? "My journey into software engineering wasn't a straight line, but a series of deep dives into things that fascinated me. I started by tinkering with data, trying to find the narrative hidden in rows and columns. That curiosity naturally evolved into building the systems that generate, process, and present that data.\n\nOver the years, I've transitioned from pure data analytics to full-stack engineering, finding my sweet spot where robust backend architecture meets intuitive frontend design. Today, my focus is heavily tilted towards AI integration—not just bolting on API calls, but fundamentally rethinking how applications can leverage LLMs to augment human capability.";

  return (
    /* Break out of layout's horizontal padding — same technique as home page */
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <ChapterHero
        chapter="02"
        metaLabel="About"
        titlePrefix=""
        titleAccent={name + "."}
        prefersReducedMotion={prefersReducedMotion}
      >
        {/* Role line */}
        <motion.p
          {...fadeUp(0.38, prefersReducedMotion ?? false)}
          className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
        >
          Curious Engineer{" "}
          <span className="opacity-40">×</span> Systems Thinker{" "}
          <span className="opacity-40">×</span> Builder
        </motion.p>

        {/* Location */}
        <motion.div
          {...fadeUp(0.45, prefersReducedMotion ?? false)}
          className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground/55"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>India — Available for remote worldwide</span>
        </motion.div>

        {/* Animated rule */}
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.52, ease: "easeOut" }}
          className="mt-8 h-px bg-border"
        />

        {/* Bio */}
        <motion.p
          {...fadeUp(0.58, prefersReducedMotion ?? false)}
          className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          {bio}
        </motion.p>

        {/* Animated rule */}
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.68, ease: "easeOut" }}
          className="mt-8 h-px bg-border"
        />

        {/* Connect buttons */}
        <motion.div
          {...fadeUp(0.74, prefersReducedMotion ?? false)}
          className="mt-8 pb-14 md:pb-20 flex flex-wrap gap-3"
        >
          <a
            href="mailto:charan.cvs@gmail.com"
            className="btn btn-outline btn-md gap-2"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://github.com/CVSCharan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-md gap-2"
          >
            <GitFork className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cvscharan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-md gap-2"
          >
            <Link2 className="w-4 h-4" />
            LinkedIn
          </a>
          <Link href="/resume" className="btn btn-primary btn-md gap-2">
            <Download className="w-4 h-4" />
            Resume
          </Link>
        </motion.div>
      </ChapterHero>

      {/* ════════════════════════════════════════════════════
          STORY
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border bg-muted/20 px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-label text-muted-foreground mb-2">Background</p>
            <h2
              className="text-headline text-foreground"
             
            >
              The Story.
            </h2>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl space-y-6"
          >
            {story.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
