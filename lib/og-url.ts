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
    ...(ratio ? { ratio } : {}),
  });

  if (project.techStack?.length) {
    project.techStack.slice(0, 5).forEach((tag) => params.append("tag", tag));
  }

  // Always use NEXT_PUBLIC_SITE_URL so the URL is absolute.
  // Next.js treats relative paths with query strings as localPatterns requiring strict search whitelisting.
  // Absolute URLs are processed via remotePatterns, which we already configured for this domain.
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return `${base}/api/og/project/${VERSION}?${params}`;
}

/**
 * Generates the cover image URL for a project.
 * If the project has a live demo URL, it returns a live screenshot of that website.
 * If no demo URL exists, it falls back to the generated text-based OG card.
 */
export function projectCoverUrl(
  project: {
    title: string;
    description?: string | null;
    techStack?: readonly string[];
    imageUrl?: string | null;
    cachedScreenshotUrl?: string | null;
    demoUrl?: string | null;
  },
  ratio?: "cinema"
): string {
  if (project.imageUrl) return project.imageUrl;
  if (project.cachedScreenshotUrl) return project.cachedScreenshotUrl;
  
  return projectOgUrl(project, ratio);
}
