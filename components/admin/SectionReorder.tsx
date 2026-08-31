"use client";

import { useState, useTransition } from "react";
import { Reorder } from "framer-motion";
import { GripVertical, Eye, EyeOff } from "lucide-react";
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

  const handleReorder = (newOrder: Section[]) => {
    setSections(newOrder);
  };

  const toggleVisibility = (id: number) => {
    setSections((prev) => 
      prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s)
    );
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Manage Sections</h2>
        <button 
          onClick={handleSave}
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-3">
        {sections.map((section) => (
          <Reorder.Item 
            key={section.id} 
            value={section} 
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="text-gray-400" size={20} />
            
            <div className="flex-1">
              <p className={`font-semibold ${section.visible ? "text-gray-900" : "text-gray-400 line-through"}`}>
                {section.title}
              </p>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleVisibility(section.id);
              }}
              className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {section.visible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
