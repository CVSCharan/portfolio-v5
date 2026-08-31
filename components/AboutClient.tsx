"use client"

import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"
import { ArrowRight, Download, Mail } from "lucide-react"

export function AboutClient({ skills, user }: { skills: any[], user: any }) {
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
    <div className="max-w-4xl mx-auto space-y-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About Me
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-2xl font-light text-muted-foreground">
          Frontend Developer & Designer
        </motion.h2>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="prose prose-neutral dark:prose-invert">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I build responsive, accessible, and performant web interfaces using
              modern technologies like Next.js, React, and Tailwind CSS. I love
              turning complex designs into clean, maintainable code.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              With a deep passion for cloud infrastructure and seamless UX, I bridge the gap between design and engineering to deliver unparalleled digital experiences.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 15).map((skill) => (
                <span key={skill.id} className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
              <p className="font-semibold">San Francisco, CA</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
              <a href="mailto:cvs.charan@example.com" className="font-semibold text-primary hover:underline">
                cvs.charan@example.com
              </a>
            </div>
            <div className="pt-4 border-t flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </Button>
              <Button className="w-full justify-start gap-2">
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}