"use client";

import { useTransition } from "react";
import { Accordion } from "@/components/admin/Accordion";
import {
  addProject,
  deleteProject,
  reorderProjects,
  updateProject,
} from "@/app/actions/projectActions";
import { useRouter } from "next/navigation";

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      await addProject();
      router.refresh();
    });
  };

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      await deleteProject(id as number);
      router.refresh();
    });
  };

  const handleReorder = (newOrder: any[]) => {
    startTransition(async () => {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderProjects(updates);
      router.refresh();
    });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    startTransition(async () => {
      const current = projects.find((p) => p.id === id);
      if (current) {
        await updateProject(id, { ...current, [field]: value });
        router.refresh();
      }
    });
  };

  const renderContent = (item: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            defaultValue={item.title}
            onBlur={(e) => handleUpdate(item.id, "title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Slug (Unique URL)
          </label>
          <input
            type="text"
            defaultValue={item.slug}
            onBlur={(e) => handleUpdate(item.id, "slug", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            defaultValue={item.description || ""}
            onBlur={(e) => handleUpdate(item.id, "description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Tech Stack (Comma Separated)
          </label>
          <input
            type="text"
            defaultValue={
              Array.isArray(item.techStack)
                ? item.techStack.join(", ")
                : item.techStack || ""
            }
            onBlur={(e) => handleUpdate(item.id, "techStack", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Highlights (Comma Separated)
          </label>
          <input
            type="text"
            defaultValue={
              Array.isArray(item.highlights)
                ? item.highlights.join(", ")
                : item.highlights || ""
            }
            onBlur={(e) => handleUpdate(item.id, "highlights", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            GitHub URL
          </label>
          <input
            type="text"
            defaultValue={item.githubUrl || ""}
            onBlur={(e) => handleUpdate(item.id, "githubUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Live Demo URL
          </label>
          <input
            type="text"
            defaultValue={item.demoUrl || ""}
            onBlur={(e) => handleUpdate(item.id, "demoUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>
    );
  };

  const mappedItems = projects.map((item) => ({
    ...item,
    title: item.title,
    subtitle: item.slug,
  }));

  return (
    <div
      className={
        isPending ? "opacity-50 pointer-events-none transition-opacity" : ""
      }
    >
      <Accordion
        title="Projects"
        items={mappedItems}
        onAdd={handleAdd}
        addButtonText="Add Project"
        onDelete={handleDelete}
        onReorder={handleReorder}
        renderContent={renderContent}
      />
    </div>
  );
}
