import { MapPin, Mail, Globe, Github, Linkedin, Phone } from "lucide-react";

/* ─────────────── Type aliases (mirroring Prisma output shapes) ─────────────── */
export interface ResumeUser {
  name: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
}
export interface ResumeExperience {
  id: number;
  title: string;
  company: string;
  period: string;
  description?: string | null;
  highlights: ReadonlyArray<string>;
  order: number;
}
export interface ResumeEducation {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description?: string | null;
  courses: ReadonlyArray<string>;
  order: number;
}
export interface ResumeSkill {
  id: number;
  name: string;
  level: number;
  category: string;
}
export interface ResumeCertification {
  id: number;
  title: string;
  issuer?: string | null;
  date?: string | null;
  url?: string | null;
  order: number;
}
export interface ResumeLanguage {
  id: number;
  title: string;
  proficiency: string;
  additionalInfo?: string | null;
  order: number;
}
export interface ResumeProject {
  id: number;
  title: string;
  description?: string | null;
  techStack: ReadonlyArray<string>;
  highlights: ReadonlyArray<string>;
  githubUrl?: string | null;
  demoUrl?: string | null;
  order: number;
}

interface TemplateT1Props {
  user: ResumeUser;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
  projects: ResumeProject[];
  accentColor?: string; // hex — default slate blue
}

/* ─── Small helpers ─── */
function SectionHeading({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="shrink-0 w-1 h-5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <h2
        className="text-xs font-black uppercase tracking-[0.18em] text-foreground"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        {children}
      </h2>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-[12px] leading-snug text-muted-foreground">
      <span className="mt-[5px] w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
      {text}
    </li>
  );
}

/* ─────────────── Main Template ─────────────── */
export function TemplateT1({
  user,
  experiences,
  education,
  skills,
  certifications,
  languages,
  projects,
  accentColor = "#3b82f6",
}: TemplateT1Props) {
  /* Group skills by category */
  const skillsByCat = skills.reduce<Record<string, ResumeSkill[]>>(
    (acc, s) => {
      const cat = s.category || "Other";
      (acc[cat] = acc[cat] || []).push(s);
      return acc;
    },
    {}
  );

  /* Group experience by company, ordered */
  const sortedExp = [...experiences].sort((a, b) => a.order - b.order);
  const expByCompany: { company: string; roles: ResumeExperience[] }[] = [];
  for (const exp of sortedExp) {
    const existing = expByCompany.find((g) => g.company === exp.company);
    if (existing) existing.roles.push(exp);
    else expByCompany.push({ company: exp.company, roles: [exp] });
  }

  const sortedEdu = [...education].sort((a, b) => a.order - b.order);
  const sortedCerts = [...certifications].sort((a, b) => a.order - b.order);
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 4);
  const sortedLangs = [...languages].sort((a, b) => a.order - b.order);

  return (
    /*
     * .resume-sheet — this div IS the A4 printable page.
     * @media print styles in globals.css will hide everything else.
     */
    <div className="resume-sheet bg-background text-foreground font-sans">
      {/* ══ Header ══ */}
      <header
        className="px-10 py-8 border-b border-border"
        style={{ borderTopColor: accentColor, borderTopWidth: 3 }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1
              className="text-3xl font-black tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {user.name}
            </h1>
            {user.bio && (
              <p className="mt-1 text-sm text-muted-foreground max-w-lg leading-relaxed">
                {user.bio}
              </p>
            )}
          </div>
          {/* Contact cluster */}
          <div className="shrink-0 text-right text-[11px] text-muted-foreground space-y-1">
            {user.email && (
              <div className="flex items-center justify-end gap-1.5">
                <Mail className="w-3 h-3" />
                <span>{user.email}</span>
              </div>
            )}
            <div className="flex items-center justify-end gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>India · Remote Worldwide</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <Github className="w-3 h-3" />
              <span>github.com/CVSCharan</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <Linkedin className="w-3 h-3" />
              <span>linkedin.com/in/cvscharan</span>
            </div>
          </div>
        </div>
      </header>

      {/* ══ Body: 2-column ══ */}
      <div className="grid grid-cols-[1fr_220px] gap-0 min-h-0">
        {/* ── LEFT column ── */}
        <main className="px-10 py-7 space-y-7 border-r border-border">
          {/* Experience */}
          {expByCompany.length > 0 && (
            <section>
              <SectionHeading accent={accentColor}>Experience</SectionHeading>
              <div className="space-y-5">
                {expByCompany.map(({ company, roles }) => (
                  <div key={company}>
                    <p
                      className="text-[13px] font-bold text-foreground mb-2"
                      style={{ fontFamily: "var(--font-bricolage)", color: accentColor }}
                    >
                      {company}
                    </p>
                    <div className="space-y-3 pl-3 border-l border-border">
                      {roles.map((role) => (
                        <div key={role.id}>
                          <div className="flex items-baseline justify-between">
                            <span className="text-[12px] font-semibold text-foreground">
                              {role.title}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground shrink-0 ml-2">
                              {role.period}
                            </span>
                          </div>
                          {role.description && (
                            <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                              {role.description}
                            </p>
                          )}
                          {role.highlights.length > 0 && (
                            <ul className="mt-1 space-y-0.5">
                              {role.highlights.map((h, i) => (
                                <Bullet key={i} text={h} />
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {sortedProjects.length > 0 && (
            <section>
              <SectionHeading accent={accentColor}>Projects</SectionHeading>
              <div className="space-y-4">
                {sortedProjects.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] font-semibold text-foreground">
                        {p.title}
                      </span>
                      <div className="flex gap-2 text-[10px] text-muted-foreground">
                        {p.githubUrl && (
                          <span className="flex items-center gap-0.5">
                            <Github className="w-2.5 h-2.5" /> GitHub
                          </span>
                        )}
                        {p.demoUrl && (
                          <span className="flex items-center gap-0.5">
                            <Globe className="w-2.5 h-2.5" /> Demo
                          </span>
                        )}
                      </div>
                    </div>
                    {p.description && (
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                        {p.description}
                      </p>
                    )}
                    {p.highlights.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {p.highlights.slice(0, 3).map((h, i) => (
                          <Bullet key={i} text={h} />
                        ))}
                      </ul>
                    )}
                    {p.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.techStack.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px] font-medium border border-border text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── RIGHT column ── */}
        <aside className="px-6 py-7 space-y-7 bg-muted/20">
          {/* Skills */}
          {Object.keys(skillsByCat).length > 0 && (
            <section>
              <SectionHeading accent={accentColor}>Skills</SectionHeading>
              <div className="space-y-3">
                {Object.entries(skillsByCat).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">
                      {cat}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {items.map((s) => (
                        <span
                          key={s.id}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium text-foreground"
                          style={{
                            background: `${accentColor}14`,
                            border: `1px solid ${accentColor}30`,
                          }}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {sortedEdu.length > 0 && (
            <section>
              <SectionHeading accent={accentColor}>Education</SectionHeading>
              <div className="space-y-3">
                {sortedEdu.map((e) => (
                  <div key={e.id}>
                    <p className="text-[12px] font-semibold text-foreground leading-tight">
                      {e.degree}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{e.institution}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{e.period}</p>
                    {e.courses.length > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {e.courses.join(" · ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {sortedCerts.length > 0 && (
            <section>
              <SectionHeading accent={accentColor}>Certifications</SectionHeading>
              <div className="space-y-2">
                {sortedCerts.map((c) => (
                  <div key={c.id}>
                    <p className="text-[11px] font-semibold text-foreground leading-tight">
                      {c.title}
                    </p>
                    {c.issuer && (
                      <p className="text-[10px] text-muted-foreground">
                        {c.issuer}
                        {c.date ? ` · ${c.date}` : ""}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {sortedLangs.length > 0 && (
            <section>
              <SectionHeading accent={accentColor}>Languages</SectionHeading>
              <div className="space-y-1.5">
                {sortedLangs.map((l) => (
                  <div key={l.id} className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-foreground">
                      {l.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {l.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
