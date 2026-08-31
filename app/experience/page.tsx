import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Experience",
  description: "My professional history, roles, and the companies I've worked with.",
};

export default async function ExperiencePage() {
  const experiences = await db.orm.public.Experience.all();

  return (
    <div className="max-w-3xl">
      <PageHeader
        label="Career"
        title="Experience"
        description="My professional journey — roles, companies, and what I built along the way."
      />

      {experiences.length === 0 ? (
        <p className="text-muted-foreground">No experience records yet.</p>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-10">
                {/* Node */}
                <span className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>

                <div className="card p-6 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3
                      className="text-lg font-semibold text-foreground"
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
      )}
    </div>
  );
}
