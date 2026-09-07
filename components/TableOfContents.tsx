"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Small delay to allow markdown to render completely
    const timeout = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));
      const headingData = elements.map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.charAt(1)),
      })).filter(h => h.id);

      setHeadings(headingData);

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter(entry => entry.isIntersecting);
          if (visibleEntries.length > 0) {
            // Find the first visible heading
            setActiveId(visibleEntries[0].target.id);
          }
        },
        { rootMargin: "0px 0px -80% 0px" }
      );

      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between lg:block">
        <h3 className="font-semibold text-sm tracking-wide uppercase text-muted-foreground" >
          On this page
        </h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <nav className={`lg:block ${isExpanded ? "block" : "hidden"}`}>
        <ul className="space-y-2.5 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
            >
              <a
                href={`#${heading.id}`}
                onClick={() => setIsExpanded(false)}
                className={`block transition-colors hover:text-foreground ${
                  activeId === heading.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
