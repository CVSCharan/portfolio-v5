# RAG Chatbot — Technical Specification

> **Status:** Completed — The AIChatbot is fully integrated with LangChain, Gemini, and Postgres pgvector.
> **Stack:** LangChain.js · Google Gemini (embeddings + generation) · Prisma DB (source of truth) · Next.js API Route · Postgres (pgvector via Raw SQL)
> **Rule:** The home page bento tile for the chatbot is now active.

---

## Current State

[`components/AIChatbot.tsx`](../components/AIChatbot.tsx) — a floating bottom-right button that opens a chat window, communicating with `/api/chat` to retrieve RAG-augmented answers using Gemini 1.5 Flash.

Mounted globally in [`app/(public)/layout.tsx`](../app/(public)/layout.tsx):
```tsx
<AIChatbot />
```

---

## Target Architecture

```
Visitor asks: "What databases has Charan worked with?"
                        ↓
1. Embed the question  →  Gemini gemini-embedding-001  →  dense vector
2. db.raw.sql`SELECT ... <=> vector`  →  top-4 matching portfolio chunks
3. Build context string from retrieved chunks
4. LangChain: ChatGoogleGenerativeAI (gemini-flash-latest)
   System: persona + retrieved context
   Human: question
5. Stream tokens back → AIChatbot.tsx renders progressively
```

The LLM can only answer from actual DB content — no hallucination about portfolio facts.

---

## Data Sources (already in Prisma DB)

Every table below is a retrieval source. Ingested at build time or on-demand via admin action.

| Table | Fields to embed | Chunk strategy |
|---|---|---|
| `User` | `name`, `bio`, `story` | 1 chunk per field |
| `Experience` | `title`, `company`, `period`, `description` | 1 chunk per role |
| `Project` | `title`, `description`, `techStack`, URLs | 1 chunk per project |
| `Skill` | `name`, `categories`, `level` | Group by category → 1 chunk per category |
| `Education` | `degree`, `institution`, `period` | 1 chunk per record |
| `Certification` | `name`, `issuer`, `date` | 1 chunk per record |
| `BlogPost` | `title`, `content` (published only) | Sliding window ~500 token chunks |

These chunks are ingested directly into a manually managed `portfolio_embeddings` table using the `pgvector` extension and queried via Prisma's `db.raw.sql` escape hatch.

---

## File Map

### New files to create

```
lib/
  rag/
    ingest.ts      — chunk formatters, embedding calls, Prisma raw SQL upsert
    retrieve.ts    — embed query → Prisma raw SQL similarity search → return context string

app/
  api/
    chat/
      route.ts     — POST endpoint: receive question → RAG → stream LLM response
  actions/
    ragActions.ts  — server action: ingestPortfolioContent() (called from admin)
```

### Modified files

```
components/AIChatbot.tsx           — replace mock with fetch('/api/chat') + stream reader
app/(admin)/admin/settings/page.tsx — add "Rebuild RAG Index" button
package.json                       — add deps (langchain, @langchain/google-genai)
```

---

## Implementation Detail

### Database Migration (Raw SQL)

Because Prisma 8's PSL v1 currently rejects the `Unsupported()` type constructor, we will create the vector table natively outside of `contract.prisma` using a raw SQL migration.

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE portfolio_embeddings (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  "sourceType" TEXT NOT NULL,
  "sourceId" TEXT NOT NULL,
  embedding vector(768)
);

CREATE INDEX ON portfolio_embeddings USING hnsw (embedding vector_cosine_ops);
```

### `lib/rag/ingest.ts` (pseudocode)

```ts
import { db } from "@/src/prisma/db";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export async function ingestPortfolioContent() {
  // 1. Parallel fetch all content
  const [user, experiences, projects, skills, education, certs] =
    await Promise.all([ /* db queries */ ]);

  // 2. Format into text chunks with metadata
  const chunks = [
    ...formatUserChunks(user),           // { id: "user-bio-1", text: "...", source: "bio" }
    ...formatExperienceChunks(experiences),
    // ...etc
  ];

  // 3. Embed all chunks (Gemini gemini-embedding-001)
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_AI_API_KEY,
    modelName: "gemini-embedding-001",
    // NOTE: Must pass outputDimensionality: 768 or it defaults to 3072!
  });

  const vectors = await embeddings.embedDocuments(chunks.map(c => c.text));

  // 4. Upsert to Postgres using deterministic IDs and db.raw.sql
  for (let i = 0; i < chunks.length; i++) {
    const vectorString = `[${vectors[i].join(",")}]`;
    const plan = db.raw.sql`
      INSERT INTO portfolio_embeddings (id, content, "sourceType", "sourceId", embedding)
      VALUES (${chunks[i].id}, ${chunks[i].text}, ${chunks[i].sourceType}, ${chunks[i].sourceId}, ${vectorString}::vector)
      ON CONFLICT (id) DO UPDATE SET 
        content = EXCLUDED.content,
        embedding = EXCLUDED.embedding
    `.affectedCount();
    await db.runtime().execute(plan);
  }
}
```

### `lib/rag/retrieve.ts` (pseudocode)

```ts
import { db } from "@/src/prisma/db";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export async function retrieve(question: string, limit: number = 4) {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_AI_API_KEY,
    modelName: "gemini-embedding-001",
  });

  const [queryVector] = await embeddings.embedDocuments([question]);
  const vectorString = `[${queryVector.join(",")}]`;

  // Use raw SQL escape hatch to calculate cosine distance (<=>)
  const plan = db.raw.sql`
    SELECT content, "sourceType"
    FROM portfolio_embeddings
    ORDER BY embedding <=> ${vectorString}::vector
    LIMIT ${limit}
  `.returnsRow({
    content: (val: unknown) => String(val),
    sourceType: (val: unknown) => String(val)
  }).build();

  const results = await db.runtime().execute(plan);
  return results.map(r => `[${r.sourceType.toUpperCase()}] ${r.content}`).join("\n\n");
}
```

### `app/api/chat/route.ts`

```ts
import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { retrieve } from "@/lib/rag/retrieve";

// TODO: Implement simple in-memory or Vercel KV rate limiting here to protect endpoint

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // 1. Retrieve relevant chunks 
  const context = await retrieve(question, 4);

  // 2. Build prompt
  const systemPrompt = `You are an AI assistant representing CVS Charan's portfolio.
Answer questions using ONLY the provided context. Be concise and first-person on his behalf.
If context is insufficient, say so — do not invent details.

CONTEXT:
${context}`;

  // 3. Stream from Gemini
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
    model: "gemini-flash-latest", 
    streaming: true,
  });

  const stream = await model.stream([
    ["system", systemPrompt],
    ["human", question],
  ]);

  // 4. Return ReadableStream
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk.content as string));
        }
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
```

---

## Environment Variables

Add to `.env` (never commit):

```bash
GOOGLE_AI_API_KEY=your_gemini_api_key
```

**How to get this key:**
1. **Google Gemini:** Go to [Google AI Studio](https://aistudio.google.com/), sign in, and click "Get API key".

---

## Dependencies

```bash
npm install @langchain/google-genai langchain
```

---

## Build Phases

| Phase | Task | Effort |
|---|---|---|
| **A** | Install deps, add `GOOGLE_AI_API_KEY` to `.env` | Done |
| **B** | Create `portfolio_embeddings` table via raw SQL migration | Done |
| **C** | `lib/rag/ingest.ts` — chunk formatters + batch embedding + Postgres upsert with **deterministic IDs** via `db.raw.sql` | Done |
| **D** | `lib/rag/retrieve.ts` + `app/api/chat/route.ts` — Postgres RAG query + Gemini streaming + **Rate Limiting** | Done |
| **E** | Upgrade `AIChatbot.tsx` — real fetch, stream reader, typing indicator, error state | Done |
| **F** | Admin "Rebuild RAG Index" button in `/admin/settings` | Done |
| **G** | Home page bento tile: "Ask about my work →" (2-col wide card) | Done |

**Total estimated: ~1 working day** for a production-ready RAG chatbot.

---

## Pre-requisites Before Starting

1. **Google Gemini API Key:** Go to [Google AI Studio](https://aistudio.google.com/) and create an API key → `GOOGLE_AI_API_KEY` in `.env`.
2. **Neon pgvector Check:** Confirm that your Neon instance supports `pgvector` natively (most do by default).

Once confirmed, run Phase A → G in sequence.
