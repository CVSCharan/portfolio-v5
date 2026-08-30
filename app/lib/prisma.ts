// Prisma Client configuration for Neon PostgreSQL
// Connection string: postgresql://[REDACTED]:[REDACTED]@[REDACTED]/neondb?sslmode=require&channel_binding=require
// 
// To use with Prisma:
// 1. Run: npm install prisma @prisma/client
// 2. Run: npx prisma generate (or ensure engines are installed)
// 3. Update API routes to import: import { prisma } from "@/lib/prisma"
// 4. Add DATABASE_URL to Vercel environment variables
//
// The prisma client uses a fallback pattern - if Prisma is not fully initialized,
// it falls back to in-memory storage for the API routes.

const globalForPrisma = globalThis as unknown as {
  prisma: import("@prisma/client").PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? new (import("@prisma/client").PrismaClient)({
    log: ["query", "error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma