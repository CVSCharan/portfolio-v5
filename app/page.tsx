"use client"

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Database, LayoutTemplate, Server } from "lucide-react";
import Hero3D from "@/components/Hero3D";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <div className="flex flex-col gap-24 py-12 md:py-24">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold text-primary bg-primary/10">
            Available for new opportunities
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Build faster. <br/>
            <span className="text-primary">Scale smarter.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Hi, I'm CVS CHARAN. I engineer robust, scalable web architectures and beautiful digital experiences using modern cloud technologies.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Button size="lg" asChild className="group">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Interactive 3D Hero Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <Hero3D />
        </motion.div>
      </section>

      {/* Skills Marquee Replacement (Grid) */}
      <section className="space-y-8 pt-12 border-t">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Technical Arsenal</h2>
          <p className="text-muted-foreground">The tools I use to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-center p-6 bg-card border rounded-lg hover:border-primary/50 transition-colors gap-3">
            <LayoutTemplate className="w-6 h-6 text-primary" />
            <span className="font-semibold">Frontend</span>
          </div>
          <div className="flex items-center justify-center p-6 bg-card border rounded-lg hover:border-primary/50 transition-colors gap-3">
            <Server className="w-6 h-6 text-primary" />
            <span className="font-semibold">Backend</span>
          </div>
          <div className="flex items-center justify-center p-6 bg-card border rounded-lg hover:border-primary/50 transition-colors gap-3">
            <Database className="w-6 h-6 text-primary" />
            <span className="font-semibold">Database</span>
          </div>
          <div className="flex items-center justify-center p-6 bg-card border rounded-lg hover:border-primary/50 transition-colors gap-3">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="font-semibold">Architecture</span>
          </div>
        </div>
      </section>
    </div>
  );
}