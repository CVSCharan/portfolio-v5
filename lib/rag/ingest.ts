import { db } from "@/src/prisma/db";

interface Chunk {
  id: string;
  text: string;
  sourceType: string;
  sourceId: string;
}

export async function ingestPortfolioContent() {
  if (!process.env.GOOGLE_AI_API_KEY) {
    return { success: false, error: "GOOGLE_AI_API_KEY is missing in .env. Please add it to enable RAG indexing." };
  }

  // 1. Fetch all content
  const users = await db.orm.public.User.all();
  const user = users[0] ?? null;
  const experiences = await db.orm.public.Experience.all();
  const projects = await db.orm.public.Project.all().then(arr => arr.filter((p: any) => p.isActive));
  const skills = await db.orm.public.Skill.all();
  const education = await db.orm.public.Education.all();
  const certs = await db.orm.public.Certification.all();
  const blogs = await db.orm.public.BlogPost.all().then(arr => arr.filter((p: any) => p.published));

  const chunks: Chunk[] = [];

  // User
  if (user) {
    if (user.bio) chunks.push({ id: `user-bio-${user.id}`, text: `Biography: ${user.bio}`, sourceType: 'user', sourceId: String(user.id) });
    if (user.story) chunks.push({ id: `user-story-${user.id}`, text: `My Story: ${user.story}`, sourceType: 'user', sourceId: String(user.id) });
  }

  // Experience
  experiences.forEach((exp: any) => {
    const text = [
      `Role: ${exp.title} at ${exp.company} (${exp.period})`,
      exp.description ? `Description: ${exp.description}` : '',
      exp.highlights.length > 0 ? `Highlights:\n- ${exp.highlights.join('\n- ')}` : ''
    ].filter(Boolean).join('\n');
    
    chunks.push({
      id: `exp-${exp.id}`,
      text,
      sourceType: 'experience',
      sourceId: String(exp.id)
    });
  });

  // Projects
  projects.forEach((proj: any) => {
    const text = [
      `Project: ${proj.title}`,
      proj.description ? `Summary: ${proj.description}` : '',
      proj.fullDescription ? `Details: ${proj.fullDescription}` : '',
      proj.techStack.length > 0 ? `Tech Stack: ${proj.techStack.join(', ')}` : '',
      proj.highlights.length > 0 ? `Key Highlights:\n- ${proj.highlights.join('\n- ')}` : ''
    ].filter(Boolean).join('\n');

    chunks.push({
      id: `proj-${proj.id}`,
      text,
      sourceType: 'project',
      sourceId: String(proj.id)
    });
  });

  // Skills
  const skillCategories = Array.from(new Set(skills.flatMap((s: any) => s.categories)));
  skillCategories.forEach((category: any) => {
    const catSkills = skills.filter((s: any) => s.categories.includes(category));
    const skillList = catSkills.map((s: any) => s.name).join(', ');
    chunks.push({
      id: `skill-cat-${category}`,
      text: `My Skills in ${category}: ${skillList}`,
      sourceType: 'skill',
      sourceId: String(category)
    });
  });

  // Education
  education.forEach((edu: any) => {
    const text = [
      `Education: ${edu.degree} from ${edu.institution} (${edu.period})`,
      edu.description ? `Description: ${edu.description}` : '',
      edu.courses.length > 0 ? `Courses: ${edu.courses.join(', ')}` : ''
    ].filter(Boolean).join('\n');

    chunks.push({
      id: `edu-${edu.id}`,
      text,
      sourceType: 'education',
      sourceId: String(edu.id)
    });
  });

  // Certifications
  certs.forEach((cert: any) => {
    chunks.push({
      id: `cert-${cert.id}`,
      text: `Certification: ${cert.title} issued by ${cert.issuer || 'Unknown'} (${cert.date || 'No date'})`,
      sourceType: 'certification',
      sourceId: String(cert.id)
    });
  });

  // Blog Posts (Split into smaller chunks)
  for (const blog of blogs) {
    if (!blog.content) continue;
    
    // Simple manual chunker (~2000 chars)
    const text = `Blog Post Title: ${blog.title}\n\n${blog.content}`;
    let idx = 0;
    for (let i = 0; i < text.length; i += 2000) {
      const chunkText = text.substring(i, i + 2000);
      chunks.push({
        id: `blog-${blog.id}-${idx}`,
        text: chunkText,
        sourceType: 'blog',
        sourceId: String(blog.id)
      });
      idx++;
    }
  }

  // 3. Embed all chunks using Google Gen AI Embeddings
  const BATCH_SIZE = 100;
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:batchEmbedContents?key=${process.env.GOOGLE_AI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: batch.map(c => ({
          model: "models/gemini-embedding-001",
          content: { parts: [{ text: c.text }] },
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText} ${await response.text()}`);
    }

    const { embeddings } = await response.json();
    const vectors = embeddings.map((e: any) => e.values);

    // 4. Upsert into Postgres using raw SQL
    for (let j = 0; j < batch.length; j++) {
      const chunk = batch[j];
      const vector = vectors[j];
      
      // We must strictly cast to exactly 768 dimensions in the vector string if we mapped it, 
      // but outputDimensionality is not supported in the LangChain wrapper by default for Gemini.
      // Actually, gemini-embedding-001 is 768 dimensions. text-embedding-004 is varying.
      // The wrapper uses the model's default. Let's make sure we insert properly.
      const vectorString = `[${vector.join(",")}]`;

      const plan = db.raw.sql`
        INSERT INTO "portfolio_embeddings" ("id", "content", "sourceType", "sourceId", "embedding")
        VALUES (${chunk.id}, ${chunk.text}, ${chunk.sourceType}, ${chunk.sourceId}, ${vectorString}::vector)
        ON CONFLICT ("id") DO UPDATE SET 
          "content" = EXCLUDED."content",
          "embedding" = EXCLUDED."embedding"
      `.affectedCount().build();
      
      await db.runtime().execute(plan);
    }
  }

  return { success: true, count: chunks.length };
}
