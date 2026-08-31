# Data Schema

Our portfolio uses a PostgreSQL database managed via Prisma Next (`@prisma/orm-postgres`) as the single source of truth for all data, allowing management through the `/admin` panel.

## Prisma Next Contract

```prisma
// src/prisma/contract.prisma
model Admin {
  id        Int       @id @default(autoincrement())
  username  String    @unique
  password  String    // Hashed password for NextAuth credentials login
}

model Project {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  description String?
  techStack   String[]
  githubUrl   String?
  demoUrl     String?
  imageUrl    String?
  order       Int      @default(0)
}

model Skill {
  id       Int    @id @default(autoincrement())
  name     String
  level    Int
  category String
}

model Experience {
  id          Int     @id @default(autoincrement())
  title       String
  company     String
  period      String
  description String?
}

model BlogPost {
  id        Int     @id @default(autoincrement())
  title     String
  slug      String  @unique
  excerpt   String?
  content   String?
  published Boolean @default(false)
}
```

## Database Setup Instructions

1. **Environment Variables**: Ensure your `.env` has the database connection string:
   ```
   DATABASE_URL="postgres://neon_owner:YOUR_PASSWORD@ep.region.neon.tech/neondb?sslmode=require"
   ```
2. **Install Dependencies**:
   ```bash
   npm install @prisma/orm-postgres @prisma/client
   npm install --save-dev @prisma/cli-engine prisma
   ```
3. **Run initialization**:
   ```bash
   npx prisma contract emit
   npx prisma db init
   ```
4. **Prisma Next Database Utility** (`src/prisma/db.ts`):
   ```ts
   import { Prisma } from "@prisma/client";

   export const db = Prisma.connect();
   ```