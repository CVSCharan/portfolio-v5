"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GitFork, Link2, Download, MapPin, Mail } from "lucide-react";

interface Skill { id: number; name: string; level: number; category: string; }
interface UserRecord { id: number; name: string | null; email: string; bio: string | null; avatar: string | null; createdAt: string; }

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  };
}

export function AboutClient({ skills, user }: { skills: Skill[]; user: UserRecord | null }) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a strong foundation in Data Analytics. I specialise in building intelligent and scalable web applications that leverage LLMs, prompt engineering, and AI automation. Experienced in integrating OpenAI APIs, LangChain/N8N, and Pinecone into dynamic real-world solutions.";

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category || "Other";
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl space-y-16">
      {/* Header */}
      <motion.div className="space-y-4" {...fadeUp(0)}>
        <p className="text-label text-primary">About</p>
        <h1
          className="text-display text-foreground"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {name}
        </h1>
        <p className="text-xl font-light text-muted-foreground">
          Full-Stack Engineer · AI Integration · Cloud Architecture
        </p>
      </motion.div>

      {/* Bio */}
      <motion.div className="divider pt-8 space-y-4" {...fadeUp(0.08)}>
        <p className="text-base leading-[1.85] text-muted-foreground">{bio}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>India — Available for remote worldwide</span>
        </div>
      </motion.div>

      {/* Connect */}
      <motion.div className="divider pt-8 space-y-4" {...fadeUp(0.14)}>
        <p className="text-label text-muted-foreground">Connect</p>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:charan.cvs@gmail.com" className="btn btn-outline btn-sm gap-2">
            <Mail className="w-3.5 h-3.5" /> charan.cvs@gmail.com
          </a>
          <a href="https://github.com/CVSCharan" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm gap-2">
            <GitFork className="w-3.5 h-3.5" /> GitHub
          </a>
          <a href="https://linkedin.com/in/cvscharan" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm gap-2">
            <Link2 className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <Link href="/resume" className="btn btn-primary btn-sm gap-2">
            <Download className="w-3.5 h-3.5" /> Resume
          </Link>
        </div>
      </motion.div>

      {/* Skills */}
      {Object.keys(grouped).length > 0 && (
        <motion.div className="divider pt-8 space-y-8" {...fadeUp(0.2)}>
          <p className="text-label text-muted-foreground">Technical Skills</p>
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s.id} className="badge">{s.name}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}