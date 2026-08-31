# Portfolio Plan

## 1. Architecture & Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Database & ORM**: PostgreSQL (e.g., Neon) managed via Prisma
- **Authentication**: NextAuth.js (Auth.js) using custom Credentials provider (Self-hosted, 100% free)
- **Deployment**: Vercel

## 2. Data Schema

### Prisma Next Data Contract
Our primary source of truth is the PostgreSQL database managed by Prisma Next. The schema includes models for User (Admin), Project, Skill, Experience, and BlogPost.
(See `docs/schema.md` for full schema definition or `src/prisma/contract.prisma`).

### API Routes & Data Fetching (Next.js App Router)
Data for the public portfolio is fetched directly from the database using **React Server Components** for optimal performance and SEO.
Admin management (CRUD operations) is handled either through Server Actions or protected API routes under `app/api/`.

## 3. Design System
| Aspect | Recommendation |
|--------|----------------|
| **Color palette** | 3-5 colors, use Tailwind `theme.extend.colors` |
| **Typography** | Inter or DM Sans UI, serif for headings; `tailwindcss` `prose` for blog |
| **Components** | `Button`, `Card`, `Navbar`, `ProjectCard`, `SkillTag`, `Modal` |
| **Accessibility** | `aria-label`, `alt` text, keyboard nav, contrast ≥ 4.5:1 |
| **Responsive** | Mobile-first breakpoints: sm, md, lg, xl |
| **Animations** | `framer-motion` micro-interactions |
| **Icons** | `@heroicons/react` or `lucide-react` |

## 4. Key Pages/Sections
- `/` — Hero with intro + CTA
- `/about` — Bio, avatar, download CV
- `/projects` — Grid/filter, each with image, tech stack, links
- `/skills` — Progress bars or donut charts
- `/experience` — Timeline view
- `/blog` — List of blog posts with pagination and search
- `/contact` — Form (resend/together/formspree)
- `/resume` — PDF or rendered from JSON
- **`/admin`** — Secure dashboard for managing all portfolio data, protected by NextAuth.

## 5. Performance & SEO
- `next/image`, `next/font`, automatic static optimization
- Dynamic `generateMetadata` per route
- Schema.org `Person`, `Project`, `Breadcrumb`
- Lighthouse: Performance >90, Accessibility >80
- Core Web Vitals monitoring with `next analyze`

## 6. Authentication & Admin Panel
- **NextAuth.js**: Configured with a `Credentials` provider for custom login, avoiding external paid services.
- **Admin Dashboard**: Located at `app/(admin)/page.tsx`, allowing full CRUD operations on portfolio data.

## 7. Deployment Checklist
1. Connect repo to Vercel
2. Set env vars (`NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`)
3. Run database migrations via Vercel build command or manually (`npx prisma migrate deploy`)
4. `vercel deploy` — preview URLs per branch
5. Custom domain + HTTPS

## 8. Quick Start Commands
```bash
npm install
# Setup the database
npx prisma contract emit
npx prisma db init
# Seed data
npx tsx src/prisma/seed.ts
# Run app
npm run dev
```

## 9. Folder Structure
```
src/
  app/           # Next.js App Router pages (includes /admin)
  components/    # Reusable UI components
  lib/           # Utilities (auth, etc.)
  prisma/        # Prisma Next contract (contract.prisma) and seed.ts
  styles/        # Global CSS, Tailwind config
  types/         # TypeScript shared types
public/
  favicon.ico
```