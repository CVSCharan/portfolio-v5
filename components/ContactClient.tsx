"use client";

import Link from "next/link";
import { ArrowRight, GitFork, Link2, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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

export default function ContactClient() {
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
        {/* Ghost "06" */}
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
          06
        </div>

        {/* ── Meta bar ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Contact</span>
          <span className="text-label text-muted-foreground">Chapter 06</span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">Let's build </span>
              <span className="text-secondary">something.</span>
            </motion.div>
          </div>

          {/* Role line */}
          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight"
          >
            I'm currently open to new opportunities and interesting projects.
            Feel free to reach out.
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
          FORM & INFO
      ════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_320px] gap-12 md:gap-16">
          
          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6" action="#" method="POST">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-label text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-label text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-label text-muted-foreground">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-label text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-none transition-colors"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-md w-full sm:w-auto">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* ── Info Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            <div className="space-y-3">
              <p className="text-label text-muted-foreground">Direct Contact</p>
              <a
                href="mailto:charan.cvs@gmail.com"
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-secondary transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0 text-muted-foreground" />
                charan.cvs@gmail.com
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-label text-muted-foreground">Location</p>
              <div className="flex items-center gap-3 text-base text-foreground">
                <MapPin className="w-5 h-5 shrink-0 text-muted-foreground" />
                India — Remote Worldwide
              </div>
            </div>

            <div className="pt-8 border-t border-border space-y-4">
              <p className="text-label text-muted-foreground">Online</p>
              <a
                href="https://github.com/CVSCharan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-secondary transition-colors"
              >
                <GitFork className="w-5 h-5 shrink-0 text-muted-foreground" />
                GitHub — CVSCharan
              </a>
              <a
                href="https://linkedin.com/in/cvscharan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-secondary transition-colors"
              >
                <Link2 className="w-5 h-5 shrink-0 text-muted-foreground" />
                LinkedIn — cvscharan
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
