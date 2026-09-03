"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CollaborateCTA() {
  return (
    <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <p className="text-label text-muted-foreground mb-2">Let&apos;s Collaborate</p>
          <h2 className="text-headline text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>Have a project in mind?</h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-3">
            Open to ambitious projects, creative ideas, and new opportunities to build something meaningful.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link href="/contact" className="btn btn-primary btn-lg group">
            Get in Touch <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/resume" className="btn btn-outline btn-lg">View Resume</Link>
        </div>
      </motion.div>
    </section>
  );
}
