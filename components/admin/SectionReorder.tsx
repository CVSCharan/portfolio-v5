"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { updateSectionOrder } from "@/app/actions/sectionActions";
import { useRouter } from "next/navigation";

interface Section {
  id: number;
  name: string;
  title: string;
  order: number;
  visible: boolean;
}

export function SectionReorder({ initialSections }: { initialSections: Section[] }) {
  const [sections, setSections] = useState(initialSections);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleVisibility = (id: number) => {
    setSections((prev) => 
      prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s)
    );
  };

  const handleSwap = (indexA: number, indexB: number) => {
    setSections((prev) => {
      const newSections = [...prev];
      const temp = newSections[indexA];
      newSections[indexA] = newSections[indexB];
      newSections[indexB] = temp;
      return newSections;
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      const updates = sections.map((s, index) => ({
        id: s.id,
        order: index,
        visible: s.visible
      }));
      await updateSectionOrder(updates);
      router.refresh();
      alert("Section order saved successfully!");
    });
  };

  const isDirty = JSON.stringify(sections) !== JSON.stringify(initialSections);

  return (
    <div className="bg-background rounded-2xl shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Manage Sections</h2>
        <button 
          onClick={handleSave}
          disabled={isPending || !isDirty}
          className="bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <div
            key={section.id} 
            className="flex items-center gap-4 bg-muted/10 border border-border p-4 rounded-xl"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleSwap(index, index - 1)}
                disabled={index === 0}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                title="Move Up"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => handleSwap(index, index + 1)}
                disabled={index === sections.length - 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                title="Move Down"
              >
                <ArrowDown size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <p className={`font-semibold ${section.visible ? "text-foreground" : "text-muted-foreground line-through"}`}>
                {section.title}
              </p>
            </div>

            <button 
              onClick={() => toggleVisibility(section.id)}
              className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {section.visible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
