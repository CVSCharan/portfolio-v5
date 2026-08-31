# Project Plan

This document outlines the milestones and completed tasks for Portfolio v5.

## Completed Milestones

### Phase 1: Foundation & Setup
- [x] Initialized Next.js 15 App Router project.
- [x] Configured Tailwind CSS v4 and `eslint.config.mjs`.
- [x] Setup Prisma 8 Composer with PostgreSQL.
- [x] Implemented NextAuth credentials provider for Admin login.
- [x] Created database schema (User, Experience, Skill, Project, BlogPost, Admin).

### Phase 2: Core Components & Layout
- [x] Implemented Next-Themes (Light/Dark mode).
- [x] Built responsive "Dynamic Island" Navbar (`MobileNav.tsx`).
- [x] Defined Classic Professional design constraints (No heavy gradients, high contrast typography).

### Phase 3: 3D Interactions & "Wow" Factors
- [x] Integrated `three`, `@react-three/fiber`, and `@react-three/drei`.
- [x] Built `Hero3D` component (Interactive Icosahedron).
- [x] Built `not-found.tsx` (WebGL Black Hole with particle system).

### Phase 4: Error Handling & Analytics
- [x] Implemented Custom In-App Analytics (`PageView` model & `PageTracker` component).
- [x] Implemented Classic Professional Error Boundaries (`error.tsx`, `global-error.tsx`).

### Phase 5: Dynamic Content & AI Features
- [x] Extracted actual resume content and seeded DB (`prisma/seed.ts`).
- [x] Built Interactive Resume Page (`/resume`) with Timeline and Skill Matrix.
- [x] Built Embedded AI Chatbot simulation (`<AIChatbot />`) to query resume data.

### Phase 6: Connecting the Core Pages
- [x] Refactored `app/about/page.tsx` to fetch data directly from Prisma (currently hardcoded or semi-hardcoded).
- [x] Refactored `app/projects/page.tsx` to fetch from Prisma.
- [x] Refactored `app/page.tsx` (Home) to fetch user bio from Prisma.

## Upcoming Milestones (TODO)

### Phase 7: Admin Dashboard
- [ ] Build UI for viewing the `PageView` analytics in the Admin panel.
- [ ] Ensure all CRUD operations (Create/Update/Delete) for Projects, Experience, and Skills are fully functional and secure.

### Phase 8: Final Polish
- [ ] Comprehensive ESLint pass.
- [ ] Performance and Core Web Vitals audit.
- [ ] Deploy to Production (Vercel).