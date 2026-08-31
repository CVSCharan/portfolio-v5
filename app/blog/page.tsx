import { db } from "@/src/prisma/db";
import Link from "next/link";

export const metadata = {
  title: "Blog - CVS CHARAN",
  description: "Writing about software engineering, web development, and more.",
};

export default async function BlogPage() {
  const blogs = await db.orm.public.BlogPost.where({ published: true }).all();
  
  // Sort by date (assuming id represents insertion order/time roughly, though a createdAt field would be better)
  blogs.sort((a, b) => b.id - a.id);

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Blog</h1>
        
        <div className="space-y-8">
          {blogs.map((post) => (
            <article key={post.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="text-blue-600 font-medium group-hover:underline">
                  Read more →
                </div>
              </Link>
            </article>
          ))}

          {blogs.length === 0 && (
            <p className="text-center text-gray-500">No blog posts published yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
