"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";
import { getPaginatedBlogs } from "@/app/actions/blogActions";

interface BlogRecord {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
}

export default function BlogClient({
  initialBlogs,
}: {
  initialBlogs: BlogRecord[];
}) {
  const [blogs, setBlogs] = useState<BlogRecord[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(initialBlogs.length === 9);
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = async () => {
    startTransition(async () => {
      try {
        const nextBatch = await getPaginatedBlogs(blogs.length, 9);
        setBlogs((prev) => {
          // Filter duplicates just in case
          const existingIds = new Set(prev.map((b) => b.id));
          const newItems = nextBatch.filter((b: any) => !existingIds.has(b.id));
          return [...prev, ...newItems];
        });
        setHasMore(nextBatch.length === 9);
      } catch (err) {
        console.error("Failed to load more blogs:", err);
      }
    });
  };

  if (blogs.length === 0) {
    return (
      <div className="py-24 text-center space-y-3">
        <p className="text-headline text-muted-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>
          Coming soon.
        </p>
        <p className="text-muted-foreground text-sm">No posts published yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 mb-24">
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

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="btn btn-outline px-8 py-3 rounded-full text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {isPending ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
