import ProjectsGrid from "@/components/ProjectsGrid"
import Link from "next/link"
import { db } from "@/src/prisma/db"

export default async function Projects() {
  const projects = await db.orm.public.Project.all();
  // Sort projects by order
  projects.sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-gray-50">
      <ProjectsGrid projects={projects} />
      <div className="max-w-2xl mx-auto mt-12 text-center pb-24">
        <p className="text-zinc-600 text-sm">
          Want to add your own projects? <Link href="/admin" className="font-medium text-primary hover:underline">Visit the admin panel</Link> to manage them.
        </p>
      </div>
    </main>
  )
}