import { db } from "@/src/prisma/db";
import { notFound } from "next/navigation";
import ProjectDetailClient from "../../../../components/ProjectDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await db.orm.public.Project.where({ slug }).first();
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Projects`,
    description: project.description || `Details about ${project.title}`,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch all projects ordered canonically to compute index and next project
  const allProjects = await db.orm.public.Project.orderBy([
    (p) => p.order.asc(),
    (p) => p.id.asc()
  ]).all();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  // Re-evaluating index
  if (currentIndex === -1) {
    notFound();
  }

  const project = allProjects[currentIndex];
  // Format as 2 digits, e.g. "07"
  const projectIndexStr = (currentIndex + 1).toString().padStart(2, '0');
  
  // Wrap around or just null? Let's wrap around for continuous browsing
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return <ProjectDetailClient project={project} projectIndex={projectIndexStr} nextProject={nextProject} />;
}
