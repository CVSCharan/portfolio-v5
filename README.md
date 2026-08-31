# CVS CHARAN - Personal Portfolio v5

A modern, fast, and secure personal portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and PostgreSQL via Prisma Next. It features a fully bespoke public frontend and a secure admin dashboard to manage all content dynamically.

## Features

- **Public Portfolio:**
  - Dynamic Projects grid with tech stack badges and links.
  - Interactive Skills view with category grouping and progress bars.
  - Experience timeline.
  - Markdown-powered Blog for publishing articles.
  - Server-Side Rendered (SSR) for optimal SEO and performance (Zero loading flashes).
- **Admin Dashboard (CMS):**
  - Custom NextAuth.js credentials login (100% self-hosted, no third-party auth services required).
  - Full CRUD functionality for managing Projects, Skills, Experiences, and Blog Posts.
  - Next.js Server Actions used for secure database mutations.
- **Database:**
  - PostgreSQL managed by `@prisma/orm-postgres` (Prisma Next).
  - Strictly typed queries using Prisma Next Data Contracts.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI:** [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), `@tailwindcss/typography`
- **Database:** PostgreSQL
- **ORM:** [Prisma Next](https://prisma.io) (`@prisma/orm-postgres`)
- **Authentication:** [NextAuth.js](https://next-auth.js.org)
- **Content:** `react-markdown`

## Getting Started

### 1. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
# Database Connection (e.g., Neon PostgreSQL)
DATABASE_URL="postgres://username:password@hostname/dbname?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-string-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
*(Tip: You can generate a `NEXTAUTH_SECRET` by running `openssl rand -base64 32` in your terminal)*

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Database

Emit the Prisma Next data contract and initialize the database schema:

```bash
npm run contract:emit
npx prisma db init
```

### 4. Seed Initial Data (Optional)

You can seed the database with an admin user and placeholder data:

```bash
npx tsx src/prisma/seed.ts
```
*Note: Check `src/prisma/seed.ts` for the default admin login credentials!*

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the CMS.

## Deployment

This project is configured to deploy seamlessly on [Vercel](https://vercel.com).
1. Connect your GitHub repository to Vercel.
2. Add your `DATABASE_URL` and `NEXTAUTH_SECRET` in the Vercel Environment Variables settings.
3. The build command `npm run build` will automatically emit the Prisma contract and build the Next.js app.

## License

MIT
