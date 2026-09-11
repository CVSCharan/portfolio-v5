import { db } from "../src/prisma/db"

async function main() {
  const project = {
    title: "URL Shortener Monolith",
    slug: "url-shortener-monolith",
    description: "A 100% Python monolithic web application using Server-Side Rendering (SSR) with Jinja2 and HTMX.",
    fullDescription: "Modern web applications often default to complex SPAs, even for simple utility tools. This project explores the power of Server-Side Rendering (SSR) combined with HTMX for interactivity, resulting in a hyper-fast, easily maintainable URL shortener without writing any frontend JavaScript. It features robust backend validation, database modeling, and serverless deployment.",
    techStack: ["FastAPI", "Python", "HTMX", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Custom Aliases: Users can define their own URL endings (e.g., /my-promo)",
      "Password Protection: Secure destination links with a hashed password",
      "Expiration Dates: Links automatically expire after a set time",
      "Inline QR Modals: Each link gets a dynamically generated QR code available via an HTMX modal",
      "Rate Limiting: IP-based rate limiting to prevent abuse"
    ],
    githubUrls: ["https://github.com/CVSCharan/py-url-shortener-monolith"],
    demoUrl: "https://url-shortener.charan-cvs.dev/",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    category: "Full Stack",
    isActive: true,
    isFeatured: true,
    order: 4
  }

  // delete if exists
  await db.orm.public.Project.where({ slug: project.slug }).delete()

  await db.orm.public.Project.create(project)
  console.log("Created URL Shortener project!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
