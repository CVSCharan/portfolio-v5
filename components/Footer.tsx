"use client";

import Link from "next/link";
import { GitFork, Link2, Mail, Hash } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Footer slides up from 300px below its natural position — parallax reveal
  const y = useTransform(scrollYProgress, [0, 1], [-300, 0]);

  return (
    <div ref={containerRef} className="relative w-full -z-10">
      <motion.footer
        style={{ y }}
        className="bg-background pt-10 border-t border-border w-full flex flex-col"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10">

          {/* Top Grid: 3 columns — Resources merged into Connect */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-10">

            {/* Col 1: Brand + Socials + Copyright */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span
                  className="text-3xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-bricolage)", letterSpacing: "-0.04em" }}
                >
                  charan
                </span>
                <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">
                  AI-Augmented Full-Stack Developer from India
                </p>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <a href="https://linkedin.com/in/cvscharan" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  <Link2 className="w-4 h-4" />
                </a>
                <a href="https://github.com/CVSCharan" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  <GitFork className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  <Hash className="w-4 h-4" />
                </a>
                <a href="mailto:charan.cvs@gmail.com" className="hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Copyright inline — no box/card */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                © {new Date().getFullYear()} CVS Charan. All rights reserved.
                <br />India — Available for remote worldwide.
              </p>
            </div>

            {/* Col 2: Explore */}
            <div className="flex flex-col gap-4">
              <span className="text-label text-foreground">EXPLORE</span>
              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground font-medium">
                <Link href="/projects" className="hover:text-foreground transition-colors w-fit">Projects</Link>
                <Link href="/skills" className="hover:text-foreground transition-colors w-fit">Skills</Link>
                <Link href="/experience" className="hover:text-foreground transition-colors w-fit">Experience</Link>
                <Link href="/resume" className="hover:text-foreground transition-colors w-fit">Resume</Link>
                <Link href="/blog" className="hover:text-foreground transition-colors w-fit">Blog</Link>
                <Link href="/about" className="hover:text-foreground transition-colors w-fit">About</Link>
              </div>
            </div>

            {/* Col 3: Connect + Source Code (merged from Resources) */}
            <div className="flex flex-col gap-4">
              <span className="text-label text-foreground">CONNECT</span>
              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground font-medium">
                <Link href="/contact" className="hover:text-foreground transition-colors w-fit">Contact Me</Link>
                <a href="https://linkedin.com/in/cvscharan" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors w-fit">LinkedIn</a>
                <a href="https://github.com/CVSCharan" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors w-fit">GitHub</a>
                <a href="mailto:charan.cvs@gmail.com" className="hover:text-foreground transition-colors w-fit">Email</a>
                <span className="block pt-1 border-t border-border/50" />
                <a href="https://github.com/CVSCharan/portfolio-v5" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors w-fit">
                  Source Code
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Wordmark — 24vw → 14vw, still bleeds off bottom edge */}
        <div className="w-full pointer-events-none select-none overflow-hidden leading-none mt-auto">
          <h2
            className="w-full text-center font-bold text-muted-foreground/10 whitespace-nowrap translate-y-[18%]"
            style={{
              fontFamily: "var(--font-bricolage)",
              fontSize: "clamp(3rem, 14vw, 14vw)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            charan
          </h2>
        </div>
      </motion.footer>
    </div>
  );
}
