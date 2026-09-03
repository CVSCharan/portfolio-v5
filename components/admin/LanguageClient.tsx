"use client";

import { useState } from "react";
import { AdminEditCard } from "@/components/admin/AdminEditCard";
import {
  addLanguage,
  deleteLanguage,
  reorderLanguages,
  updateLanguage,
} from "@/app/actions/languageActions";
import { useRouter } from "next/navigation";

function LanguageEditCard({
  language,
  isExpanded,
  onToggle,
  onDelete,
  onUp,
  onDown,
}: {
  language: any;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUp: (() => void) | undefined;
  onDown: (() => void) | undefined;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(language);
  const [isSaving, setIsSaving] = useState(false);

  // Check if form is dirty by comparing with original language prop
  const isDirty = JSON.stringify(formData) !== JSON.stringify(language);

  const handleUpdate = async () => {
    setIsSaving(true);
    await updateLanguage(language.id, formData);
    setIsSaving(false);
    router.refresh();
  };

  return (
    <AdminEditCard
      title={language.title}
      subtitle={language.proficiency}
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
          <label className="text-label text-muted-foreground mb-1.5 block">Language</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Proficiency</label>
          <input
            type="text"
            value={formData.proficiency}
            onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
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
            placeholder="Exam scores, study abroad experience"
          />
        </div>
      </div>
    </AdminEditCard>
  );
}

export function LanguageClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  // Add form state
  const [isAddExpanded, setIsAddExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newLanguage, setNewLanguage] = useState({
    title: "",
    proficiency: "",
    additionalInfo: "",
    extraDetails: "",
    highlights: "",
  });

  const isAddDirty = newLanguage.title.trim() !== "";

  const handleAdd = async () => {
    setIsAdding(true);
    await addLanguage({
      ...newLanguage,
      order: initialData.length > 0 ? Math.max(...initialData.map(e => e.order)) + 1 : 0
    });
    setNewLanguage({
      title: "",
      proficiency: "",
      additionalInfo: "",
      extraDetails: "",
      highlights: "",
    });
    setIsAddExpanded(false);
    setIsAdding(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteLanguage(id);
    router.refresh();
  };

  const handleSwap = async (indexA: number, indexB: number) => {
    const itemA = initialData[indexA];
    const itemB = initialData[indexB];
    const orderA = itemA.order;
    const orderB = itemB.order;
    
    await reorderLanguages([
      { id: itemA.id, order: orderB },
      { id: itemB.id, order: orderA }
    ]);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Languages</h2>
      </div>

      {/* Add New Section */}
      <AdminEditCard
        title="Add New Language"
        subtitle={isAddExpanded ? "Fill out details below" : "Click to expand and add a new language"}
        isExpanded={isAddExpanded}
        onToggle={() => setIsAddExpanded(!isAddExpanded)}
        isDirty={isAddDirty}
        isSaving={isAdding}
        onSave={handleAdd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Language</label>
            <input
              type="text"
              value={newLanguage.title}
              onChange={(e) => setNewLanguage({ ...newLanguage, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Proficiency</label>
            <input
              type="text"
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Additional Info (Optional)</label>
            <input
              type="text"
              value={newLanguage.additionalInfo}
              onChange={(e) => setNewLanguage({ ...newLanguage, additionalInfo: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Extra Details (Optional)</label>
            <textarea
              value={newLanguage.extraDetails}
              onChange={(e) => setNewLanguage({ ...newLanguage, extraDetails: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground resize-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label text-muted-foreground mb-1.5 block">Highlights (Comma separated)</label>
            <input
              type="text"
              value={newLanguage.highlights}
              onChange={(e) => setNewLanguage({ ...newLanguage, highlights: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground/20 outline-none transition-colors text-foreground"
              placeholder="Exam scores, study abroad experience"
            />
          </div>
        </div>
      </AdminEditCard>

      {/* Language List */}
      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
            No language records yet. Add one above.
          </div>
        ) : (
          initialData.map((language, index) => (
            <LanguageEditCard
              key={language.id}
              language={language}
              isExpanded={expandedId === language.id}
              onToggle={() => setExpandedId(expandedId === language.id ? null : language.id)}
              onDelete={() => handleDelete(language.id)}
              onUp={index > 0 ? () => handleSwap(index, index - 1) : undefined}
              onDown={index < initialData.length - 1 ? () => handleSwap(index, index + 1) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
