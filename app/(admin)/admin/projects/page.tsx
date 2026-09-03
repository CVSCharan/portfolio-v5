import { getProjects } from "@/app/actions/projectActions";
import ProjectClient from "@/components/admin/ProjectClient";

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="max-w-6xl mx-auto py-8 animate-fade-up">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-headline text-foreground">Projects</h1>
        <p className="text-body-muted mt-1">Manage your portfolio projects</p>
      </div>
      
      <ProjectClient projects={projects} />
    </div>
  );
}
