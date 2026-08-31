import { getProjects } from "@/app/actions/projectActions";
import ProjectClient from "@/components/admin/ProjectClient";

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-zinc-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-zinc-500 mt-1">Manage your portfolio projects</p>
      </div>
      
      <ProjectClient projects={projects} />
    </div>
  );
}
