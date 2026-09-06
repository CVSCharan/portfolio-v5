import { db } from "@/src/prisma/db";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

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

  // Fetch related posts (latest 3 excluding current)
  const relatedPosts = await db.orm.public.BlogPost
    .where({ published: true })
    .orderBy((p) => p.id.desc())
    .all()
    .then(posts => posts.filter(p => p.id !== post.id).slice(0, 3));

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
            <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium tracking-wide" style={{ fontFamily: "var(--font-geist-mono)" }}>
              {dateStr && <span>{dateStr}</span>}
              {post.readingTime > 0 && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </header>
        
        <div className="pt-8 border-t border-border/50">
          <MarkdownRenderer content={post.content || ""} />
        </div>
      </article>

      {/* CTA Section */}
      <section className="border-t border-border bg-background py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-10 text-center space-y-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-bricolage)" }}>Need help with a similar project?</h2>
          <p className="text-muted-foreground">I'm available for freelance work and consulting.</p>
          <div className="pt-4">
            <Link href="/contact" className="btn btn-primary px-8 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 inline-flex items-center gap-2">
              Let's Talk <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Content */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-background py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-10 xl:px-16 space-y-12">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-bricolage)" }}>More Writing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map(rp => (
                <Link href={`/blog/${rp.slug}`} key={rp.id} className="card card-hover flex flex-col p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  
                  <div className="space-y-3 relative z-10 flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-semibold leading-snug group-hover:text-secondary transition-colors" style={{ fontFamily: "var(--font-bricolage)" }}>
                        {rp.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-secondary transition-all shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                    {rp.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {rp.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-medium relative z-10">
                    <span className="flex items-center gap-2">
                      <span className="group-hover:text-foreground transition-colors">Read</span>
                      {rp.readingTime > 0 && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{rp.readingTime} min</span>
                        </>
                      )}
                    </span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
