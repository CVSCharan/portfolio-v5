"use client";

import { useState } from "react";
import { AdminEditCard } from "@/components/admin/AdminEditCard";
import {
  addCertification,
  deleteCertification,
  reorderCertifications,
  updateCertification,
} from "@/app/actions/certificationActions";
import { useRouter } from "next/navigation";

function CertificationEditCard({
  certification,
  isExpanded,
  onToggle,
  onDelete,
  onUp,
  onDown,
}: {
  certification: any;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUp: (() => void) | undefined;
  onDown: (() => void) | undefined;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(certification);
  const [isSaving, setIsSaving] = useState(false);

  // Check if form is dirty by comparing with original certification prop
  const isDirty = JSON.stringify(formData) !== JSON.stringify(certification);

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateCertification(certification.id, formData);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <AdminEditCard
      title={certification.title}
      subtitle={`${certification.issuer} • ${certification.date}`}
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
          <label className="text-label text-muted-foreground mb-1.5 block">Certification Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Issuing Organization</label>
          <input
            type="text"
            value={formData.issuer || ""}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Date (e.g. Oct 2023)</label>
          <input
            type="text"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Credential URL (Optional)</label>
          <input
            type="text"
            value={formData.url || ""}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
      </div>
    </AdminEditCard>
  );
}

export function CertificationClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  // Add form state
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newCertification, setNewCertification] = useState({
    title: "",
    issuer: "",
    date: "",
    url: "",
  });

  const isAddDirty = newCertification.title.trim() !== "";

  const handleAdd = async () => {
    setIsAdding(true);
    await addCertification({
      ...newCertification,
      order: initialData.length > 0 ? Math.max(...initialData.map(e => e.order)) + 1 : 0
    });
    setNewCertification({
      title: "",
      issuer: "",
      date: "",
      url: "",
    });
    setIsAddExpanded(false);
    setIsAdding(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteCertification(id);
    router.refresh();
  };

  const handleSwap = async (indexA: number, indexB: number) => {
    const itemA = initialData[indexA];
    const itemB = initialData[indexB];
    const orderA = itemA.order;
    const orderB = itemB.order;
    
    await reorderCertifications([
      { id: itemA.id, order: orderB },
      { id: itemB.id, order: orderA }
    ]);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Certifications</h2>
      </div>

      {/* Add New Section */}
      <AdminEditCard
        title="Add New Certification"
        subtitle={isAddExpanded ? "Fill out details below" : "Click to expand and add a new certification"}
        isExpanded={isAddExpanded}
        onToggle={() => setIsAddExpanded(!isAddExpanded)}
        isDirty={isAddDirty}
        isSaving={isAdding}
        onSave={handleAdd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Certification Title</label>
            <input
              type="text"
              value={newCertification.title}
              onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Issuing Organization</label>
            <input
              type="text"
              value={newCertification.issuer}
              onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Date (e.g. Oct 2023)</label>
            <input
              type="text"
              value={newCertification.date}
              onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Credential URL (Optional)</label>
            <input
              type="text"
              value={newCertification.url}
              onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
        </div>
      </AdminEditCard>

      {/* Certification List */}
      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            No certification records yet. Add one above.
          </div>
        ) : (
          initialData.map((certification, index) => (
            <CertificationEditCard
              key={certification.id}
              certification={certification}
              isExpanded={expandedId === certification.id}
              onToggle={() => setExpandedId(expandedId === certification.id ? null : certification.id)}
              onDelete={() => handleDelete(certification.id)}
              onUp={index > 0 ? () => handleSwap(index, index - 1) : undefined}
              onDown={index < initialData.length - 1 ? () => handleSwap(index, index + 1) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
