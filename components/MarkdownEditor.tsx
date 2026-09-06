"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useTheme } from "next-themes";
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export function MarkdownEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { theme } = useTheme();

  return (
    <div data-color-mode={theme === "dark" ? "dark" : "light"}>
      <MDEditor
        value={value}
        onChange={(v) => onChange(v || "")}
        height={600}
        preview="live"
        components={{
          preview: (source) => {
            return (
              <div className="p-4">
                <MarkdownRenderer content={source} />
              </div>
            );
          }
        }}
      />
    </div>
  );
}
