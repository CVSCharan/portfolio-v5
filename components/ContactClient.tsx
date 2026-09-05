"use client";

import Link from "next/link";
import { ArrowRight, GitFork, Link2, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterHero } from "./ChapterHero";


export default function ContactClient() {
  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <ChapterHero
        chapter="06"
        metaLabel="Contact"
        titlePrefix="Let's build "
        titleAccent="something."
        description="I'm currently open to new opportunities and interesting projects. Feel free to reach out."
      />

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
