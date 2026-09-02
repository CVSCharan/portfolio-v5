"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import * as SimpleIcons from "simple-icons";
import React from "react";

/* ── Types ─────────────────────────────────────────────────── */
interface SkillRecord {
  id: number;
  name: string;
  level: number;
  categories: readonly string[];
}

const SKILL_SLUGS: Record<string, string> = {
  HTML5: "html5",
  CSS3: "css3",
  "React JS": "react",
  "Next JS": "nextdotjs",
  Redux: "redux",
  Bootstrap: "bootstrap",
  "Tailwind CSS": "tailwindcss",
  "Node JS": "nodedotjs",
  "Express.js": "express",
  Django: "django",
  Flask: "flask",
  FastAPI: "fastapi",
  GraphQL: "graphql",
  "React Native": "react",
  Flutter: "flutter",
  Expo: "expo",
  MongoDB: "mongodb",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  SQLite: "sqlite",
  Oracle: "oracle",
  Redis: "redis",
  Azure: "microsoftazure",
  AWS: "amazonaws",
  "Google Cloud": "googlecloud",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Heroku: "heroku",
  Vercel: "vercel",
  "GitHub Actions": "githubactions",
  ArgoCD: "argocd",
  Pandas: "pandas",
  Numpy: "numpy",
  "Scikit Learn": "scikitlearn",
  Tensorflow: "tensorflow",
  "OpenAI API": "openai",
  "Hugging Face": "huggingface",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  "C++": "cplusplus",
  Java: "java",
  Git: "git",
  Github: "github",
  "VS Code": "visualstudiocode",
  Figma: "figma",
  Postman: "postman",
};

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

export default function SkillsClient({ skills }: { skills: SkillRecord[] }) {
  /* Group skills by category */
  const grouped = skills.reduce<Record<string, SkillRecord[]>>((acc, s) => {
    const cats = s.categories?.length ? [...s.categories] : ["Other"];
    cats.forEach((cat) => {
      (acc[cat] = acc[cat] ?? []).push(s);
    });
    return acc;
  }, {});

  const getIcon = (name: string) => {
    const slug = SKILL_SLUGS[name];
    if (!slug) return null;

    const IconObj = Object.values(SimpleIcons).find(
      (icon: any) => icon.slug === slug
    ) as any;

    if (!IconObj) return null;

    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-foreground"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={IconObj.path} />
      </svg>
    );
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
        {/* Ghost "05" */}
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
          05
        </div>

        {/* ── Meta bar ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Capabilities</span>
          <span className="text-label text-muted-foreground">Chapter 05</span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">The </span>
              <span className="text-secondary">Arsenal.</span>
            </motion.div>
          </div>

          {/* Role line */}
          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            A comprehensive list of technical skills, languages, tools, and
            frameworks I use.
          </motion.p>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.48, ease: "easeOut" }}
            className="mt-8 mb-14 md:mb-20 h-px bg-border"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SKILLS — editorial category rows
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
              <p className="text-label text-muted-foreground mb-2">Inventory</p>
              <h2
                className="text-headline text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Full Stack.
              </h2>
            </div>
          </motion.div>

          {/* Category rows — editorial grid */}
          <div>
            {Object.keys(grouped).length === 0 ? (
              <p className="text-muted-foreground">No skills found.</p>
            ) : (
              Object.entries(grouped).map(([cat, items], i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] items-start gap-x-6 gap-y-4 py-6 border-b border-border last:border-b-0"
                >
                  <span className="text-label text-muted-foreground pt-1.5">
                    {cat}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {items.map((s) => (
                      <span
                        key={s.id}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium text-foreground hover:border-foreground/30 hover:shadow-sm transition-all duration-200 cursor-default"
                      >
                        {getIcon(s.name)}
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA — identical to home + about + experience
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border bg-muted/20 px-5 sm:px-10 xl:px-16 py-16 md:py-24">
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
