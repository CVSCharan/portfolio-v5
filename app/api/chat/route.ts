import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { retrieve } from "@/lib/rag/retrieve";

export const maxDuration = 60; // Allow more time for AI responses to stream on Vercel

// Very basic in-memory rate limiting to protect the LLM endpoint from spam
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    // Rate Limiting
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip);
    
    if (limitRecord && limitRecord.expiresAt > now) {
      if (limitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return new Response("Rate limit exceeded. Please try again later.", { status: 429 });
      }
      limitRecord.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    }

    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return new Response("Invalid request format.", { status: 400 });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      const mockText = "Hi! This is a fallback response because the GOOGLE_AI_API_KEY is not set in the .env file. Once you add your Gemini API key and rebuild the index from the Admin Settings, I'll be fully connected to the PostgreSQL vector database and able to answer questions about Charan's experience, projects, and skills!";
      const encoder = new TextEncoder();
      const i = 0;
      
      // Simulate streaming word by word
      const words = mockText.split(" ");
      return new Response(
        new ReadableStream({
          async start(controller) {
            for (const word of words) {
              controller.enqueue(encoder.encode(word + " "));
              await new Promise(r => setTimeout(r, 40));
            }
            controller.close();
          }
        }),
        { headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    // 1. Retrieve relevant chunks
    const context = await retrieve(question, 15);

    // 2. Build system prompt
    const systemPrompt = `You are an AI assistant representing CVS Charan's portfolio.
You have been given relevant excerpts from his actual resume, projects, and experience.
Answer questions about his background, skills, projects, and availability using ONLY the provided context.
If the context doesn't contain enough information, say so — do not invent details or hallucinate.
Be concise, professional, and first-person on his behalf.
Keep answers under 3 sentences unless the question requires more.

CONTEXT:
${context}`;

    // 3. Setup Gemini for streaming
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_AI_API_KEY,
      model: "gemini-1.5-flash", 
      streaming: true,
    });

    const stream = await model.stream([
      ["system", systemPrompt],
      ["human", question],
    ]);

    // 4. Stream response back to client
    const encoder = new TextEncoder();
    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.content) {
                controller.enqueue(encoder.encode(chunk.content as string));
              }
            }
          } catch (error) {
            console.error("Streaming error:", error);
            controller.enqueue(encoder.encode("\n\n[Error streaming response]"));
          } finally {
            controller.close();
          }
        },
      }),
      { 
        headers: { 
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform"
        } 
      }
    );
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response("An internal error occurred.", { status: 500 });
  }
}
