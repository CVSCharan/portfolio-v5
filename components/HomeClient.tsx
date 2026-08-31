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

const STATS = [
  { value: "4+",  label: "Years Experience" },
  { value: "30+", label: "Projects Shipped" },
  { value: "12+", label: "Technologies" },
  { value: "5+",  label: "Open Source" },
];

const QUICK_LINKS = [
  { href: "/projects",   title: "Projects",   desc: "Full-stack apps, AI tools, and open-source work." },
  { href: "/experience", title: "Experience", desc: "Professional history and companies I've worked with." },
  { href: "/resume",     title: "Resume",     desc: "Interactive timeline, skills, and downloadable CV." },
];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

export function HomeClient({ user }: { user: UserRecord | null }) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a foundation in Data Analytics. I build intelligent, scalable web applications using LLMs, modern cloud infrastructure, and clean engineering principles.";

  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {/* ── Hero ── */}
      <section className="pt-4 md:pt-8 space-y-8 max-w-3xl">
        <motion.p className="text-label text-primary" {...fadeUp(0)}>
          Available · Open to New Opportunities
        </motion.p>

        <motion.h1
          {...fadeUp(0.06)}
          className="text-display text-foreground leading-[1.05]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {name}
        </motion.h1>

        <motion.p {...fadeUp(0.12)} className="text-xl font-light text-muted-foreground tracking-wide">
          Full-Stack Engineer · AI Integration · Cloud Architecture
        </motion.p>

        <motion.p {...fadeUp(0.18)} className="text-base text-muted-foreground leading-[1.8] max-w-2xl">
          {bio}
        </motion.p>

        <motion.div {...fadeUp(0.22)} className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>India — Available for remote opportunities worldwide</span>
        </motion.div>

        <motion.div {...fadeUp(0.27)} className="flex flex-wrap gap-3 pt-1">
          <Link href="/projects" className="btn btn-primary btn-md group">
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/resume" className="btn btn-outline btn-md">
            Resume
          </Link>
          <Link href="/contact" className="btn btn-outline btn-md">
            Get in Touch
          </Link>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="divider pt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
      >
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-background px-6 py-7 flex flex-col gap-1">
            <span
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {value}
            </span>
            <span className="text-xs text-muted-foreground leading-snug">{label}</span>
          </div>
        ))}
      </motion.section>

      {/* ── Quick Links ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.42 }}
        className="space-y-4"
      >
        <p className="text-label text-muted-foreground mb-6">Explore</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ href, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="card card-hover p-6 flex flex-col gap-3 group"
            >
              <div className="flex items-center justify-between">
                <h3
                  className="font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {title}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}