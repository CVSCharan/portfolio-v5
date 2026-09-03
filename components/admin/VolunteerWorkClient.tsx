"use client";

import { useState } from "react";
import { AdminEditCard } from "@/components/admin/AdminEditCard";
import {
  addVolunteerWork,
  deleteVolunteerWork,
  reorderVolunteerWork,
  updateVolunteerWork,
} from "@/app/actions/volunteerWorkActions";
import { useRouter } from "next/navigation";

function VolunteerEditCard({
  volunteer,
  isExpanded,
  onToggle,
  onDelete,
  onUp,
  onDown,
}: {
  volunteer: any;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUp: (() => void) | undefined;
  onDown: (() => void) | undefined;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(volunteer);
  const [isSaving, setIsSaving] = useState(false);

  // Check if form is dirty by comparing with original volunteer prop
  const isDirty = JSON.stringify(formData) !== JSON.stringify(volunteer);

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateVolunteerWork(volunteer.id, formData);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <AdminEditCard
      title={volunteer.organization}
      subtitle={`${volunteer.role} • ${volunteer.date}`}
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
          <label className="text-label text-muted-foreground mb-1.5 block">Organization</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Date / Period</label>
          <input
            type="text"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Additional Info (Optional)</label>
          <input
            type="text"
            value={formData.additionalInfo || ""}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Extra Details (Optional)</label>
          <textarea
            value={formData.extraDetails || ""}
            onChange={(e) => setFormData({ ...formData, extraDetails: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Highlights (Comma separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.highlights) ? formData.highlights.join(", ") : formData.highlights || ""}
            onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            placeholder="Raised $10k, Managed team"
          />
        </div>
      </div>
    </AdminEditCard>
  );
}

export function VolunteerWorkClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  // Add form state
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    organization: "",
    role: "",
    date: "",
    additionalInfo: "",
    extraDetails: "",
    highlights: "",
  });

  const isAddDirty = newVolunteer.organization.trim() !== "";

  const handleAdd = async () => {
    setIsAdding(true);
    await addVolunteerWork({
      ...newVolunteer,
      order: initialData.length > 0 ? Math.max(...initialData.map(e => e.order)) + 1 : 0
    });
    setNewVolunteer({
      organization: "",
      role: "",
      date: "",
      additionalInfo: "",
      extraDetails: "",
      highlights: "",
    });
    setIsAddExpanded(false);
    setIsAdding(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteVolunteerWork(id);
    router.refresh();
  };

  const handleSwap = async (indexA: number, indexB: number) => {
    const itemA = initialData[indexA];
    const itemB = initialData[indexB];
    const orderA = itemA.order;
    const orderB = itemB.order;
    
    await reorderVolunteerWork([
      { id: itemA.id, order: orderB },
      { id: itemB.id, order: orderA }
    ]);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Volunteer Work</h2>
      </div>

      {/* Add New Section */}
      <AdminEditCard
        title="Add New Volunteer Work"
        subtitle={isAddExpanded ? "Fill out details below" : "Click to expand and add a new organization"}
        isExpanded={isAddExpanded}
        onToggle={() => setIsAddExpanded(!isAddExpanded)}
        isDirty={isAddDirty}
        isSaving={isAdding}
        onSave={handleAdd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Organization</label>
            <input
              type="text"
              value={newVolunteer.organization}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, organization: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Role</label>
            <input
              type="text"
              value={newVolunteer.role}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, role: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Date / Period</label>
            <input
              type="text"
              value={newVolunteer.date}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, date: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Additional Info (Optional)</label>
            <input
              type="text"
              value={newVolunteer.additionalInfo}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, additionalInfo: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Extra Details (Optional)</label>
            <textarea
              value={newVolunteer.extraDetails}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, extraDetails: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Highlights (Comma separated)</label>
            <input
              type="text"
              value={newVolunteer.highlights}
              onChange={(e) => setNewVolunteer({ ...newVolunteer, highlights: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
              placeholder="Raised $10k, Managed team"
            />
          </div>
        </div>
      </AdminEditCard>

      {/* Volunteer Work List */}
      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            No volunteer records yet. Add one above.
          </div>
        ) : (
          initialData.map((volunteer, index) => (
            <VolunteerEditCard
              key={volunteer.id}
              volunteer={volunteer}
              isExpanded={expandedId === volunteer.id}
              onToggle={() => setExpandedId(expandedId === volunteer.id ? null : volunteer.id)}
              onDelete={() => handleDelete(volunteer.id)}
              onUp={index > 0 ? () => handleSwap(index, index - 1) : undefined}
              onDown={index < initialData.length - 1 ? () => handleSwap(index, index + 1) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
