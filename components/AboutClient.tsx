"use client";

import Link from "next/link";
import { ArrowRight, Download, GitFork, Link2, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────── */
interface Skill {
  id: number;
  name: string;
  level: number;
  categories: readonly string[];
}
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

export function AboutClient({
  skills,
  user,
}: {
  skills: Skill[];
  user: UserRecord | null;
}) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a strong foundation in Data Analytics. I specialise in building intelligent, scalable web applications that leverage LLMs, prompt engineering, and AI automation — from data pipelines to production-grade full-stack systems.";
  const story = user?.story ?? null;

  /* Group skills by category */
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cats = s.categories?.length ? [...s.categories] : ["Other"];
    cats.forEach((cat) => {
      (acc[cat] = acc[cat] ?? []).push(s);
    });
    return acc;
  }, {});

  return (
    /* Break out of layout's horizontal padding — same technique as home page */
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          HERO — same structure as home page hero
      ════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col px-5 sm:px-10 xl:px-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 88% 12%, rgba(37,99,235,0.045) 0%, transparent 50%)",
        }}
      >
        {/* Ghost "02" */}
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
          02
        </div>

        {/* ── Meta bar (mirrors home page top bar) ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">About</span>
          <span className="text-label text-muted-foreground">Chapter 02</span>
        </motion.div>

        {/* ── Hero content ── */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">

          {/* Name — clip reveal, period in blue */}
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">{name}</span>
              <span className="text-secondary">.</span>
            </motion.div>
          </div>

          {/* Role line */}
          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            Full-Stack Engineer{" "}
            <span className="opacity-40">×</span> AI / LLM{" "}
            <span className="opacity-40">×</span> Data Analytics
          </motion.p>

          {/* Location */}
          <motion.div
            {...fadeUp(0.45)}
            className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground/55"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>India — Available for remote worldwide</span>
          </motion.div>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.52, ease: "easeOut" }}
            className="mt-8 h-px bg-border"
          />

          {/* Bio */}
          <motion.p
            {...fadeUp(0.58)}
            className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {bio}
          </motion.p>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.68, ease: "easeOut" }}
            className="mt-8 h-px bg-border"
          />

          {/* Connect buttons */}
          <motion.div
            {...fadeUp(0.74)}
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
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          STORY — conditional on user.story field
      ════════════════════════════════════════════════════ */}
      {story && (
        <section className="w-full border-t border-border bg-muted/20 px-5 sm:px-10 xl:px-16 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-label text-muted-foreground mb-2">Background</p>
              <h2
                className="text-headline text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                The Story.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl"
            >
              {story}
            </motion.p>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════
          SKILLS — editorial category rows (mirrors home
          experience numbered list style)
      ════════════════════════════════════════════════════ */}
      {Object.keys(grouped).length > 0 && (
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
                <p className="text-label text-muted-foreground mb-2">
                  Capabilities
                </p>
                <h2
                  className="text-headline text-foreground"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  What I Know.
                </h2>
              </div>
              <Link
                href="/skills"
                className="btn btn-outline btn-md group shrink-0"
              >
                Full Skills{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Category rows — same editorial grid as experience list */}
            <div>
              {Object.entries(grouped).map(([cat, items], i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                  className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] items-start gap-x-6 gap-y-3 py-5 border-b border-border last:border-b-0"
                >
                  <span className="text-label text-muted-foreground pt-1">
                    {cat}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span key={s.id} className="badge">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════
          CTA — identical to home page CTA section
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
