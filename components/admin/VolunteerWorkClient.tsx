"use client";

import { useTransition } from "react";
import { Accordion } from "@/components/admin/Accordion";
import { addVolunteerWork, deleteVolunteerWork, reorderVolunteerWork, updateVolunteerWork } from "@/app/actions/volunteerWorkActions";
import { useRouter } from "next/navigation";

export default function VolunteerWorkClient({ volunteerWork }: { volunteerWork: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      await addVolunteerWork();
      router.refresh();
    });
  };

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      await deleteVolunteerWork(id as number);
      router.refresh();
    });
  };

  const handleReorder = (newOrder: any[]) => {
    startTransition(async () => {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order: index
      }));
      await reorderVolunteerWork(updates);
      router.refresh();
    });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    startTransition(async () => {
      const current = volunteerWork.find(v => v.id === id);
      if (current) {
        await updateVolunteerWork(id, { ...current, [field]: value });
        router.refresh();
      }
    });
  };

  const renderContent = (item: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Organization</label>
          <input
            type="text"
            defaultValue={item.organization}
            onBlur={(e) => handleUpdate(item.id, 'organization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            defaultValue={item.role}
            onBlur={(e) => handleUpdate(item.id, 'role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date/Period</label>
          <input
            type="text"
            defaultValue={item.date || ""}
            onBlur={(e) => handleUpdate(item.id, 'date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Highlights (Comma Separated)</label>
          <input
            type="text"
            defaultValue={Array.isArray(item.highlights) ? item.highlights.join(", ") : (item.highlights || "")}
            onBlur={(e) => handleUpdate(item.id, 'highlights', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Additional Info / Extra Details</label>
          <textarea
            defaultValue={item.extraDetails || item.additionalInfo || ""}
            onBlur={(e) => handleUpdate(item.id, 'extraDetails', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
          />
        </div>
      </div>
    );
  };

  const mappedItems = volunteerWork.map(item => ({
    ...item,
    title: item.role,
    subtitle: item.organization
  }));

  return (
    <div className={isPending ? "opacity-50 pointer-events-none transition-opacity" : ""}>
      <Accordion
        title="Volunteer Work"
        items={mappedItems}
        onAdd={handleAdd}
        addButtonText="Add Volunteer Work"
        onDelete={handleDelete}
        onReorder={handleReorder}
        renderContent={renderContent}
      />
    </div>
  );
}
