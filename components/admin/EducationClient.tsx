"use client";

import { useTransition } from "react";
import { Accordion } from "@/components/admin/Accordion";
import {
  addEducation,
  deleteEducation,
  reorderEducation,
  updateEducation,
} from "@/app/actions/educationActions";
import { useRouter } from "next/navigation";

export function EducationClient({ initialData }: { initialData: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      await addEducation();
      router.refresh();
    });
  };

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      await deleteEducation(id as number);
      router.refresh();
    });
  };

  const handleReorder = (newOrder: any[]) => {
    startTransition(async () => {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderEducation(updates);
      router.refresh();
    });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    startTransition(async () => {
      // Find current
      const current = initialData.find((e) => e.id === id);
      if (current) {
        await updateEducation(id, { ...current, [field]: value });
        router.refresh();
      }
    });
  };

  const renderContent = (item: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Degree / Program
          </label>
          <input
            type="text"
            defaultValue={item.degree}
            onBlur={(e) => handleUpdate(item.id, "degree", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            defaultValue={item.institution}
            onBlur={(e) => handleUpdate(item.id, "institution", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Period (e.g. 2018 - 2022)
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
            Description
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
            Courses (Comma separated)
          </label>
          <input
            type="text"
            defaultValue={item.courses?.join(", ") || ""}
            onBlur={(e) => handleUpdate(item.id, "courses", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            placeholder="Data Structures, Algorithms, Databases"
          />
        </div>
      </div>
    );
  };

  // Map to generic AccordionItem format
  const mappedItems = initialData.map((item) => ({
    ...item,
    title: item.institution,
    subtitle: `${item.degree} • ${item.period}`,
  }));

  return (
    <div
      className={
        isPending ? "opacity-50 pointer-events-none transition-opacity" : ""
      }
    >
      <Accordion
        title="Education History"
        items={mappedItems}
        onAdd={handleAdd}
        addButtonText="Add Education"
        onDelete={handleDelete}
        onReorder={handleReorder}
        renderContent={renderContent}
      />
    </div>
  );
}
