"use client";

import { useState } from "react";
import { addSkill, updateSkill, deleteSkill } from "@/app/actions/skillActions";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function SkillClient({ skills }: { skills: any[] }) {
  const [items, setItems] = useState(skills);
  const [saving, setSaving] = useState(false);

  const [newName, setNewName] = useState("");
  const [newLevel, setNewLevel] = useState(50);
  const [newCategory, setNewCategory] = useState("");

  const router = useRouter();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCategory) return;

    setSaving(true);
    const newSkill = await addSkill({
      name: newName,
      level: newLevel,
      category: newCategory,
    });
    setItems([...items, newSkill]);
    setNewName("");
    setNewLevel(50);
    setSaving(false);
    router.refresh();
  };

  const handleUpdate = async (id: number, data: any) => {
    setSaving(true);
    await updateSkill(id, data);
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
    setSaving(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    await deleteSkill(id);
    setItems(items.filter((item) => item.id !== id));
    router.refresh();
  };

  // Group skills by category
  const groupedSkills = items.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  return (
    <div className="space-y-8">
      {/* Add New Skill Form */}
      <form
        onSubmit={handleAdd}
        className="bg-zinc-50 border border-zinc-100 p-6 rounded-xl space-y-4"
      >
        <h3 className="font-medium text-sm text-zinc-800">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Skill Name (e.g. React)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-2 border border-zinc-200 focus:outline-none focus:border-black text-sm w-full"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g. Frontend)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border border-zinc-200 focus:outline-none focus:border-black text-sm w-full"
            required
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 w-12">{newLevel}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={newLevel}
              onChange={(e) => setNewLevel(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? "Adding..." : "Add Skill"}
        </button>
      </form>

      {/* Skills Grid by Category */}
      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="space-y-4">
            <h3 className="font-medium text-zinc-900 border-b border-zinc-100 pb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {(categorySkills as any[]).map((skill: any) => (
                <div
                  key={skill.id}
                  className="group relative flex flex-col justify-between bg-white border border-zinc-200 rounded-lg p-3 w-40 hover:border-black transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{skill.name}</span>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 font-medium">
                        PROFICIENCY
                      </span>
                      <span className="text-[10px] font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-black h-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-zinc-500 text-sm italic">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
