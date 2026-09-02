# RAG Chatbot — Technical Specification

> **Status:** Planned — current `AIChatbot.tsx` is a mock (keyword if/else, no real AI)  
> **Stack:** LangChain.js · Google Gemini (embeddings + generation) · Prisma DB (source of truth) · Next.js API Route · Pinecone vector store  
> **Rule:** The home page bento tile for the chatbot ships ONLY after this implementation is complete and tested.

---

## Current State

[`components/AIChatbot.tsx`](../components/AIChatbot.tsx) — a floating bottom-right button that opens a chat window.  
**Problem:** Uses `setTimeout` + `if/else` keyword matching. Not a real AI. Must be replaced before the chatbot is shown to any recruiter or visitor.

Mounted globally in [`app/(public)/layout.tsx`](../app/(public)/layout.tsx):
```tsx
<AIChatbot />
```

---

## Target Architecture

```
Visitor asks: "What databases has Charan worked with?"
                        ↓
1. Embed the question  →  Gemini text-embedding-004  →  dense vector
2. Pinecone.query(vector, topK: 4)  →  top-4 matching portfolio chunks
3. Build context string from retrieved chunks
4. LangChain: ChatGoogleGenerativeAI (gemini-1.5-flash)
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

**Estimated total:** ~30–80 chunks for a full portfolio. Pinecone free tier handles this trivially.

---

## File Map

### New files to create

```
lib/
  rag/
    ingest.ts      — chunk formatters, embedding calls, Pinecone upsert
    retrieve.ts    — embed query → Pinecone similarity search → return context string

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
```

---

## Implementation Detail

### `lib/rag/ingest.ts` (pseudocode)

```ts
import { db } from "@/src/prisma/db";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";

export async function ingestPortfolioContent() {
  // 1. Parallel fetch all content
  const [user, experiences, projects, skills, education, certs] =
    await Promise.all([ /* db queries */ ]);

  // 2. Format into text chunks with metadata
  const chunks = [
    ...formatUserChunks(user),           // { text: "...", source: "bio" }
    ...formatExperienceChunks(experiences),
    ...formatProjectChunks(projects),
    ...formatSkillChunks(skills),
    // ...etc
  ];

  // 3. Embed all chunks (Gemini text-embedding-004)
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_AI_API_KEY,
    modelName: "text-embedding-004",
  });

  const vectors = await embeddings.embedDocuments(chunks.map(c => c.text));

  // 4. Upsert to Pinecone
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.index(process.env.PINECONE_INDEX!);

  await index.upsert(
    vectors.map((values, i) => ({
      id: `chunk-${i}`,
      values,
      metadata: { text: chunks[i].text, source: chunks[i].source },
    }))
  );
}
```

### `app/api/chat/route.ts`

```ts
import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { retrieve } from "@/lib/rag/retrieve";

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
    model: "gemini-1.5-flash",
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

### System prompt (final version)

```
You are an AI assistant representing CVS Charan's portfolio.
You have been given relevant excerpts from his actual resume, projects, and experience.
Answer questions about his background, skills, projects, and availability using ONLY the provided context.
If the context doesn't contain enough information, say so — do not invent details.
Be concise, professional, and first-person on his behalf.
Keep answers under 3 sentences unless the question requires more.

CONTEXT:
{retrieved_chunks}
```

---

## Environment Variables

Add to `.env.local` (never commit):

```bash
GOOGLE_AI_API_KEY=          # Google AI Studio key — used for both embeddings + generation
PINECONE_API_KEY=           # Pinecone API key
PINECONE_INDEX=portfolio-rag
PINECONE_ENVIRONMENT=       # e.g. us-east-1-aws (from Pinecone dashboard)
```

---

## Dependencies

```bash
bun add @langchain/google-genai @langchain/pinecone @pinecone-database/pinecone langchain
```

---

## Build Phases

| Phase | Task | Effort |
|---|---|---|
| **A** | Install deps, create Pinecone index (`portfolio-rag`), add env vars | 30 min |
| **B** | `lib/rag/ingest.ts` — chunk formatters + batch embedding + Pinecone upsert | 2–3 hrs |
| **C** | `lib/rag/retrieve.ts` + `app/api/chat/route.ts` — RAG query + Gemini streaming | 2 hrs |
| **D** | Upgrade `AIChatbot.tsx` — real fetch, stream reader, typing indicator, error state | 1–2 hrs |
| **E** | Admin "Rebuild RAG Index" button in `/admin/settings` | 30 min |
| **F** | Home page bento tile: "Ask about my work →" (2-col wide card) | 30 min |

**Total estimated: ~1 working day** for a production-ready RAG chatbot.

---

## Home Page Bento Tile (Phase F — last)

A 2-column-wide bento card, positioned below "Currently Building":

```
┌────────────────────────────────────────────┐
│ LABEL: AI Assistant                         │
│                                             │
│ "Ask about my work →"                       │
│ Powered by Gemini · RAG on live portfolio   │
│                                             │
│ [Start chatting]                            │
└────────────────────────────────────────────┘
```

Uses the existing `card card-hover` classes. Blue gradient blob (same as "Currently Building" card). Opens the `AIChatbot` panel on click.

---

## Pre-requisites Before Starting

1. Google AI Studio API key → `GOOGLE_AI_API_KEY` in `.env.local`
2. Pinecone account → create index named `portfolio-rag`, dimension `768` (text-embedding-004 output)
3. Add `PINECONE_API_KEY` and `PINECONE_ENVIRONMENT` to `.env.local`

Once keys are confirmed, run Phase A → F in sequence.
