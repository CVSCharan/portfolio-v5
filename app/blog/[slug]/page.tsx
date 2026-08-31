import { db } from "@/src/prisma/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

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

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="prose prose-lg max-w-none prose-blue">
          <ReactMarkdown>{post.content || ""}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
