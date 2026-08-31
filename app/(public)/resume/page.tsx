import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";
import { TemplateT1 } from "@/components/resume-templates/TemplateT1";
import { PrintButton } from "@/components/resume-templates/PrintButton";

export const metadata = {
  title: "Resume",
  description: "CVS Charan's resume — professional experience, skills, and education.",
};

/* Map template IDs to accent colors (can be overridden by activeTheme) */
const THEME_COLORS: Record<string, string> = {
  blue:    "#3b82f6",
  violet:  "#8b5cf6",
  emerald: "#10b981",
  amber:   "#f59e0b",
  rose:    "#f43f5e",
  slate:   "#64748b",
  cyan:    "#06b6d4",
  orange:  "#f97316",
};

export default async function ResumePage() {
  /* ── Parallel fetch everything ── */
  const [
    settings,
    user,
    experiences,
    education,
    skills,
    certifications,
    languages,
    projects,
  ] = await Promise.all([
    db.orm.public.ResumeSettings.all().then((r) => r[0] ?? null),
    db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().then((r) => r[0] ?? null),
    db.orm.public.Experience.orderBy((e) => e.order.asc()).all(),
    db.orm.public.Education.orderBy((e) => e.order.asc()).all(),
    db.orm.public.Skill.all(),
    db.orm.public.Certification.orderBy((c) => c.order.asc()).all(),
    db.orm.public.Language.orderBy((l) => l.order.asc()).all(),
    db.orm.public.Project.orderBy((p) => p.order.asc()).all(),
  ]);

  const accentColor =
    THEME_COLORS[settings?.activeTheme ?? "blue"] ?? THEME_COLORS["blue"];

  /* For now only T1 is implemented — future: switch on settings?.activeTemplate */
  const resolvedUser = user ?? {
    id: 0,
    name: "CVS Charan",
    email: "charan.cvs@gmail.com",
    bio: "AI-Augmented Full-Stack Developer blending Data Analytics with intelligent, scalable architecture.",
    avatar: null,
    story: null,
    createdAt: "",
  };

  return (
    <div>
      {/* ── Page chrome (hidden on print) ── */}
      <div className="no-print">
        <PageHeader
          label="CV"
          title="Resume"
          description="Live resume synced from the CMS. Use Cmd+P / Ctrl+P to save as PDF."
          actions={<PrintButton />}
        />
      </div>

      {/* ── Template ── */}
      <TemplateT1
        user={resolvedUser}
        experiences={experiences as Parameters<typeof TemplateT1>[0]["experiences"]}
        education={education as Parameters<typeof TemplateT1>[0]["education"]}
        skills={skills as Parameters<typeof TemplateT1>[0]["skills"]}
        certifications={certifications as Parameters<typeof TemplateT1>[0]["certifications"]}
        languages={languages as Parameters<typeof TemplateT1>[0]["languages"]}
        projects={projects as Parameters<typeof TemplateT1>[0]["projects"]}
        accentColor={accentColor}
      />
    </div>
  );
}
