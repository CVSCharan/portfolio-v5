import { db } from "@/src/prisma/db";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata = {
  title: "Projects",
  description:
    "A collection of full-stack apps, AI tools, and open-source work.",
};

export default async function ProjectsPage() {
  const projects = await db.orm.public.Project.orderBy((p) =>
    p.order.asc()
  ).all();

  return <ProjectsClient projects={projects} />;
}