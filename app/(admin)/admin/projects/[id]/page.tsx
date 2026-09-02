import { db } from "@/src/prisma/db";
import { createProject, updateProject } from "@/src/actions/projects";
import { redirect } from "next/navigation";

export default async function AdminProjectForm({
  params,
}: {
  params: { id: string };
}) {
  const isNew = params.id === "new";

  let project = null;
  if (!isNew) {
    project = await db.orm.public.Project.where({
      id: Number(params.id),
    }).first();
    if (!project) redirect("/admin/projects");
  }

  async function action(formData: FormData) {
    "use server";

    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: (formData.get("description") as string) || null,
      fullDescription: (formData.get("fullDescription") as string) || null,
      highlights: (formData.get("highlights") as string)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      category: (formData.get("category") as string) || null,
      role: (formData.get("role") as string) || null,
      timeline: (formData.get("timeline") as string) || null,
      techStack: (formData.get("techStack") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      metricsRaw: (formData.get("metrics") as string).trim() || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      demoUrl: (formData.get("demoUrl") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null,
      isFeatured: formData.get("isFeatured") === "on",
      isActive: formData.get("isActive") === "on",
      order: Number(formData.get("order") || 0),
    };

    if (isNew) {
      await createProject(data);
    } else {
      await updateProject(Number(params.id), data);
    }

    redirect("/admin/projects");
  }

  const metricsDisplay = (() => {
    if (!project?.metrics) return "";
    try {
      return JSON.stringify(project.metrics, null, 2);
    } catch {
      return "";
    }
  })();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">
        {isNew ? "Create Project" : `Edit — ${project?.title}`}
      </h1>

      <form action={action} className="space-y-6">

        {/* Identity */}
        <fieldset className="space-y-4 border rounded-lg p-5">
          <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-1">Identity</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input name="title" defaultValue={project?.title ?? ""} required className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input name="slug" defaultValue={project?.slug ?? ""} required placeholder="my-project-name" className="w-full border rounded p-2 text-sm font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input name="category" defaultValue={project?.category ?? ""} placeholder="AI · Web App" className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input name="role" defaultValue={project?.role ?? ""} placeholder="Lead Developer" className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Timeline</label>
              <input name="timeline" defaultValue={project?.timeline ?? ""} placeholder="3 months" className="w-full border rounded p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order</label>
            <input name="order" type="number" defaultValue={project?.order ?? 0} className="w-full border rounded p-2 text-sm" />
          </div>
          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" name="isFeatured" defaultChecked={project?.isFeatured ?? false} className="w-4 h-4" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input type="checkbox" name="isActive" defaultChecked={project?.isActive ?? true} className="w-4 h-4" />
              Active (Live)
            </label>
          </div>
        </fieldset>

        {/* Content */}
        <fieldset className="space-y-4 border rounded-lg p-5">
          <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-1">Content</legend>
          <div>
            <label className="block text-sm font-medium mb-1">Short Description <span className="text-gray-400 font-normal">(hero hook, 1-2 sentences)</span></label>
            <textarea name="description" defaultValue={project?.description ?? ""} rows={2} className="w-full border rounded p-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Description <span className="text-gray-400 font-normal">(separate Problem and Approach with a blank line)</span></label>
            <textarea
              name="fullDescription"
              defaultValue={project?.fullDescription ?? ""}
              rows={8}
              placeholder="The problem this project solves. One or two sentences.&#10;&#10;The approach I took. How I solved it, what decisions I made."
              className="w-full border rounded p-2 text-sm font-mono leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Key Highlights <span className="text-gray-400 font-normal">(one per line)</span></label>
            <textarea
              name="highlights"
              defaultValue={project?.highlights?.join("\n") ?? ""}
              rows={5}
              placeholder="Implemented real-time sync using WebSockets&#10;Reduced API latency by 60% via query batching"
              className="w-full border rounded p-2 text-sm"
            />
          </div>
        </fieldset>

        {/* Stack */}
        <fieldset className="space-y-4 border rounded-lg p-5">
          <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-1">Tech Stack</legend>
          <div>
            <label className="block text-sm font-medium mb-1">Technologies <span className="text-gray-400 font-normal">(comma separated)</span></label>
            <input name="techStack" defaultValue={project?.techStack?.join(", ") ?? ""} placeholder="Next.js, TypeScript, Postgres, Vercel" className="w-full border rounded p-2 text-sm" />
          </div>
        </fieldset>

        {/* Links */}
        <fieldset className="space-y-4 border rounded-lg p-5">
          <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-1">Links &amp; Media</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input name="githubUrl" defaultValue={project?.githubUrl ?? ""} placeholder="https://github.com/..." className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Demo URL</label>
              <input name="demoUrl" defaultValue={project?.demoUrl ?? ""} placeholder="https://..." className="w-full border rounded p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
            <input name="imageUrl" defaultValue={project?.imageUrl ?? ""} placeholder="https://res.cloudinary.com/..." className="w-full border rounded p-2 text-sm" />
          </div>
        </fieldset>

        {/* Metrics */}
        <fieldset className="space-y-4 border rounded-lg p-5">
          <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-1">Impact Metrics</legend>
          <div>
            <label className="block text-sm font-medium mb-1">Metrics JSON <span className="text-gray-400 font-normal">(leave empty if no real data)</span></label>
            <textarea
              name="metrics"
              defaultValue={metricsDisplay}
              rows={5}
              placeholder={'[\n  { "label": "Users", "value": "1.2k" },\n  { "label": "Uptime", "value": "99.9%" }\n]'}
              className="w-full border rounded p-2 text-sm font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">Must be valid JSON array. Validated server-side — malformed JSON returns an error instead of saving.</p>
          </div>
        </fieldset>

        <div className="flex gap-4 pt-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium text-sm">
            {isNew ? "Create Project" : "Save Changes"}
          </button>
          <a href="/admin/projects" className="px-6 py-2 border rounded hover:bg-gray-50 text-sm font-medium">Cancel</a>
        </div>
      </form>
    </div>
  );
}
