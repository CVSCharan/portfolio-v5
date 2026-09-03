"use client";

import { ArrowUpRight, Link2 } from "lucide-react";
import { motion } from "framer-motion";

interface Certification {
  id: number;
  title: string;
  issuer: string | null;
  date: string | null;
  url: string | null;
}

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

export function CredentialsClient({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col px-5 sm:px-10 xl:px-16 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 88% 12%, rgba(37,99,235,0.045) 0%, transparent 50%)",
        }}
      >
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
          03
        </div>

        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Credentials</span>
          <span className="text-label text-muted-foreground">Chapter 03</span>
        </motion.div>

        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">Trophy Room</span>
              <span className="text-secondary">.</span>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight max-w-2xl"
          >
            A comprehensive list of professional certifications and verified credentials documenting my continuous learning journey.
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.52, ease: "easeOut" }}
            className="mt-12 h-px bg-border"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          LIST
      ════════════════════════════════════════════════════ */}
      <section className="w-full px-5 sm:px-10 xl:px-16 py-8 md:py-12 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1, ease: "easeOut" }}
              className="group flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-label text-muted-foreground">{cert.issuer}</span>
                </div>
                <h3 className="text-xl font-medium text-foreground tracking-tight leading-snug">
                  {cert.title}
                </h3>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-border/50 pt-4">
                <span className="text-sm text-muted-foreground">{cert.date}</span>
                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors"
                  >
                    Verify
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
