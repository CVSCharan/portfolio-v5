"use client";

import Link from "next/link";
import { ArrowRight, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface UserRecord {
  id: number;
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
}

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js",
  "PostgreSQL", "Prisma", "AWS", "Docker",
  "LangChain", "OpenAI", "Tailwind CSS", "GraphQL",
];

const STATS = [
  { label: "Years Experience", value: "4+" },
  { label: "Projects Shipped", value: "30+" },
  { label: "Tech Stack", value: "12+" },
  { label: "Open Source", value: "5+" },
];

export function HomeClient({ user }: { user: UserRecord | null }) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a strong foundation in Data Analytics. I specialise in building intelligent and scalable web applications that leverage LLMs, prompt engineering, and AI automation.";

  return (
    <div className="flex flex-col gap-24">
      {/* ── Hero ── */}
      <section className="grid lg:grid-cols-[1fr_auto] gap-16 items-start pt-4">
        <div className="space-y-8 max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-label text-primary">
              Available · Open to Opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-display text-foreground"
            style={{ fontFamily: "var(--font-dm-serif)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {name}
          </motion.h1>

          {/* Role line */}
          <motion.p
            className="text-xl font-light text-muted-foreground tracking-wide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Full-Stack Engineer · AI Integration · Cloud Architecture
          </motion.p>

          {/* Bio */}
          <motion.p
            className="text-base leading-relaxed text-muted-foreground max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            {bio}
          </motion.p>

          {/* Location */}
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>India — Available for remote worldwide</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
          >
            <Link href="/projects" className="btn-primary group">
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/resume" className="btn-outline">
              Resume
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* ── Right: Stats card ── */}
        <motion.div
          className="hidden lg:grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border w-72 shrink-0 mt-8"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-background p-6 flex flex-col gap-1">
              <span
                className="text-2xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {value}
              </span>
              <span className="text-xs text-muted-foreground leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="divider" />

      {/* ── Tech Stack ── */}
      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="space-y-1">
          <p className="text-label text-muted-foreground">Core Technologies</p>
          <h2
            className="text-headline text-foreground"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            What I Work With
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="divider" />

      {/* ── Quick Links ── */}
      <motion.section
        className="grid sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {[
          {
            href: "/projects",
            title: "Projects",
            desc: "Explore full-stack apps, AI tools, and open-source work.",
          },
          {
            href: "/experience",
            title: "Experience",
            desc: "Professional history, roles, and companies I've worked with.",
          },
          {
            href: "/resume",
            title: "Resume",
            desc: "Interactive timeline and downloadable CV.",
          },
        ].map(({ href, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="card-classic p-6 flex flex-col gap-3 group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </Link>
        ))}
      </motion.section>
    </div>
  );
}