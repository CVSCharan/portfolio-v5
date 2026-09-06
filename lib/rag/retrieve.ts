import { db } from "@/src/prisma/db";

export async function retrieve(question: string, limit: number = 4): Promise<string> {
  if (!process.env.GOOGLE_AI_API_KEY) {
    throw new Error("GOOGLE_AI_API_KEY is missing");
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${process.env.GOOGLE_AI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/gemini-embedding-001",
      content: { parts: [{ text: question }] },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API Error: ${response.statusText} ${await response.text()}`);
  }

  const { embedding } = await response.json();
  const vector = embedding.values;
  
  // 2. Perform similarity search in Postgres using raw SQL and pgvector <=> operator
  const vectorString = `[${vector.join(",")}]`;

  let results = [];
  try {
    const plan = db.raw.sql`
      SELECT "content", "sourceType"
      FROM "portfolio_embeddings"
      ORDER BY "embedding" <=> ${vectorString}::vector
      LIMIT ${limit}
    `.returnsRow({
      content: "pg/text@1",
      sourceType: "pg/text@1"
    }).build();

    results = await db.runtime().query(plan).toArray();
  } catch (error) {
    console.warn("RAG Retrieve error (table may not exist or pgvector not set up):", error);
    return "Context currently unavailable.";
  }

  if (!results || results.length === 0) {
    return "No relevant context found.";
  }

  const contextParts = results.map(row => `[Source: ${String(row.sourceType).toUpperCase()}]\n${String(row.content)}`);
  return contextParts.join("\n\n---\n\n");
}
