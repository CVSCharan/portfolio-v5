import React from "react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((proj) => (
        <article
          key={proj.id}
          className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
        >
          {proj.imageUrl ? (
            <img
              src={proj.imageUrl}
              alt={proj.title}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-48 w-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
              No image
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">{proj.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {proj.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {proj.githubUrl && (
                <Button className="flex-1" variant="outline" asChild>
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
              {proj.demoUrl && (
                <Button className="flex-1" asChild>
                  <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}