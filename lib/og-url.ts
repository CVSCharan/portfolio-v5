/**
 * Deterministic OG image URL builder for project cards and the cinema hero.
 *
 * VERSION bumps bust all CDN-cached images at once — no manual purge needed.
 * Content changes (title/desc/tags edits) auto-bust via URL param change.
 */
const VERSION = "v1";

export function projectOgUrl(
  project: {
    title: string;
    description?: string | null;
    techStack?: readonly string[];
  },
  ratio?: "cinema"
): string {
  const params = new URLSearchParams({
    title: project.title,
    ...(project.description ? { desc: project.description } : {}),
    ...(project.techStack?.length
      ? {
          // Encode each tag individually so C#, C++, etc. don't corrupt the query string
          tags: project.techStack
            .slice(0, 5)
            .map(encodeURIComponent)
            .join(","),
        }
      : {}),
    ...(ratio ? { ratio } : {}),
  });

  // Use NEXT_PUBLIC_SITE_URL — same pattern as layout.tsx, sitemap.ts, robots.ts
  const base =
    typeof window === "undefined"
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? "")
      : "";

  return `${base}/api/og/project/${VERSION}?${params}`;
}
