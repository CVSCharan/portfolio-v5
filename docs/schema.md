# Data Schema

Our portfolio uses a PostgreSQL database (e.g., Neon) managed via Prisma as the single source of truth for all data, allowing management through the `/admin` panel.

## Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        Int       @id @default(autoincrement)
  username  String    @unique
  password  String    // Hashed password for NextAuth credentials login
  createdAt DateTime  @default(now)
}

model User {
  id        Int       @id @default(autoincrement)
  name      String
  email     String    @unique
  bio       String?   // short biography
  avatar    String?   // URL to profile picture
  createdAt DateTime  @default(now)
}

model Project {
  id        Int       @id @default(autoincrement)
  title     String
  slug      String    @unique // SEO-friendly identifier
  description String? // long-form description
  techStack String[]  // e.g. ["React", "Next.js", "Tailwind"]
  githubUrl String? // link to repository
  demoUrl   String? // live demo link
  imageUrl  String? // hero image
  order     Int       @default(0) // control display order
  createdAt DateTime @default(now)
}

model Skill {
  id       Int   @id @default(autoincrement)
  name     String // e.g. "JavaScript", "CSS"
  level    Int    // 1 (beginner) – 5 (expert)
  category String // "frontend", "design", "backend", etc.
}

model Experience {
  id       Int   @id @default(autoincrement)
  title    String // e.g. "Frontend Developer"
  company  String
  period   String // e.g. "Jan 2023 – Present"
  description String? // bullet points
}

model BlogPost {
  id        Int       @id @default(autoincrement)
  title     String
  slug      String    @unique
  excerpt   String?
  content   String?   // MDX/HTML body
  authorId  Int?      // optional link to User
  createdAt DateTime @default(now)
  published Boolean   @default(false)
  viewCount Int       @default(0)

  author User? @relation(fields: [authorId], references: [id])
}
```

## Database Setup Instructions

1. **Environment Variables**: Ensure your `.env` has the database connection string:
   ```
   DATABASE_URL="postgres://neon_owner:YOUR_PASSWORD@ep.region.neon.tech/neondb?sslmode=require"
   ```
2. **Install Prisma** (if not already installed):
   ```bash
   npm install prisma @prisma/client
   ```
3. **Run migrations**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. **Prisma Client Utility** (`src/lib/prisma.ts`):
   ```ts
   import { PrismaClient } from "@prisma/client"
   
   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined
   }
   
   export const prisma =
     globalForPrisma.prisma ?? new PrismaClient({
       log: ["query", "error"],
     })
   
   if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
   ```