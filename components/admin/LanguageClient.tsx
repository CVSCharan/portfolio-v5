"use client";

import { useTransition } from "react";
import { Accordion } from "@/components/admin/Accordion";
import {
  addLanguage,
  deleteLanguage,
  reorderLanguages,
  updateLanguage,
} from "@/app/actions/languageActions";
import { useRouter } from "next/navigation";

export default function LanguageClient({ languages }: { languages: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      await addLanguage();
      router.refresh();
    });
  };

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      await deleteLanguage(id as number);
      router.refresh();
    });
  };

  const handleReorder = (newOrder: any[]) => {
    startTransition(async () => {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderLanguages(updates);
      router.refresh();
    });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    startTransition(async () => {
      const current = languages.find((l) => l.id === id);
      if (current) {
        await updateLanguage(id, { ...current, [field]: value });
        router.refresh();
      }
    });
  };

  const renderContent = (item: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Language</label>
          <input
            type="text"
            defaultValue={item.title}
            onBlur={(e) => handleUpdate(item.id, "title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Proficiency
          </label>
          <select
            defaultValue={item.proficiency}
            onChange={(e) =>
              handleUpdate(item.id, "proficiency", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          >
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Additional Info (Optional)
          </label>
          <input
            type="text"
            defaultValue={item.additionalInfo || ""}
            onBlur={(e) =>
              handleUpdate(item.id, "additionalInfo", e.target.value)
            }
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
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Extra Details
          </label>
          <textarea
            defaultValue={item.extraDetails || ""}
            onBlur={(e) =>
              handleUpdate(item.id, "extraDetails", e.target.value)
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
          />
        </div>
      </div>
    );
  };

  const mappedItems = languages.map((item) => ({
    ...item,
    title: item.title,
    subtitle: item.proficiency,
  }));

  return (
    <div
      className={
        isPending ? "opacity-50 pointer-events-none transition-opacity" : ""
      }
    >
      <Accordion
        title="Languages"
        items={mappedItems}
        onAdd={handleAdd}
        addButtonText="Add Language"
        onDelete={handleDelete}
        onReorder={handleReorder}
        renderContent={renderContent}
      />
    </div>
  );
}
