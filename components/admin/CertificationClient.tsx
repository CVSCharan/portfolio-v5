"use client";

import { useTransition } from "react";
import { Accordion } from "@/components/admin/Accordion";
import {
  addCertification,
  deleteCertification,
  reorderCertifications,
  updateCertification,
} from "@/app/actions/certificationActions";
import { useRouter } from "next/navigation";

export default function CertificationClient({
  certifications,
}: {
  certifications: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      await addCertification();
      router.refresh();
    });
  };

  const handleDelete = (id: number | string) => {
    startTransition(async () => {
      await deleteCertification(id as number);
      router.refresh();
    });
  };

  const handleReorder = (newOrder: any[]) => {
    startTransition(async () => {
      const updates = newOrder.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderCertifications(updates);
      router.refresh();
    });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    startTransition(async () => {
      const current = certifications.find((c) => c.id === id);
      if (current) {
        await updateCertification(id, { ...current, [field]: value });
        router.refresh();
      }
    });
  };

  const renderContent = (item: any) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Certification Title
          </label>
          <input
            type="text"
            defaultValue={item.title}
            onBlur={(e) => handleUpdate(item.id, "title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Issuer</label>
          <input
            type="text"
            defaultValue={item.issuer || ""}
            onBlur={(e) => handleUpdate(item.id, "issuer", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date/Year</label>
          <input
            type="text"
            defaultValue={item.date || ""}
            onBlur={(e) => handleUpdate(item.id, "date", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Credential URL
          </label>
          <input
            type="text"
            defaultValue={item.url || ""}
            onBlur={(e) => handleUpdate(item.id, "url", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>
    );
  };

  const mappedItems = certifications.map((item) => ({
    ...item,
    title: item.title,
    subtitle: item.issuer || "",
  }));

  return (
    <div
      className={
        isPending ? "opacity-50 pointer-events-none transition-opacity" : ""
      }
    >
      <Accordion
        title="Certifications"
        items={mappedItems}
        onAdd={handleAdd}
        addButtonText="Add Certification"
        onDelete={handleDelete}
        onReorder={handleReorder}
        renderContent={renderContent}
      />
    </div>
  );
}
