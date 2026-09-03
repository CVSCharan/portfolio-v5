import { db } from "@/src/prisma/db";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata = {
  title: "Projects",
  description:
    "A collection of full-stack apps, AI tools, and open-source work.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const techFilter = typeof searchParams.tech === "string" ? searchParams.tech : null;

  // We fetch all projects to compute the popularTechs for the filters (minimal data transfer)
  const allProjectsForTech = await db.orm.public.Project.select("techStack").all();
  
  // Featured projects are always fully loaded
  const featuredProjects = await db.orm.public.Project
    .where({ isFeatured: true })
    .orderBy((p) => p.order.asc())
    .all();

  // Load just the first 9 templates
  const templatesQuery = db.sql.public.project
    .select("id", "title", "slug", "description", "fullDescription", "techStack", "highlights", "githubUrls", "demoUrl", "imageUrl", "category", "isActive", "isFeatured", "order", "createdAt")
    .where((f, fns) => {
      if (techFilter) {
        return fns.and(
          fns.eq(f.isFeatured, false),
          fns.raw`${techFilter} = ANY(${f.techStack})`.returns("pg/bool@1")
        );
      }
      return fns.eq(f.isFeatured, false);
    })
    .orderBy((f) => f.order, { direction: "asc" })
    .limit(9);

  const initialTemplates = await (db.runtime() as any).query(templatesQuery.build());

  return (
    <ProjectsClient 
      key={techFilter || "all"}
      featuredProjects={featuredProjects} 
      initialTemplates={initialTemplates} 
      allTechStacks={allProjectsForTech.map(p => p.techStack)} 
    />
  );
}