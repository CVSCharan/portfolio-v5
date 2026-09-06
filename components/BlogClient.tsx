"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getPaginatedBlogs } from "@/app/actions/blogActions";
import { ChapterHero } from "./ChapterHero";

interface BlogRecord {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  readingTime: number;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

export default function BlogClient({
  initialBlogs,
}: {
  initialBlogs: BlogRecord[];
}) {
  const [blogs, setBlogs] = useState<BlogRecord[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(initialBlogs.length === 9);
  const [isPending, startTransition] = useTransition();
  const prefersReducedMotion = useReducedMotion();

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
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">
      <ChapterHero
        chapter="07"
        metaLabel="Writings"
        titlePrefix="Signal"
        titleAccent="."
        description="Essays, tutorials, and deep dives on building modern AI systems, full-stack engineering, and the spaces in between."
      />

      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{
                  ...springTransition,
                  delay: prefersReducedMotion ? 0 : (index % 3) * 0.05,
                }}
                className="card card-hover flex flex-col overflow-hidden group h-full"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-6 md:p-8 gap-5 relative overflow-hidden">
                  {/* Subtle gradient background effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  
                  <div className="space-y-4 flex-1 relative z-10">
                    <div className="flex justify-between items-start gap-4">
                        <h2
                          className="text-xl md:text-2xl font-semibold text-foreground leading-snug group-hover:text-secondary transition-colors"
                          style={{ fontFamily: "var(--font-bricolage)" }}
                        >
                          {post.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-secondary transition-all shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                    {post.excerpt && (
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground font-medium relative z-10">
                    <span className="flex items-center gap-2">
                      <span className="group-hover:text-foreground transition-colors">Read Article</span>
                      {post.readingTime > 0 && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{post.readingTime} min</span>
                        </>
                      )}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </div>
                </Link>
              </motion.article>
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
      </section>
    </div>
  );
}
