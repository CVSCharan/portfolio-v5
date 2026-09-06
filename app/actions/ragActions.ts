"use server";

import { ingestPortfolioContent } from "@/lib/rag/ingest";

export async function rebuildRagIndex() {
  try {
    const result = await ingestPortfolioContent();
    return { success: true, count: result.count };
  } catch (error: any) {
    console.error("Failed to rebuild RAG index:", error);
    return { success: false, error: error.message || "Failed to rebuild index" };
  }
}
