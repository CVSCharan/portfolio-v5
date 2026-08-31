import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Skills",
  description: "Technical skills, tools, and technologies I work with.",
};

const LEVEL_LABELS: Record<number, string> = {
  1: "Learning", 2: "Familiar", 3: "Proficient", 4: "Advanced", 5: "Expert",
};

export default async function SkillsPage() {
  const skills = await db.orm.public.Skill.all();

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = s.category || "Other";
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div>
      <PageHeader
        label="Expertise"
        title="Skills"
        description="Technologies and tools I use to design, build, and ship products."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat} className="card p-6 space-y-5">
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {cat}
            </h2>
            <div className="space-y-3">
              {grouped[cat].map((skill) => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {LEVEL_LABELS[skill.level] ?? skill.level}
                    </span>
                  </div>
                  {/* Proficiency bar */}
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
