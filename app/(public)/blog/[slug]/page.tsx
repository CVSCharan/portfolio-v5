import { db } from "@/src/prisma/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await db.orm.public.BlogPost.where({ slug: params.slug, published: true }).first();
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} - CVS CHARAN`,
    description: post.excerpt || "A blog post by CVS CHARAN",
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await db.orm.public.BlogPost.where({ slug: params.slug, published: true }).first();
  
  if (!post) {
    notFound();
  }

  // Format date
  const dateStr = post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-5 sm:px-10 py-24 md:py-32">
        <header className="mb-16 space-y-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Writings
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-display">
              {post.title}
            </h1>
            {dateStr && (
              <p className="text-muted-foreground text-sm font-medium tracking-wide" style={{ fontFamily: "var(--font-geist-mono)" }}>
                {dateStr}
              </p>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none prose-pre:border prose-pre:border-border">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content || ""}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
