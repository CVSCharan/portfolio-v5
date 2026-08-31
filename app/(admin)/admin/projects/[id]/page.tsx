import { db } from "@/src/prisma/db";
import { createProject, updateProject } from "@/src/actions/projects";
import { redirect } from "next/navigation";

export default async function AdminProjectForm({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let project = null;
  if (!isNew) {
    project = await db.orm.public.Project.where({ id: Number(params.id) }).first();
    if (!project) redirect("/admin/projects");
  }

  async function action(formData: FormData) {
    "use server";
    
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string || null,
      techStack: (formData.get("techStack") as string).split(",").map(s => s.trim()).filter(Boolean),
      githubUrl: formData.get("githubUrl") as string || null,
      demoUrl: formData.get("demoUrl") as string || null,
      imageUrl: formData.get("imageUrl") as string || null,
      order: Number(formData.get("order") || 0),
    };

    if (isNew) {
      await createProject(data);
    } else {
      await updateProject(Number(params.id), data);
    }
    
    redirect("/admin/projects");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isNew ? "Create Project" : "Edit Project"}</h1>
      
      <form action={action} className="space-y-4 bg-white p-6 shadow rounded">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" defaultValue={project?.title || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input name="slug" defaultValue={project?.slug || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" defaultValue={project?.description || ""} className="w-full border rounded p-2" rows={3}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
          <input name="techStack" defaultValue={project?.techStack?.join(", ") || ""} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <input name="githubUrl" defaultValue={project?.githubUrl || ""} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Demo URL</label>
          <input name="demoUrl" defaultValue={project?.demoUrl || ""} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input name="imageUrl" defaultValue={project?.imageUrl || ""} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Order</label>
          <input name="order" type="number" defaultValue={project?.order || 0} className="w-full border rounded p-2" />
        </div>
        
        <div className="pt-4 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
          <a href="/admin/projects" className="px-6 py-2 border rounded hover:bg-gray-50">Cancel</a>
        </div>
      </form>
    </div>
  );
}
