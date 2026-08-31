import { db } from "../src/prisma/db"

async function main() {
  // Delete existing data to prevent duplicates
  await db.orm.public.User.where({}).delete()
  await db.orm.public.Experience.where({}).delete()
  await db.orm.public.Skill.where({}).delete()
  await db.orm.public.Project.where({}).delete()

  const user = await db.orm.public.User.create({
    name: "CVS Charan",
    email: "charan.cvs@gmail.com",
    bio: "AI-Augmented Full-Stack Developer with a strong foundation in Data Analytics. I specialize in building intelligent and scalable web and mobile applications that leverage LLMs, prompt engineering, and AI automation. Experienced in integrating OpenAI APIs, LangChain/N8N, and Pinecone into dynamic real-world solutions. Adept at transforming business needs into impactful user-facing experiences using React, Node.js, and modern cloud tooling.",
    story: "My journey into software engineering is rooted in my academic background in Physics. Through my Master's at VIT University and my research fellowship at Mahindra University (where I focused on Solar Cells and High Entropy Alloys), I developed a deep appreciation for complex systems and data analysis. The transition to Full-Stack Development and AI integration felt like a natural progression—applying rigorous analytical thinking to build scalable, intelligent digital experiences. I believe in pushing the boundaries of what web applications can do by leveraging Large Language Models, prompt engineering, and modern cloud architecture.",
    avatar: "/avatar.jpg", // Ensure this exists or use a placeholder
  });

  console.log(`Created user: ${user.name}`)

  // 2. Clear existing data to prevent duplicates


  // 2.5 Create Education
  const educationList = [
    {
      degree: "Research Fellowship, Teaching Assistantship - Physics (Solar Cells / HEA)",
      institution: "Mahindra University, Hyderabad",
      period: "2022",
      description: "Conducted research on Solar Cells and High Entropy Alloys (HEA). Assisted in teaching and guiding physics experiments."
    },
    {
      degree: "MS/MSc (Master of Science) - Physics",
      institution: "VIT University, Vellore",
      period: "2021",
      description: "Completed MSc review project and advanced physics coursework with a CGPA of 7.2. Developed strong analytical and data modeling skills."
    },
    {
      degree: "CCBP 4.0 Intensive",
      institution: "NxtWave, Hyderabad",
      period: "2022",
      description: "Learning 4.0 Technologies - Full Stack Web Development."
    }
  ]

  for (const edu of educationList) {
    await db.orm.public.Education.create(edu)
  }
  console.log("Created education")  // 3. Create Experiences
  const experiences = [
    {
      title: "Senior Data Analyst",
      company: "Ninex Corp Pvt. Ltd.",
      period: "Apr 2026 - Present",
      description: "Implemented robust data pipelines and optimized large dataset rendering using cursor-based pagination and TanStack Query caching for the analytics dashboard. Developed Super Admin and Vendor Admin portals using Next.js, React, TypeScript, Tailwind CSS, and AG Grid. Built secure Role-Based Access Control (RBAC) and REST APIs using Bun, ElysiaJS, Prisma, and PostgreSQL."
    },
    {
      title: "Project Lead",
      company: "Senexxel Corporation Private Limited",
      period: "Dec 2025 - Apr 2026",
      description: "Owned the KPI Module, defining, designing, and implementing key performance indicators. Translated National Education Policy (NEP) objectives into measurable dashboard KPIs. Coordinated with multiple education departments for data collection and approvals."
    },
    {
      title: "Full Stack Web and Mobile Developer",
      company: "Self Employed",
      period: "July 2024 - November 2025",
      description: "Built RAG-based chatbots and MCP-like systems using n8n, Pinecone, and OpenAI APIs. Built an NLP-powered resume evaluation tool. Designed and delivered a web and mobile app for restaurant operations with QR-based digital menu and Google Reviews integration."
    },
    {
      title: "Data Analytics Engineer",
      company: "Providence Global Center LLP",
      period: "Sept 2022 - June 2024",
      description: "Engineered end-to-end systems with React.js, Node.js, PostgreSQL, and Snowflake. Automated 13-month rolling data collection of Power BI metrics using Power Automate and PySpark. Led the development of a React.js-based PWA, improving client-side performance by 25%."
    },
    {
      title: "Software Developer Intern",
      company: "Assetmonk Private Properties LTD",
      period: "June 2022 - July 2022",
      description: "Developed key application screens and implemented state management using Redux. Integrated React Native's navigation stack. Contributed to a React Native project for caregiver session management."
    }
  ]

  for (const exp of experiences) {
    await db.orm.public.Experience.create(exp)
  }
  console.log("Created experiences")

  // 4. Create Skills
  const skills = [
    // Programming Languages
    { name: "JavaScript", level: 90, category: "Languages" },
    { name: "TypeScript", level: 85, category: "Languages" },
    { name: "Python", level: 80, category: "Languages" },
    // Web Development
    { name: "React JS", level: 95, category: "Frontend" },
    { name: "Next JS", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "Node JS", level: 85, category: "Backend" },
    { name: "ElysiaJS", level: 80, category: "Backend" },
    { name: "GraphQL", level: 75, category: "Backend" },
    { name: "React Native", level: 80, category: "Mobile" },
    // Databases
    { name: "PostgreSQL", level: 85, category: "Database" },
    { name: "Snowflake", level: 75, category: "Database" },
    { name: "MongoDB", level: 80, category: "Database" },
    // AI & ML
    { name: "OpenAI API", level: 90, category: "AI/ML" },
    { name: "LangChain", level: 75, category: "AI/ML" },
    { name: "Pinecone", level: 80, category: "AI/ML" },
    { name: "RAG Architecture", level: 85, category: "AI/ML" },
    // Tools & Cloud
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "AWS", level: 75, category: "Cloud" },
    { name: "Vercel", level: 90, category: "Cloud" },
    { name: "n8n", level: 85, category: "Tools" },
  ]

  for (const skill of skills) {
    await db.orm.public.Skill.create(skill)
  }
  console.log("Created skills")

  // 5. Create Projects
  const projects = [
    {
      title: "NLP Resume Evaluation Tool",
      slug: "nlp-resume-tool",
      description: "An NLP-powered resume evaluation tool using OpenAI and custom scoring logic. Automated the end-to-end process with n8n for smart, scalable resume parsing.",
      techStack: ["OpenAI", "n8n", "Node.js", "React"],
      githubUrl: "https://github.com/CVSCharan",
      demoUrl: "https://portfolio-v5.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      order: 1
    },
    {
      title: "AI RAG Chatbot System",
      slug: "ai-rag-chatbot",
      description: "Architected MCP-like systems and RAG-based chatbots to streamline evaluation and support workflows, delivering real-time intelligent responses.",
      techStack: ["LangChain", "Pinecone", "Python", "Next.js"],
      githubUrl: "https://github.com/CVSCharan",
      demoUrl: "https://portfolio-v5.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      order: 2
    },
    {
      title: "QR Digital Menu & Management App",
      slug: "qr-digital-menu",
      description: "Designed and delivered a web and mobile app for restaurant operations with features like a QR-based digital menu, Google Reviews integration, and real-time control.",
      techStack: ["React Native", "Express.js", "MongoDB", "AWS"],
      githubUrl: "https://github.com/CVSCharan",
      demoUrl: "https://portfolio-v5.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
      order: 3
    }
  ]

  for (const project of projects) {
    await db.orm.public.Project.create(project)
  }
  console.log("Created projects")

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
