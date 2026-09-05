"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import * as SimpleIcons from "simple-icons";
import React from "react";
import { ChapterHero } from "./ChapterHero";

/* ── Types ─────────────────────────────────────────────────── */
interface SkillRecord {
  id: number;
  name: string;
  level: number;
  categories: readonly string[];
  projectCount?: number;
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
      <ChapterHero
        chapter="05"
        metaLabel="Capabilities"
        titlePrefix="The "
        titleAccent="Arsenal."
        description="A comprehensive list of technical skills, languages, tools, and frameworks I use."
      />

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
                      s.projectCount && s.projectCount > 0 ? (
                        <Link
                          key={s.id}
                          href={`/projects?tech=${encodeURIComponent(s.name)}`}
                          className="group flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium text-foreground hover:border-foreground/30 hover:shadow-sm transition-all duration-200"
                        >
                          {getIcon(s.name)}
                          <span>{s.name}</span>
                          <span className="flex items-center text-xs text-muted-foreground group-hover:text-foreground transition-colors ml-1">
                            {s.projectCount} <ArrowRight className="w-3 h-3 ml-0.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </span>
                        </Link>
                      ) : (
                        <span
                          key={s.id}
                          className="group flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium text-foreground hover:border-foreground/30 hover:shadow-sm transition-all duration-200 cursor-default"
                        >
                          {getIcon(s.name)}
                          {s.name}
                        </span>
                      )
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>


    </div>
  );
}
