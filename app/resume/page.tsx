import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";
import { AIChatbot } from "@/components/AIChatbot";
import { Briefcase, GraduationCap, Cpu, Download } from "lucide-react";

export const metadata = {
  title: "Resume",
  description: "CVS Charan's resume — professional experience, skills, and education.",
};

export default async function ResumePage() {
  const experiences = await db.orm.public.Experience.all();
  const skills = await db.orm.public.Skill.all();

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = s.category || "Other";
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl">
      <PageHeader
        label="CV"
        title="Resume"
        description="AI-Augmented Full-Stack Developer blending Data Analytics with intelligent, scalable architecture."
        actions={
          <a
            href="/resume.pdf"
            download
            className="btn btn-primary btn-sm gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        }
      />

      <div className="grid lg:grid-cols-[1fr_280px] gap-12">
        {/* ── Left: Experience timeline ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 mb-8">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2
              className="text-xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              Experience
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-10">
                  <span className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h3
                        className="font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                      >
                        {exp.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Right: Skills + Education ── */}
        <div className="space-y-10">
          {/* Skills */}
          <section>
            <div className="flex items-center gap-2.5 mb-6">
              <Cpu className="w-5 h-5 text-primary" />
              <h2
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Skills
              </h2>
            </div>
            <div className="space-y-6">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="space-y-2">
                  <p className="text-label text-muted-foreground">{cat}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <span key={s.id} className="badge">{s.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Education
              </h2>
            </div>
            <div className="space-y-5">
              {[
                { school: "Mahindra University", detail: "Research Fellowship (Physics) · 2022" },
                { school: "VIT University",      detail: "MS/MSc Physics · 7.2 GPA · 2021" },
                { school: "NxtWave",             detail: "CCBP 4.0 — Full-Stack Web Dev" },
              ].map(({ school, detail }) => (
                <div key={school} className="space-y-0.5">
                  <p className="font-medium text-sm text-foreground">{school}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Floating AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
