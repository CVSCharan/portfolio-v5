"use client"

import { useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  order: number
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p className="mt-8 text-zinc-50">Loading projects…</p>

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          My Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => (
            <article
              key={proj.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {proj.imageUrl ? (
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                  loading="lazy"
                />
              ) : (
                <div
                  className="h-48 w-full bg-zinc-200 rounded-t-lg flex items-center justify-center text-zinc-50 text-sm"
                >
                  No image
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-medium text-primary mb-1">{proj.title}</h3>
                <p className="text-zinc-600 text-sm mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-md bg-primary/10 text-primary text-sm px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/10 text-zinc-100 px-4 py-2 rounded-md font-medium hover:bg-white/20 transition-colors"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}