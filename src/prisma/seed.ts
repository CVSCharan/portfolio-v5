import { db } from "./db";

async function main() {
  console.log("Seeding data...");

  const admin = await db.orm.public.Admin.create({
    username: "admin",
    password: "$2a$10$wYZkO411L4Q8w8n/4/fV2OTp.q0pQ.Qo4t/G9R/5xO4.n32p/R4q6", // admin123
  });
  console.log({ admin });

  // Skipping mock project seeding as we migrated real projects
  console.log("Projects seeded (skipped mock, real projects are migrated).");

  const skillsData = [
    { name: "React", level: 5, category: "frontend" },
    { name: "Next.js", level: 4, category: "frontend" },
    { name: "TypeScript", level: 5, category: "frontend" },
    { name: "Tailwind CSS", level: 4, category: "design" },
    { name: "Node.js", level: 3, category: "backend" },
  ];
  
  for (const skill of skillsData) {
    const s = await db.orm.public.Skill.create(skill);
    console.log({ skill: s });
  }

  const exp1 = await db.orm.public.Experience.create({
    title: "Frontend Developer",
    company: "Tech Corp",
    period: "Jan 2023 – Present",
    description: "Built responsive web apps with React & Next.js",
  });
  console.log({ exp1 });

  const blog1 = await db.orm.public.BlogPost.create({
    title: "Why I built this portfolio",
    slug: "why-i-built-this-portfolio",
    excerpt: "A personal reflection on the motivation behind creating my portfolio website.",
    published: true,
    viewCount: 42,
  });
  console.log({ blog1 });

  const certificationsData = [
    { title: "Introduction to Agile Development and Scrum", issuer: "IBM", date: "Dec 2023", url: "https://www.coursera.org/account/accomplishments/verify/5Q6GVCNM2CTU", order: 1 },
    { title: "Prompt Engineering for ChatGPT", issuer: "Vanderbilt University", date: "Dec 2023", url: "https://www.coursera.org/account/accomplishments/verify/C3FDTN6CX2E2", order: 2 },
    { title: "Build Dynamic User Interfaces (UI) for Websites", issuer: "Google", date: "Dec 2023", url: "https://www.coursera.org/account/accomplishments/verify/GSS32RDGQ2FN", order: 3 },
    { title: "Build Your Own Responsive Website", issuer: "NxtWave", date: "May 2022", url: "https://certificates.ccbp.in/intensive/responsive-website?id=SPHXUJUIHC", order: 4 },
    { title: "Build Your Own Static Website", issuer: "NxtWave", date: "May 2022", url: "https://certificates.ccbp.in/intensive/static-website?id=VLRHVLFFZK", order: 5 },
    { title: "Node.js", issuer: "NxtWave", date: "June 2022", url: "https://certificates.ccbp.in/intensive/node-js?id=QDFZRPPWTP", order: 6 },
    { title: "Developer Foundations", issuer: "NxtWave", date: "May 2022", url: "https://certificates.ccbp.in/intensive/developer-foundations?id=YHYRHFDZIX", order: 7 },
    { title: "Introduction to Databases", issuer: "NxtWave", date: "May 2022", url: "https://certificates.ccbp.in/intensive/introduction-to-databases?id=DKMZHJQPPV", order: 8 },
    { title: "JavaScript Essentials", issuer: "NxtWave", date: "May 2022", url: "https://certificates.ccbp.in/intensive/javascript-essentials?id=QUEJYXOPHQ", order: 9 },
    { title: "Responsive Web Design using Flexbox", issuer: "NxtWave", date: "May 2022", url: "https://certificates.ccbp.in/intensive/flexbox?id=JZQULPRPNN", order: 10 },
  ];

  for (const cert of certificationsData) {
    const c = await db.orm.public.Certification.create(cert);
    console.log({ certification: c });
  }
}

main().catch(console.error);
