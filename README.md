# Portfolio Client v5

Welcome to the fifth iteration of my personal portfolio. This project is a highly dynamic, AI-augmented web application designed to demonstrate my capabilities as a Full-Stack Developer with deep expertise in Data Analytics, LLM integrations, and modern web architectures.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **UI/Styling**: React, Tailwind CSS v4, Shadcn UI, Framer Motion, Lucide Icons
- **Database & ORM**: PostgreSQL, Prisma 8 (Prisma Next / `@prisma/composer`)
- **3D Interactions**: Three.js, React Three Fiber (R3F), React Three Drei
- **Language**: TypeScript

## 🏗️ Architecture & Core Features

### 1. Database-Driven Content Management
Instead of hardcoding portfolio data into React components, the entire site is driven by a PostgreSQL database managed via **Prisma 8 Composer**.
- **`src/prisma/schema.prisma`**: Defines the data models (`User`, `Project`, `Experience`, `Skill`, `BlogPost`, `PageView`).
- **Data Seeding**: The `prisma/seed.ts` file automatically ingests real resume data (experiences at Ninex Corp, Senexxel, Providence, etc.) into the database.

### 2. Custom In-App Analytics
We have built a zero-dependency, privacy-focused, custom analytics engine.
- A `<PageTracker />` client component sits in the root layout, silently observing route changes.
- It POSTs to `/api/analytics/pageview`, logging the visitor's path, referrer, and user agent directly into the `PageView` table in Postgres.

### 3. Professional Error Boundaries
The application is wrapped in robust, Next.js standard error boundaries (`app/error.tsx` and `app/global-error.tsx`).
- These screens explicitly avoid overly flashy or abstract 3D aesthetics in favor of a **Classic Professional** (corporate and clean) design using Shadcn UI. This ensures maximum reliability and user trust during unexpected failures.

### 4. Interactive Resume (`/resume`)
A dedicated, highly interactive route that goes beyond a standard PDF:
- **Timeline**: A vertical timeline mapping out professional experience.
- **Skill Matrix**: A categorized badge system for technical skills.
- **AI Chatbot (`<AIChatbot />`)**: An embedded, floating chat widget that simulates a RAG (Retrieval-Augmented Generation) AI. It allows recruiters to "chat" with the resume and ask questions about my experience and tech stack.

### 5. 3D WebGL Elements
While the overall design is "classic professional," specific areas leverage WebGL for "out-of-the-box" WOW factors:
- **Hero3D**: An interactive, rotating Icosahedron on the homepage.
- **404 Black Hole**: A custom GLSL shader rendering a neon black hole and particle starfield for the "Not Found" page.

## 🎨 Design Philosophy
- **Aesthetic**: Classic Professional. Clean lines, solid backgrounds, high contrast. 
- **Rule**: NO heavy gradients for backgrounds. We rely on subtle borders, backdrop blurs (glassmorphism), and distinct typography.
- **Navigation**: Uses a Dynamic Island-inspired responsive top navigation bar with a mobile hamburger menu.

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Update Prisma Database & Generate Typings
npm run postinstall
npx prisma db update
npm run contract:emit

# Seed the database with resume data
npx tsx prisma/seed.ts

# Run the development server
bun dev
```
