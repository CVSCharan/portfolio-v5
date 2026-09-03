# Project Plan — CVS Charan Portfolio v5

> **Last updated:** 2026-09-03  
> See `docs/design.md` for the full design system reference.  
> See `docs/rag-chatbot.md` for the AI chatbot specification.

---

## Completed

### Foundation & Infrastructure
- [x] Next.js 16 App Router, Tailwind CSS v4, ESLint
- [x] Prisma 8 (Composer) + PostgreSQL schema
- [x] NextAuth credentials provider (Admin login)
- [x] Custom in-app analytics (`PageView` model + `PageTracker`)
- [x] Dynamic Island navbar (`DynamicIslandNav.tsx`) — Framer Motion
- [x] Typographic footer with 4-column grid + "charan" ghost text
- [x] Light/Dark mode (`next-themes`)
- [x] Custom CSS utility design system in `globals.css` (no shadcn/ui)
- [x] All public routes connected to Prisma ORM (`/`, `/about`, `/projects`, `/skills`, `/experience`, `/resume`, `/blog`, `/contact`)
- [x] Admin Dashboard — CRUD for all content types (Projects, Experience, Skills, Certifications, Languages, Education, Volunteer)
- [x] Resume page (`/resume`) with print-to-PDF, theme-switchable template
- [x] Removed: Three.js / R3F / WebGL 3D components, `react-icons`, `shadcn/ui`
- [x] Replaced `react-icons` with: SimpleIcons CDN + Lucide fallback strategy

### Design System — Home-Aligned Redesign
- [x] **Home page redesign** — Manifesto hero (clip-reveal "I build things that think."), bento grid, marquee ticker, numbered experience list
- [x] **`globals.css` Phase 1** — `prefers-reduced-motion` guard (all CSS keyframes), `.text-hero` token, `.text-page-title` token
- [x] **Home page Phase 2** — CSS gradient mesh on hero background, bento stats (`4+`, `20+`) in `text-secondary` blue, headline uses `.text-hero` class
- [x] **`AboutClient.tsx` Phase 3** — Full rewrite: ghost `02`, meta bar, clip-reveal name with blue period, animated rules, skills as editorial category rows, CTA matching home
- [x] **Footer** — Removed `/admin` link from public RESOURCES section
- [x] **Design system documented** — `docs/design.md` reflects current ground truth

### Admin & Polish (Post-Audit)
- [x] **Admin Redesign** — Migrated all CMS pages to `AdminEditCard` components with local state buffering, dirty-checking, and explicit save buttons. Functional UI overhaul with strict token usage.
- [x] **Admin Status Validation** — `AdminEditCard` buttons flash functional green "Saved!" or red "Error" upon submission.
- [x] **Reordering** — Replaced `framer-motion` drag-and-drop with Up/Down buttons in admin lists for cleaner accessibility and state management.
- [x] **CTA Consolidation** — Enforced the "Strict Diet" design principle by removing repetitive massive CTA blocks from public pages. The CTA remains on the `HomeClient` as the primary funnel.
- [x] **Current Role Marker** — Added green "availability" status dot pattern to `ExperienceClient` for "Present" roles.
- [x] **Mobile Nav Accessibility** — Added `react-focus-lock` to `DynamicIslandNav` and `useReducedMotion` support.

---

## In Progress

### Design System — Remaining Pages (Phases 4–7)
- [ ] **Phase 4** — `experience/page.tsx` — meta bar `CAREER · 04`, ghost `04`, "The Journey." headline, stats strip, numbered list (already partially matching home style)
- [ ] **Phase 5** — `SkillsClient.tsx` — meta bar `CAPABILITIES · 05`, ghost `05`, "The Arsenal." headline, simplified layout (remove complex dashboard — editorial category rows instead)
- [ ] **Phase 6** — `ProjectsGrid.tsx` + `projects/page.tsx` — meta bar `SELECTED WORK · 03`, ghost `03`, "What I Build." headline, featured card + grid
- [ ] **Phase 7** — `contact/page.tsx` — meta bar `CONTACT · 06`, ghost `06`, "Let's build something." headline, form
- [ ] **Phase 8** — `PageHeader.tsx` — evaluate whether it's still needed or should be replaced by the new per-page hero pattern

---

## Planned

### Blog
- [x] Implemented "Load More" pagination pattern with Prisma 8 ORM for efficient scaling
- [ ] Build blog content (admin → publish posts)
- [ ] Once posts exist: add "Latest Post" bento tile on home page
- [ ] Blog page styling aligned to design system (currently unstyled PageHeader pattern)

### AI Chatbot — RAG (LangChain + Gemini + Pinecone)
- [ ] Phase A — Install deps, Pinecone index, env vars
- [ ] Phase B — `lib/rag/ingest.ts` — chunk formatters + embedding + upsert
- [ ] Phase C — `lib/rag/retrieve.ts` + `app/api/chat/route.ts` — RAG + streaming
- [ ] Phase D — Upgrade `AIChatbot.tsx` — real fetch, stream reader, error state
- [ ] Phase E — Admin "Rebuild RAG Index" button in `/admin/settings`
- [ ] Phase F — Home bento tile: "Ask about my work →" (ships LAST, after D is tested)
- **Pre-requisites:** `GOOGLE_AI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX` in `.env.local`

### Performance & SEO
- [ ] Core Web Vitals audit (LCP, INP, CLS)
- [ ] `next/image` audit — ensure all images have explicit `sizes`
- [ ] `sitemap.xml` and `robots.txt`
- [ ] OG image generation for social sharing

### Deployment
- [ ] Vercel production deploy
- [ ] Environment variables migrated to Vercel dashboard
- [ ] Preview deployments on PR branches

---

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-09-01 | Removed Three.js/R3F 3D hero | Too heavy, wrong aesthetic direction |
| 2026-09-01 | Removed shadcn/ui | Clashes with custom token system |
| 2026-09-01 | Replaced react-icons with SimpleIcons CDN + Lucide | Build instability (missing exports) |
| 2026-09-02 | Chose Manifesto hero + Bento grid for home | Selected from 3 design concepts |
| 2026-09-02 | Color system: 3 colors only | Audit of home page — amber/violet rejected |
| 2026-09-02 | Green dot = status exception | Universally understood semantic, not a design color |
| 2026-09-03 | Removed `/admin` from public footer | Not advertising admin route to portfolio visitors |
| 2026-09-03 | Blog stays in nav | Being built — remove only if permanently abandoned |
| 2026-09-03 | AI chatbot bento tile deferred | Mock must be replaced with real RAG before surfacing |
| 2026-09-04 | "Load More" preferred over infinite scroll | Protects footer accessibility in portfolio design |
| 2026-09-04 | Numbered pagination for Admin views | Allows explicit navigation to older records |
| 2026-09-04 | Prisma 8 SQL Builder for array overlaps | ORM lacks `.has()`; SQL builder `fns.raw` maintains typings securely |