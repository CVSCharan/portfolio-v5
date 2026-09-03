"use client";

import { useState } from "react";
import { AdminEditCard } from "@/components/admin/AdminEditCard";
import {
  addExperience,
  deleteExperience,
  reorderExperience,
  updateExperience,
} from "@/app/actions/experienceActions";
import { useRouter } from "next/navigation";

function ExperienceEditCard({
  experience,
  isExpanded,
  onToggle,
  onDelete,
  onUp,
  onDown,
}: {
  experience: any;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUp: (() => void) | undefined;
  onDown: (() => void) | undefined;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(experience);
  const [isSaving, setIsSaving] = useState(false);

  // Check if form is dirty by comparing with original experience prop
  const isDirty = JSON.stringify(formData) !== JSON.stringify(experience);

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateExperience(experience.id, formData);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <AdminEditCard
      title={experience.title}
      subtitle={`${experience.company} • ${experience.period}`}
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
          <label className="text-label text-muted-foreground mb-1.5 block">Job Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Company Name</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Period (e.g. Jan 2021 - Present)</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Role Description</label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Key Highlights (Comma separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.highlights) ? formData.highlights.join(", ") : formData.highlights || ""}
            onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            placeholder="Built CI/CD pipeline, Managed 5 devs"
          />
        </div>
      </div>
    </AdminEditCard>
  );
}

export function ExperienceClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  // Add form state
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
    highlights: "",
  });

  const isAddDirty = newExperience.title.trim() !== "" || newExperience.company.trim() !== "";

  const handleAdd = async () => {
    setIsAdding(true);
    await addExperience({
      ...newExperience,
      order: initialData.length > 0 ? Math.max(...initialData.map(e => e.order)) + 1 : 0
    });
    setNewExperience({
      title: "",
      company: "",
      period: "",
      description: "",
      highlights: "",
    });
    setIsAddExpanded(false);
    setIsAdding(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteExperience(id);
    router.refresh();
  };

  const handleSwap = async (indexA: number, indexB: number) => {
    const itemA = initialData[indexA];
    const itemB = initialData[indexB];
    const orderA = itemA.order;
    const orderB = itemB.order;
    
    await reorderExperience([
      { id: itemA.id, order: orderB },
      { id: itemB.id, order: orderA }
    ]);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
      </div>

      {/* Add New Section */}
      <AdminEditCard
        title="Add New Experience"
        subtitle={isAddExpanded ? "Fill out details below" : "Click to expand and add a new role"}
        isExpanded={isAddExpanded}
        onToggle={() => setIsAddExpanded(!isAddExpanded)}
        isDirty={isAddDirty}
        isSaving={isAdding}
        onSave={handleAdd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Job Title</label>
            <input
              type="text"
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Company Name</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Period (e.g. Jan 2021 - Present)</label>
            <input
              type="text"
              value={newExperience.period}
              onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Role Description</label>
            <textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Key Highlights (Comma separated)</label>
            <input
              type="text"
              value={newExperience.highlights}
              onChange={(e) => setNewExperience({ ...newExperience, highlights: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
              placeholder="Built CI/CD pipeline, Managed 5 devs"
            />
          </div>
        </div>
      </AdminEditCard>

      {/* Experience List */}
      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            No experience records yet. Add one above.
          </div>
        ) : (
          initialData.map((experience, index) => (
            <ExperienceEditCard
              key={experience.id}
              experience={experience}
              isExpanded={expandedId === experience.id}
              onToggle={() => setExpandedId(expandedId === experience.id ? null : experience.id)}
              onDelete={() => handleDelete(experience.id)}
              onUp={index > 0 ? () => handleSwap(index, index - 1) : undefined}
              onDown={index < initialData.length - 1 ? () => handleSwap(index, index + 1) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
