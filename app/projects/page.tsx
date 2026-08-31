import ProjectsGrid from "@/components/ProjectsGrid"
import Link from "next/link"
import { db } from "@/src/prisma/db"

export default async function Projects() {
  const projects = await db.orm.public.Project.all();
  projects.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-2">A collection of my recent work.</p>
      </div>
      
      <ProjectsGrid projects={projects} />
      
      <div className="max-w-2xl mx-auto pt-12 text-center">
        <p className="text-muted-foreground text-sm">
          Want to add your own projects? <Link href="/admin" className="font-medium text-primary hover:underline">Visit the admin panel</Link> to manage them.
        </p>
      </div>
    </div>
  )
}