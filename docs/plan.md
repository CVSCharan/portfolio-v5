# Project Plan

This document outlines the milestones and completed tasks for Portfolio v5.

## Completed Milestones

### Phase 1: Foundation & Setup
- [x] Initialized Next.js 16 App Router project.
- [x] Configured Tailwind CSS v4 and `eslint.config.mjs`.
- [x] Setup Prisma 8 Composer with PostgreSQL.
- [x] Implemented NextAuth credentials provider for Admin login.
- [x] Created database schema (User, Experience, Skill, Project, BlogPost, Admin).

### Phase 2: Architecture & Layout
- [x] Implemented Next-Themes (Light/Dark mode).
- [x] Built responsive "Dynamic Island" Navbar (`DynamicIslandNav.tsx`).
- [x] Established custom CSS utility design system (No Shadcn).

### Phase 3: Total UX Redesign (Sarvam AI Inspired)
- [x] Completely overhauled the visual identity to match the minimalist, typographic aesthetic of Sarvam AI.
- [x] Integrated `Bricolage Grotesque` and `Plus Jakarta Sans`.
- [x] Built a massive typographic Footer component with a 4-column grid.
- [x] Standardized all pages to use the new `PageHeader` component and unified CSS utility tokens (`.card`, `.btn`, `.badge`).
- [x] Replaced all 3D R3F/WebGL components with clean typographic alternatives.

### Phase 4: Error Handling & Analytics
- [x] Implemented Custom In-App Analytics (`PageView` model & `PageTracker` component).
- [x] Styled Error Boundaries (`error.tsx`, `global-error.tsx`) to match the new design system.

### Phase 5: Dynamic Content & AI Features
- [x] Extracted actual resume content and seeded DB (`prisma/seed.ts`).
- [x] Built Interactive Resume Page (`/resume`) with Timeline and Skill Matrix.
- [x] Built Embedded AI Chatbot simulation (`<AIChatbot />`) to query resume data (Refactored to match new UI tokens).

### Phase 6: Connecting the Core Pages
- [x] Connected all main routes (`/`, `/about`, `/projects`, `/skills`, `/experience`, `/resume`, `/blog`, `/contact`) to fetch dynamic data via Prisma ORM queries.

### Phase 6.5: Interactive Dashboards & UX Refinements
- [x] Completely overhauled the `/skills` page into an **Interactive Analyst Dashboard**.
- [x] Implemented search, proficiency filters, and cross-filtering on the Radar Chart.
- [x] Resolved `react-icons` build errors by migrating to a dynamic SimpleIcons CDN + Lucide fallback strategy.

## Upcoming Milestones (TODO)

### Phase 7: Admin Dashboard
- [ ] Refactor the Admin Dashboard UI to match the new Sarvam-inspired design system.
- [ ] Fix responsive overflow issues on Admin tables.
- [ ] Build UI for viewing the `PageView` analytics in the Admin panel.
- [ ] Ensure all CRUD operations (Create/Update/Delete) for Projects, Experience, and Skills are fully functional and secure.

### Phase 8: Final Polish
- [ ] Comprehensive ESLint pass and TypeScript strict checks.
- [ ] Performance and Core Web Vitals audit.
- [ ] Add the requested Hacker Terminal easter egg.
- [ ] Deploy to Production (Vercel).