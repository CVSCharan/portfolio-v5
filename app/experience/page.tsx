import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";
import { Building2 } from "lucide-react";

export const metadata = {
  title: "Experience",
  description: "My professional history, roles, and the companies I've worked with.",
};

export default async function ExperiencePage() {
  const experiences = await db.orm.public.Experience.orderBy((e) => e.id.asc()).all();

  // Group experiences by company
  const groupedExperiences = experiences.reduce<Record<string, typeof experiences>>((acc, exp) => {
    (acc[exp.company] = acc[exp.company] || []).push(exp);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        label="Career"
        title="Experience"
        description="My professional journey — roles, companies, and what I built along the way."
      />

      {experiences.length === 0 ? (
        <p className="text-muted-foreground">No experience records yet.</p>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedExperiences).map(([company, roles], index) => (
            <div key={index} className="card p-0 overflow-hidden">
              {/* Company Header */}
              <div className="bg-muted/30 border-b border-border p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {company}
                  </h3>
                </div>
              </div>

              {/* Roles Timeline inside the Company */}
              <div className="p-6">
                <div className="relative">
                  {/* Internal Timeline line (only show if multiple roles) */}
                  {roles.length > 1 && (
                    <div className="absolute left-2.5 top-3 bottom-3 w-px bg-border" />
                  )}

                  <div className="space-y-8">
                    {roles.map((role, roleIndex) => (
                      <div key={role.id} className="relative pl-8">
                        {/* Internal Node (only if multiple roles) */}
                        {roles.length > 1 && (
                          <span className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          </span>
                        )}

                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h4
                              className="text-lg font-semibold text-foreground"
                              style={{ fontFamily: "var(--font-bricolage)" }}
                            >
                              {role.title}
                            </h4>
                            <span className="text-xs font-mono text-muted-foreground shrink-0 bg-muted/50 px-2 py-1 rounded">
                              {role.period}
                            </span>
                          </div>
                          
                          {role.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                              {role.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
