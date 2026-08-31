"use client";

import { ExternalLink, GitFork } from "lucide-react";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  techStack: readonly string[];
  githubUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  order: number;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        <p>No projects yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((proj) => (
        <article
          key={proj.id}
          className="card card-hover flex flex-col overflow-hidden"
        >
          {proj.imageUrl ? (
            <img
              src={proj.imageUrl}
              alt={proj.title}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-44 w-full bg-muted flex items-center justify-center">
              <span
                className="text-2xl font-bold text-muted-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {proj.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex flex-col flex-1 p-5 gap-4">
            <div className="space-y-1.5">
              <h3
                className="font-semibold text-foreground leading-snug"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {proj.title}
              </h3>
              {proj.description && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {proj.description}
                </p>
              )}
            </div>

            {proj.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {proj.techStack.slice(0, 5).map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {(proj.githubUrl || proj.demoUrl) && (
              <div className="flex gap-2 pt-3 border-t border-border">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm flex-1 justify-center gap-1.5"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    Code
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm flex-1 justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
