import { db } from "./src/prisma/db";

async function main() {
  await db.orm.public.BlogPost.create({
    title: "Building the Next Generation of AI Systems",
    slug: "building-next-gen-ai",
    excerpt: "A deep dive into architecture and design choices for modern AI applications.",
    content: `
## Introduction

Modern AI applications require a fundamentally different architecture than traditional web apps.

### The Problem

Handling streaming LLM responses, vector databases, and complex orchestration is non-trivial.

Here is an example of a simple Python function to chunk text for vector search:

\`\`\`python
def chunk_text(text: str, chunk_size: int = 500) -> list[str]:
    """
    Split text into chunks of roughly equal size.
    """
    words = text.split()
    chunks = []
    current_chunk = []
    current_size = 0
    
    for word in words:
        if current_size + len(word) > chunk_size:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            current_size = len(word)
        else:
            current_chunk.append(word)
            current_size += len(word) + 1
            
    if current_chunk:
        chunks.append(" ".join(current_chunk))
        
    return chunks
\`\`\`

> "The future of computing is agentic." - Someone smart

1. First point
2. Second point
3. Third point
    `,
    published: true
  });
  console.log("Dummy post created.");
}

main().catch(console.error);
