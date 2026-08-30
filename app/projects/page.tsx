import ProjectsGrid from "@/components/ProjectsGrid"
import Link from "next/link"

export default function Projects() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProjectsGrid />
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-zinc-600 text-sm">
          Want to add your own projects? <Link href="/admin" className="font-medium text-primary hover underline">Visit the admin panel</Link> to manage them.
        </p>
      </div>
    </main>
  )
}