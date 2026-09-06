"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import mermaid from "mermaid";
import { ArrowUpRight } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    fontFamily: "var(--font-sans)",
    primaryColor: "var(--color-bg)",
    primaryTextColor: "var(--color-text)",
    primaryBorderColor: "var(--color-border)",
    lineColor: "var(--color-text)",
    secondaryColor: "var(--color-accent-light)",
    tertiaryColor: "var(--color-bg-subtle)",
  },
});

export function MarkdownRenderer({ content }: { content: string }) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    mermaid.contentLoaded();
  }, [content]);

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none 
                 prose-img:rounded-xl prose-img:border prose-img:border-border/50
                 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [
          rehypeSanitize,
          {
            ...defaultSchema,
            tagNames: [...(defaultSchema.tagNames || []), "iframe", "style"],
            attributes: {
              ...defaultSchema.attributes,
              iframe: ["src", "allow", "allowfullscreen", "width", "height", "frameborder", "title"],
            },
          },
        ],
      ]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const isMermaid = match && match[1] === "mermaid";
          const codeString = String(children).replace(/\n$/, "");

          if (isMermaid) {
            return (
              <div className="mermaid flex justify-center my-8 p-4 bg-gray-50/50 dark:bg-gray-900/20 rounded-xl border border-border/50">
                {codeString}
              </div>
            );
          }

          if (!inline && match) {
            return (
              <div className="relative group">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(codeString);
                    setCopiedCode(codeString);
                    setTimeout(() => setCopiedCode(null), 2000);
                  }}
                  className="absolute right-2 top-2 p-2 rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-xs text-gray-300"
                >
                  {copiedCode === codeString ? "Copied!" : "Copy"}
                </button>
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            );
          }

          return (
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900 dark:text-gray-100 before:hidden after:hidden" {...props}>
              {children}
            </code>
          );
        },
        a({ node, href, children, ...props }: any) {
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              className="inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
              {isExternal && <ArrowUpRight className="w-3 h-3" />}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
