# Portfolio Client v5

Welcome to the fifth iteration of my personal portfolio. This project is a highly dynamic, AI-augmented web application designed to demonstrate my capabilities as a Full-Stack Developer with deep expertise in Data Analytics, LLM integrations, and modern web architectures.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **UI/Styling**: React, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Typography**: Bricolage Grotesque (Display) & Plus Jakarta Sans (UI)
- **Database & ORM**: PostgreSQL, Prisma 8 (Prisma Next / `@prisma/composer`)
- **Language**: TypeScript

## 🏗️ Architecture & Core Features

### 1. Database-Driven Content Management
Instead of hardcoding portfolio data into React components, the entire site is driven by a PostgreSQL database managed via **Prisma 8 Composer**.
- **`src/prisma/schema.prisma`**: Defines the data models (`User`, `Project`, `Experience`, `Skill`, `BlogPost`, `PageView`).
- **Data Seeding**: The `prisma/seed.ts` file automatically ingests real resume data (e.g., hybrid roles at Ninex Corp, Senexxel, Providence) into the database.

### 2. Global AI Chatbot (`<AIChatbot />`)
An embedded, floating chat widget that simulates a RAG (Retrieval-Augmented Generation) AI. Available globally across the entire application, it allows recruiters to "chat" with the resume and ask contextual questions about my experience and tech stack.

### 3. Advanced Experience Mapping
The UI intelligently handles complex career trajectories:
- **Hybrid Role Grouping**: The `/experience` and `/resume` routes use data-reduction algorithms to group multiple discrete roles (e.g., Full Stack Engineer AND Data Analyst) under a single parent company umbrella, rendering them as a unified nested timeline.

### 4. Interactive Skill Matrix Dashboard
The `/skills` route features a complex, highly interactive data dashboard built using a "Spatial Bento" design language:
- **Real-time Filtering & Search**: Users can search skills instantly or toggle between "Core Stack" and "Learning" proficiencies.
- **Cross-filtering Radar Chart**: Hovering over categories on the custom SVG Radar Chart dynamically dims unrelated skills in the bento grid.
- **Micro-interactions**: Hovering over individual skill cards reveals glassmorphic tooltips containing exact proficiency percentages and micro-bar charts.
- **Robust Icon Strategy**: Dynamically loads official SVGs from SimpleIcons CDN, with native Lucide icons acting as a bulletproof fallback, completely removing reliance on brittle icon libraries like `react-icons`.

### 4. Custom In-App Analytics
We have built a zero-dependency, privacy-focused, custom analytics engine.
- A `<PageTracker />` client component sits in the root layout, silently observing route changes.
- It logs the visitor's path, referrer, and user agent directly into the `PageView` table in Postgres.

### 5. Professional Error Boundaries & 404s
The application is wrapped in robust, Next.js standard error boundaries (`app/global-error.tsx`) and custom `not-found` handlers. They utilize a **Classic Professional** (corporate and clean) typographic design to ensure maximum reliability and user trust.

## 🎨 Design Philosophy
- **Aesthetic**: Warm, high-contrast, Classic Professional UI. Clean lines, subtle borders, and distinct typography.
- **Rule**: NO heavy generic gradients or bloated component libraries. We rely on a streamlined CSS custom property system (`btn`, `card`, `badge`) that automatically adapts to Light and Dark modes.
- **Navigation**: Uses a fluid, "Dynamic Island"-inspired responsive top navigation bar with a smooth collapsing mobile drawer.

## 🛠️ Local Development

```bash
# Install dependencies
bun install

# Apply database schema
bun prisma db push

# Seed the database with resume data
bun run prisma/seed.ts

# Run the development server
bun dev
```
