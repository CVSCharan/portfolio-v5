"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/app/actions/userActions";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  story: string | null;
  avatar: string | null;
}

export function PersonalForm({ initialData }: { initialData: UserProfile }) {
  const [formData, setFormData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateUserProfile(formData);
      alert("Personal Info saved successfully!");
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        <button 
          onClick={handleSave}
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Professional Bio (Short)</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="Full-Stack Developer | Data Enthusiast"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">My Story (Long Description)</label>
          <textarea
            name="story"
            value={formData.story || ""}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
            placeholder="I am a passionate software engineer with 5 years of experience..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-label text-muted-foreground mb-1.5 block">Avatar Image URL</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>
    </div>
  );
}
