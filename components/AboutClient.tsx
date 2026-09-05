"use client";

import Link from "next/link";
import { ArrowRight, Download, GitFork, Link2, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterHero } from "./ChapterHero";

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
interface Certification {
  id: number;
  title: string;
  issuer: string | null;
  date: string | null;
  url: string | null;
}

/* ── Animation helpers ──────────────────────────────────────── */
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function AboutClient({
  skills,
  user,
  certifications,
}: {
  skills: Skill[];
  user: UserRecord | null;
  certifications: Certification[];
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
          HERO
      ════════════════════════════════════════════════════ */}
      <ChapterHero
        chapter="02"
        metaLabel="About"
        titlePrefix=""
        titleAccent={name + "."}
      >
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
      </ChapterHero>

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
          CERTIFICATIONS — curated list
      ════════════════════════════════════════════════════ */}
      {certifications?.length > 0 && (
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
                  Credentials
                </p>
                <h2
                  className="text-headline text-foreground"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  Continuous Learner.
                </h2>
              </div>
              <Link
                href="/credentials"
                className="btn btn-outline btn-md group shrink-0"
              >
                View all 10{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Grid of Certs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div>
                    <p className="text-label text-muted-foreground mb-3">{cert.issuer}</p>
                    <h3 className="text-lg font-medium text-foreground tracking-tight leading-snug pr-8">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm gap-2"
                      >
                        Verify
                        <Link2 className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}



    </div>
  );
}
