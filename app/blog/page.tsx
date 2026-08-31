import { db } from "@/src/prisma/db";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "Writing about software engineering, web development, AI, and more.",
};

export default async function BlogPage() {
  const blogs = await db.orm.public.BlogPost.where({ published: true }).all();
  blogs.sort((a, b) => b.id - a.id);

  return (
    <div>
      <PageHeader
        label="Writing"
        title="Blog"
        description="Thoughts on software engineering, AI, and building things on the web."
      />

      {blogs.length === 0 ? (
        <div className="py-24 text-center space-y-3">
          <p className="text-headline text-muted-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>
            Coming soon.
          </p>
          <p className="text-muted-foreground text-sm">No posts published yet. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((post) => (
            <article key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="card card-hover flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 group"
              >
                <div className="space-y-1 flex-1">
                  <h2
                    className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
