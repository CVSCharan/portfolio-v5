"use client";

import { useState } from "react";
import { AdminEditCard } from "@/components/admin/AdminEditCard";
import {
  addProject,
  deleteProject,
  reorderProjects,
  updateProject,
} from "@/app/actions/projectActions";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

function ProjectEditCard({
  project,
  isExpanded,
  onToggle,
  onDelete,
  onUp,
  onDown,
}: {
  project: any;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUp: (() => void) | undefined;
  onDown: (() => void) | undefined;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(project);
  const [isSaving, setIsSaving] = useState(false);

  // Check if form is dirty by comparing with original project prop
  const isDirty = JSON.stringify(formData) !== JSON.stringify(project);

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateProject(project.id, formData);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <AdminEditCard
      title={project.title}
      subtitle={project.slug}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onDelete={onDelete}
      onUp={onUp}
      onDown={onDown}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={handleUpdate}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Slug (Unique URL)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Description</label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Tech Stack (Comma Separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.techStack) ? formData.techStack.join(", ") : formData.techStack || ""}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Highlights (Comma Separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.highlights) ? formData.highlights.join(", ") : formData.highlights || ""}
            onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">GitHub URL</label>
          <input
            type="text"
            value={formData.githubUrl || ""}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Live Demo URL</label>
          <input
            type="text"
            value={formData.demoUrl || ""}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
      </div>
    </AdminEditCard>
  );
}

export default function ProjectClient({ projects }: { projects: any[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  // Add form state
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    description: "",
    techStack: "",
    highlights: "",
    githubUrl: "",
    demoUrl: "",
  });

  const isAddDirty = newProject.title.trim() !== "";

  const handleAdd = async () => {
    setIsAdding(true);
    await addProject({
      ...newProject,
      order: projects.length > 0 ? Math.max(...projects.map(p => p.order)) + 1 : 0
    });
    setNewProject({
      title: "",
      slug: "",
      description: "",
      techStack: "",
      highlights: "",
      githubUrl: "",
      demoUrl: "",
    });
    setIsAddExpanded(false);
    setIsAdding(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteProject(id);
    router.refresh();
  };

  const handleSwap = async (indexA: number, indexB: number) => {
    const itemA = projects[indexA];
    const itemB = projects[indexB];
    const orderA = itemA.order;
    const orderB = itemB.order;
    
    await reorderProjects([
      { id: itemA.id, order: orderB },
      { id: itemB.id, order: orderA }
    ]);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
      </div>

      {/* Add New Section */}
      <AdminEditCard
        title="Add New Project"
        subtitle={isAddExpanded ? "Fill out details below" : "Click to expand and add a new project"}
        isExpanded={isAddExpanded}
        onToggle={() => setIsAddExpanded(!isAddExpanded)}
        isDirty={isAddDirty}
        isSaving={isAdding}
        onSave={handleAdd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Slug (Unique URL)</label>
            <input
              type="text"
              value={newProject.slug}
              onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Tech Stack (Comma Separated)</label>
            <input
              type="text"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Highlights (Comma Separated)</label>
            <input
              type="text"
              value={newProject.highlights}
              onChange={(e) => setNewProject({ ...newProject, highlights: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">GitHub URL</label>
            <input
              type="text"
              value={newProject.githubUrl}
              onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Live Demo URL</label>
            <input
              type="text"
              value={newProject.demoUrl}
              onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
        </div>
      </AdminEditCard>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            No projects yet. Add one above.
          </div>
        ) : (
          projects.map((project, index) => (
            <ProjectEditCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
              onDelete={() => handleDelete(project.id)}
              onUp={index > 0 ? () => handleSwap(index, index - 1) : undefined}
              onDown={index < projects.length - 1 ? () => handleSwap(index, index + 1) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
