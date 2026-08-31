"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GitFork, Link2, Download, MapPin, Mail } from "lucide-react";

interface Skill { id: number; name: string; level: number; category: string; }
interface UserRecord { id: number; name: string | null; email: string; bio: string | null; avatar: string | null; createdAt: string; }

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
};

export function AboutClient({ skills, user }: { skills: Skill[]; user: UserRecord | null }) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a strong foundation in Data Analytics. I specialise in building intelligent and scalable web applications that leverage LLMs, prompt engineering, and AI automation. Experienced in integrating OpenAI APIs, LangChain/N8N, and Pinecone into dynamic real-world solutions.";

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category || "Other";
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto space-y-16">
      {/* ── Header ── */}
      <motion.div
        className="space-y-4"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <span className="text-label text-primary">About</span>
        <h1
          className="text-display text-foreground"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          {name}
        </h1>
        <p className="text-xl font-light text-muted-foreground">
          Full-Stack Engineer · AI Integration · Cloud Architecture
        </p>
      </motion.div>

      {/* ── Bio ── */}
      <motion.div
        className="divider pt-8 space-y-5"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <p className="text-base leading-relaxed text-muted-foreground">{bio}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>India — Available for remote worldwide</span>
        </div>
      </motion.div>

      {/* ── Contact & Links ── */}
      <motion.div
        className="divider pt-8"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <span className="text-label text-muted-foreground mb-4 block">Connect</span>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:charan.cvs@gmail.com"
            className="btn-outline gap-2 text-sm"
          >
            <Mail className="w-4 h-4" />
            charan.cvs@gmail.com
          </a>
          <a
            href="https://github.com/CVSCharan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline gap-2 text-sm"
          >
            <GitFork className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cvscharan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline gap-2 text-sm"
          >
            <Link2 className="w-4 h-4" />
            LinkedIn
          </a>
          <Link href="/resume" className="btn-primary gap-2 text-sm">
            <Download className="w-4 h-4" />
            Download Resume
          </Link>
        </div>
      </motion.div>

      {/* ── Skills by Category ── */}
      {Object.keys(grouped).length > 0 && (
        <motion.div
          className="divider pt-8 space-y-8"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="text-label text-muted-foreground">Technical Skills</span>
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s.id} className="badge">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}