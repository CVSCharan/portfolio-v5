import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "Projects",
  description: "A collection of full-stack apps, AI tools, and open-source work.",
};

export default async function ProjectsPage() {
  const projects = await db.orm.public.Project.all();
  projects.sort((a, b) => a.order - b.order);

  return (
    <div>
      <PageHeader
        label="Work"
        title="Projects"
        description="A selection of things I've built — full-stack apps, AI integrations, and open-source tools."
      />
      <ProjectsGrid projects={projects} />
    </div>
  );
}