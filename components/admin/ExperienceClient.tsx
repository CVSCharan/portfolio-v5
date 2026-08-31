"use client";

import { useTransition } from "react";
import { Accordion } from "@/components/admin/Accordion";
import {
  addExperience,
  deleteExperience,
  reorderExperience,
  updateExperience,
} from "@/app/actions/experienceActions";
import { useRouter } from "next/navigation";

export function ExperienceClient({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      await addExperience();
      router.refresh();
    });
  };

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      await deleteExperience(id as number);
      router.refresh();
    });
  };

  const handleReorder = (newOrder: any[]) => {
    startTransition(async () => {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderExperience(updates);
      router.refresh();
    });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    startTransition(async () => {
      const current = initialData.find((e) => e.id === id);
      if (current) {
        await updateExperience(id, { ...current, [field]: value });
        router.refresh();
      }
    });
  };

  const renderContent = (item: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            defaultValue={item.title}
            onBlur={(e) => handleUpdate(item.id, "title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            defaultValue={item.company}
            onBlur={(e) => handleUpdate(item.id, "company", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Period (e.g. Jan 2021 - Present)
          </label>
          <input
            type="text"
            defaultValue={item.period}
            onBlur={(e) => handleUpdate(item.id, "period", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Role Description
          </label>
          <textarea
            defaultValue={item.description || ""}
            onBlur={(e) => handleUpdate(item.id, "description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Key Highlights (Comma separated)
          </label>
          <input
            type="text"
            defaultValue={item.highlights?.join(", ") || ""}
            onBlur={(e) => handleUpdate(item.id, "highlights", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            placeholder="Built CI/CD pipeline, Managed 5 devs"
          />
        </div>
      </div>
    );
  };

  const mappedItems = initialData.map((item) => ({
    ...item,
    title: item.title,
    subtitle: `${item.company} • ${item.period}`,
  }));

  return (
    <div
      className={
        isPending ? "opacity-50 pointer-events-none transition-opacity" : ""
      }
    >
      <Accordion
        title="Work Experience"
        items={mappedItems}
        onAdd={handleAdd}
        addButtonText="Add Experience"
        onDelete={handleDelete}
        onReorder={handleReorder}
        renderContent={renderContent}
      />
    </div>
  );
}
