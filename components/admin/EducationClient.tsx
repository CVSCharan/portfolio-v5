"use client";

import { useState } from "react";
import { AdminEditCard } from "@/components/admin/AdminEditCard";
import {
  addEducation,
  deleteEducation,
  reorderEducation,
  updateEducation,
} from "@/app/actions/educationActions";
import { useRouter } from "next/navigation";

function EducationEditCard({
  education,
  isExpanded,
  onToggle,
  onDelete,
  onUp,
  onDown,
}: {
  education: any;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUp: (() => void) | undefined;
  onDown: (() => void) | undefined;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(education);
  const [isSaving, setIsSaving] = useState(false);

  // Check if form is dirty by comparing with original education prop
  const isDirty = JSON.stringify(formData) !== JSON.stringify(education);

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateEducation(education.id, formData);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <AdminEditCard
      title={education.degree}
      subtitle={`${education.institution} • ${education.period}`}
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
          <label className="text-label text-muted-foreground mb-1.5 block">Degree / Certificate</label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Institution</label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Period (e.g. 2018 - 2022)</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Description (Optional)</label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Relevant Courses (Comma separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.courses) ? formData.courses.join(", ") : formData.courses || ""}
            onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            placeholder="Data Structures, Algorithms, Web Dev"
          />
        </div>
      </div>
    </AdminEditCard>
  );
}

export function EducationClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  // Add form state
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    period: "",
    description: "",
    courses: "",
  });

  const isAddDirty = newEducation.degree.trim() !== "" || newEducation.institution.trim() !== "";

  const handleAdd = async () => {
    setIsAdding(true);
    await addEducation({
      ...newEducation,
      order: initialData.length > 0 ? Math.max(...initialData.map(e => e.order)) + 1 : 0
    });
    setNewEducation({
      degree: "",
      institution: "",
      period: "",
      description: "",
      courses: "",
    });
    setIsAddExpanded(false);
    setIsAdding(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteEducation(id);
    router.refresh();
  };

  const handleSwap = async (indexA: number, indexB: number) => {
    const itemA = initialData[indexA];
    const itemB = initialData[indexB];
    const orderA = itemA.order;
    const orderB = itemB.order;
    
    await reorderEducation([
      { id: itemA.id, order: orderB },
      { id: itemB.id, order: orderA }
    ]);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Education</h2>
      </div>

      {/* Add New Section */}
      <AdminEditCard
        title="Add New Education"
        subtitle={isAddExpanded ? "Fill out details below" : "Click to expand and add a new degree"}
        isExpanded={isAddExpanded}
        onToggle={() => setIsAddExpanded(!isAddExpanded)}
        isDirty={isAddDirty}
        isSaving={isAdding}
        onSave={handleAdd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Degree / Certificate</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Institution</label>
            <input
              type="text"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Period (e.g. 2018 - 2022)</label>
            <input
              type="text"
              value={newEducation.period}
              onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Description (Optional)</label>
            <textarea
              value={newEducation.description}
              onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Relevant Courses (Comma separated)</label>
            <input
              type="text"
              value={newEducation.courses}
              onChange={(e) => setNewEducation({ ...newEducation, courses: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
              placeholder="Data Structures, Algorithms, Web Dev"
            />
          </div>
        </div>
      </AdminEditCard>

      {/* Education List */}
      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            No education records yet. Add one above.
          </div>
        ) : (
          initialData.map((education, index) => (
            <EducationEditCard
              key={education.id}
              education={education}
              isExpanded={expandedId === education.id}
              onToggle={() => setExpandedId(expandedId === education.id ? null : education.id)}
              onDelete={() => handleDelete(education.id)}
              onUp={index > 0 ? () => handleSwap(index, index - 1) : undefined}
              onDown={index < initialData.length - 1 ? () => handleSwap(index, index + 1) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
