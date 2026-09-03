"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

/* We reuse the exact same prop types as the print template for simplicity */
import type {
  ResumeUser,
  ResumeExperience,
  ResumeEducation,
  ResumeSkill,
  ResumeCertification,
  ResumeLanguage,
  ResumeProject,
} from "./resume-templates/TemplateT1";

interface ResumeScreenViewProps {
  user: ResumeUser;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
  projects: ResumeProject[];
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

function reveal(delay = 0) {
  return {
    initial: { y: "105%", opacity: 0 },
    whileInView: { y: "0%", opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.75, delay, ease: "easeOut" as const },
  };
}

export function ResumeScreenView({
  experiences,
  education,
  skills,
  certifications,
  languages,
  projects,
}: ResumeScreenViewProps) {
  /* Sorting & Grouping */
  const sortedExp = [...experiences].sort((a, b) => a.order - b.order);
  const sortedEdu = [...education].sort((a, b) => a.order - b.order);
  
  // Truncate projects and certs for the screen view so we don't duplicate full pages
  const featuredProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 3);
  const featuredCerts = [...certifications].sort((a, b) => a.order - b.order).slice(0, 4);

  const skillsByCat = skills.reduce<Record<string, ResumeSkill[]>>((acc, s) => {
    const cats = s.categories?.length ? [...s.categories] : ["Other"];
    cats.forEach((cat) => {
      (acc[cat] = acc[cat] ?? []).push(s);
    });
    return acc;
  }, {});

  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden pb-32">
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
          06
        </div>

        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between pt-4 pb-6 border-b border-border"
        >
          <span className="text-label text-muted-foreground">Resume</span>
          <span className="text-label text-muted-foreground">Chapter 06</span>
        </motion.div>

        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl">
          <div className="text-page-title overflow-hidden">
            <motion.div {...reveal(0.1)} className="block leading-[0.95]">
              <span className="text-foreground">The CV</span>
              <span className="text-secondary">.</span>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp(0.38)}
            className="mt-5 md:mt-6 text-base md:text-lg font-medium text-muted-foreground tracking-tight max-w-2xl"
          >
            A chronological overview of my professional experience, education, and technical capabilities.
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-8">
            <button
              onClick={() => window.print()}
              className="btn btn-primary btn-md gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.52, ease: "easeOut" }}
            className="mt-12 h-px bg-border"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          EXPERIENCE TIMELINE
      ════════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-10 xl:px-16 pt-12 md:pt-20">
        <div className="max-w-4xl">
          <motion.h2 
            {...fadeUp(0)}
            className="text-label text-muted-foreground mb-8"
          >
            Professional Experience
          </motion.h2>

          <div className="space-y-12">
            {sortedExp.map((exp, i) => (
              <motion.div 
                key={exp.id}
                {...fadeUp(i * 0.1)}
                className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-4 md:gap-8"
              >
                <div>
                  <h3 className="text-lg font-medium text-foreground">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground font-mono mt-1">{exp.period}</p>
                </div>
                <div>
                  <h4 className="text-lg text-foreground font-semibold mb-2">{exp.title}</h4>
                  {exp.description && (
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  )}
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-3 text-base text-muted-foreground">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary/50 shrink-0" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl px-5 sm:px-10 xl:px-16 my-16">
        <div className="h-px bg-border w-full" />
      </div>

      {/* ════════════════════════════════════════════════════
          EDUCATION & SKILLS
      ════════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-10 xl:px-16">
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          
          {/* Education */}
          <div>
            <motion.h2 
              {...fadeUp(0)}
              className="text-label text-muted-foreground mb-8"
            >
              Education
            </motion.h2>
            <div className="space-y-8">
              {sortedEdu.map((edu, i) => (
                <motion.div key={edu.id} {...fadeUp(i * 0.1)}>
                  <h3 className="text-base font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground font-mono mt-1 mb-2">{edu.period}</p>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground mb-2">{edu.description}</p>
                  )}
                  {edu.courses.length > 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      Coursework: {edu.courses.join(" · ")}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills & Languages */}
          <div>
            <motion.h2 
              {...fadeUp(0.1)}
              className="text-label text-muted-foreground mb-8"
            >
              Technical Arsenal
            </motion.h2>
            <div className="space-y-8">
              {Object.entries(skillsByCat).map(([cat, items], i) => (
                <motion.div key={cat} {...fadeUp((i + 1) * 0.1)}>
                  <p className="text-sm font-medium text-foreground mb-3">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span key={s.id} className="badge">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {languages.length > 0 && (
                <motion.div {...fadeUp(0.4)}>
                  <p className="text-sm font-medium text-foreground mb-3">Languages</p>
                  <div className="flex flex-col gap-2">
                    {languages.map((l) => (
                      <div key={l.id} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{l.title}</span>
                        <span className="text-sm text-muted-foreground font-mono">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl px-5 sm:px-10 xl:px-16 my-16">
        <div className="h-px bg-border w-full" />
      </div>

      {/* ════════════════════════════════════════════════════
          FEATURED PROJECTS & CREDENTIALS
      ════════════════════════════════════════════════════ */}
      <section className="px-5 sm:px-10 xl:px-16">
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          
          {/* Projects Teaser */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <motion.h2 {...fadeUp(0)} className="text-label text-muted-foreground">
                Featured Projects
              </motion.h2>
              <Link href="/projects" className="text-xs text-secondary hover:text-foreground font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-6">
              {featuredProjects.map((proj, i) => (
                <motion.div key={proj.id} {...fadeUp(i * 0.1)} className="p-4 rounded-xl border border-border bg-card/30">
                  <h3 className="text-base font-semibold text-foreground mb-1">{proj.title}</h3>
                  {proj.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{proj.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] border border-border rounded text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Teaser */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <motion.h2 {...fadeUp(0.1)} className="text-label text-muted-foreground">
                Credentials
              </motion.h2>
              <Link href="/credentials" className="text-xs text-secondary hover:text-foreground font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {featuredCerts.map((cert, i) => (
                <motion.div key={cert.id} {...fadeUp((i + 1) * 0.1)} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                  </div>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary p-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
