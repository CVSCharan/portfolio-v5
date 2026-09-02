# Portfolio Client v5

Fifth iteration of my personal portfolio — a database-driven, AI-augmented web application built to showcase full-stack engineering, data analytics, and LLM integration skills.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Vanilla CSS via Tailwind CSS v4 + design tokens |
| Animation | Framer Motion |
| Icons | Lucide React |
| Typography | Bricolage Grotesque (Display) · Plus Jakarta Sans (UI) |
| Database | PostgreSQL (Neon serverless) |
| ORM | Prisma 8 (`@prisma/orm-postgres`) — contract-first |
| Deployment | Vercel |

## 🏗️ Architecture & Features

### 1. Database-Driven Content
Every page is driven by PostgreSQL. No hardcoded data in components.

**Models:** `User`, `Project`, `Experience`, `Skill`, `Education`, `BlogPost`, `Certification`, `Language`, `VolunteerWork`, `PageView`, `ResumeSection`, `ResumeSettings`

**Project model fields (v5):**
- Core: `title`, `slug`, `description`, `category`, `order`, `isActive`, `isFeatured`
- Rich content: `fullDescription`, `highlights[]`, `role`, `timeline`
- Media: `imageUrl`, `githubUrl`, `demoUrl`
- Stack: `techStack[]`
- Impact: `metrics: Json?` — `[{ label, value }]` shape — conditionally rendered, never placeholder

### 2. v5 Design System
All pages share a unified structural DNA:
- `-mx-5 md:-mx-10` full-bleed wrapper
- Ghost number: `clamp(8rem, 22vw, 22rem)`, `opacity: 0.04`
- Meta bar: section label left · chapter number right · `border-b border-border`
- Headline: `text-page-title` with clip-reveal (`animate`, not `whileInView`)
- Accent rule: `h-px bg-border` with `scaleX` reveal
- Accent color: reserved for moments — numbers, label pulses, punctuation — never repeated title text

### 3. Project Detail Pages (`/projects/[slug]`)
Each project page is a full editorial case study:
- **At-a-Glance strip** — computed from existing data (stack count, category, status)
- **The Brief** — `fullDescription` split on `\n\n` into Problem + Approach columns; single-block fallback if unseparated
- **Impact Metrics** — renders only when `metrics` JSON field has real data
- **Key Highlights** — `divide-y` list with accent-numbered entries
- **Tech Stack** — grouped by inferred category (Frontend / Backend / Database / DevOps / AI / Other)
- **Next Project** — walks canonical `order ASC` (matches ghost number, no featured filter)

### 4. Admin Panel (`/admin`)
Full content management for all models. Project editor supports all fields:
- `fullDescription` with blank-line separator hint
- `highlights` as line-separated textarea
- `metrics` as JSON textarea — validated server-side before any DB write; malformed JSON returns a readable error

### 5. Global AI Chatbot
Floating chat widget (RAG-style) available across all pages — allows recruiters to query resume content contextually.

### 6. Custom Analytics
`<PageTracker />` silently logs path, referrer, and user agent into `PageView` table on every route change. Zero external dependencies.

## 🗄️ Database Migrations

New columns are added via safe, additive migration scripts — never destructive:

```bash
# Add role, timeline, metrics columns to project table
npx tsx scripts/add-project-fields.ts

# Re-emit contract types after schema changes
npx prisma contract emit
```

## 🛠️ Local Development

```bash
# Install dependencies
bun install

# Emit Prisma contract (generates contract.json + contract.d.ts)
npx prisma contract emit

# Run dev server
bun dev
```

## 📁 Key Files

```
src/prisma/
  contract.prisma     # Source of truth for all models
  contract.json       # Auto-generated — do not edit
  contract.d.ts       # Auto-generated — do not edit
  db.ts               # Prisma runtime instance

src/actions/
  projects.ts         # Server actions: createProject, updateProject, deleteProject
                      # Includes JSON validation for metrics field

components/
  ProjectDetailClient.tsx   # Project case study page
  ProjectsClient.tsx        # Projects grid page
  AboutClient.tsx           # About page
  ExperienceClient.tsx      # Experience page

scripts/
  add-project-fields.ts     # Migration: adds role, timeline, metrics columns
```
