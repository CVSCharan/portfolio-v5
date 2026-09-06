"use client";

import { useTransition, useState } from "react";
import { updateResumeSettings } from "@/app/actions/resumeSettingsActions";
import { rebuildRagIndex } from "@/app/actions/ragActions";
import { Check, Database, Loader2 } from "lucide-react";

const TEMPLATES = [
  { id: "T1", label: "T1 — Simple & Elegant", desc: "Two-column, clean typography, accent bar." },
  { id: "T2", label: "T2 — Modern Sidebar", desc: "Coming soon" },
  { id: "T3", label: "T3 — Minimal One-Column", desc: "Coming soon" },
  { id: "T4", label: "T4 — Bold Header", desc: "Coming soon" },
];

const THEMES = [
  { id: "blue",    hex: "#3b82f6", label: "Blue" },
  { id: "violet",  hex: "#8b5cf6", label: "Violet" },
  { id: "emerald", hex: "#10b981", label: "Emerald" },
  { id: "amber",   hex: "#f59e0b", label: "Amber" },
  { id: "rose",    hex: "#f43f5e", label: "Rose" },
  { id: "slate",   hex: "#64748b", label: "Slate" },
  { id: "cyan",    hex: "#06b6d4", label: "Cyan" },
  { id: "orange",  hex: "#f97316", label: "Orange" },
];

const LAYOUTS = [
  { id: "standard", label: "Standard", desc: "Full sections visible" },
  { id: "compact",  label: "Compact",  desc: "Condensed for 1-page fit" },
];

interface SettingsClientProps {
  initialTemplate: string;
  initialTheme: string;
  initialLayout: string;
}

export function SettingsClient({
  initialTemplate,
  initialTheme,
  initialLayout,
}: SettingsClientProps) {
  const [template, setTemplate] = useState(initialTemplate);
  const [theme, setTheme] = useState(initialTheme);
  const [layout, setLayout] = useState(initialLayout);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [ragStatus, setRagStatus] = useState<"idle" | "building" | "success" | "error">("idle");
  const [ragMessage, setRagMessage] = useState("");

  function handleSave() {
    startTransition(async () => {
      await updateResumeSettings({ activeTemplate: template, activeTheme: theme, activeLayout: layout });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  async function handleRebuildRag() {
    setRagStatus("building");
    setRagMessage("Fetching content and embedding vectors...");
    const res = await rebuildRagIndex();
    if (res.success) {
      setRagStatus("success");
      setRagMessage(`Successfully indexed ${res.count} chunks.`);
    } else {
      setRagStatus("error");
      setRagMessage(`Error: ${res.error}`);
    }
    setTimeout(() => {
      setRagStatus("idle");
      setRagMessage("");
    }, 4000);
  }

  return (
    <div className="space-y-10">
      {/* Template */}
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          Template
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              disabled={t.desc === "Coming soon"}
              className={`relative text-left p-4 rounded-xl border transition-all duration-200 ${
                template === t.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-border/80 bg-card"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {template === t.id && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </span>
              )}
              <p className="text-sm font-semibold text-foreground">{t.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Theme Color */}
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          Accent Color
        </h2>
        <div className="flex flex-wrap gap-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={t.label}
              className="relative w-9 h-9 rounded-full border-2 transition-all duration-200"
              style={{
                backgroundColor: t.hex,
                borderColor: theme === t.id ? t.hex : "transparent",
                outline: theme === t.id ? `3px solid ${t.hex}40` : "none",
              }}
            >
              {theme === t.id && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Layout */}
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          Layout Density
        </h2>
        <div className="flex gap-3">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLayout(l.id)}
              className={`px-5 py-3 rounded-xl border text-sm transition-all duration-200 ${
                layout === l.id
                  ? "border-primary bg-primary/5 text-foreground font-semibold"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="block font-medium">{l.label}</span>
              <span className="text-xs opacity-70">{l.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={isPending}
        className="btn btn-primary btn-md gap-2 min-w-[140px]"
      >
        {isPending ? "Saving…" : saved ? "✓ Saved!" : "Save Settings"}
      </button>

      <hr className="border-border my-10" />

      {/* RAG Settings */}
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
          AI Chatbot RAG
        </h2>
        <div className="p-5 border border-border rounded-xl bg-card max-w-md">
          <p className="text-sm text-muted-foreground mb-4">
            Rebuild the Pinecone-style Postgres vector embeddings from your latest portfolio data.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRebuildRag}
              disabled={ragStatus === "building"}
              className="btn bg-primary text-primary-foreground hover:bg-primary/90 btn-sm gap-2"
            >
              {ragStatus === "building" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  Rebuild Index
                </>
              )}
            </button>
            {ragMessage && (
              <span className={`text-sm ${ragStatus === "error" ? "text-red-500" : "text-green-500"}`}>
                {ragMessage}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
