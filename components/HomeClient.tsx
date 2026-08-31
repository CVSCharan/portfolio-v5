"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load the 3D scene to ensure TTI and mobile performance aren't blocked
const SpatialHero3D = dynamic(() => import("./SpatialHero3D"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  )
});

interface UserRecord {
  name: string | null;
  bio: string | null;
}

export function HomeClient({ 
  user 
}: { 
  user: UserRecord | null;
  featuredProject: any | null; // Unused in this layout, but keeping signature
}) {
  const name = user?.name ?? "CVS Charan";
  const bio =
    user?.bio ??
    "AI-Augmented Full-Stack Developer with a foundation in Data Analytics. I build intelligent, scalable web applications using LLMs, modern cloud infrastructure, and clean engineering principles.";

  return (
    <>
      {/* ── 3D Canvas Background (Full Screen) ── */}
      <div className="fixed inset-0 w-full h-[100svh] z-[-1] bg-background">
        <SpatialHero3D />
      </div>

      {/* ── HUD Overlay (DOM-based for SEO and Accessibility) ── */}
      <div className="relative z-10 w-full min-h-[calc(100svh-180px)] flex flex-col justify-between pointer-events-none">
        
        {/* HUD Top: Massive Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="pt-4 md:pt-12"
        >
          <h1 
            className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-foreground leading-[0.9] tracking-tighter"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            {name}.
          </h1>
          <p 
            className="text-xl md:text-3xl text-muted-foreground mt-4 md:mt-6 font-medium max-w-2xl" 
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Building uncompromising digital experiences & intelligent data systems.
          </p>
        </motion.div>

        {/* HUD Bottom: Bio & Action */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-8 pointer-events-auto"
        >
          <div className="space-y-8 max-w-md">
            <p className="text-base text-muted-foreground leading-[1.8]">
              {bio}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/projects" className="btn btn-primary btn-md group">
                Enter Portfolio 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/experience" className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors underline-offset-4 hover:underline">
                View Experience
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-end space-y-4 md:text-right hidden sm:flex">
             <div className="space-y-1">
               <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/60">Core Stack</p>
               <p className="text-sm text-foreground/80 max-w-[280px] leading-relaxed">
                 React, Next.js, Node.js, Python, PostgreSQL, Prisma, Tailwind, AWS
               </p>
             </div>
             <div className="space-y-1 pt-4 border-t border-border/50">
               <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/60">Status</p>
               <p className="text-sm text-foreground flex items-center md:justify-end gap-2">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
                 Available for opportunities
               </p>
             </div>
          </div>
        </motion.div>

      </div>
    </>
  );
}