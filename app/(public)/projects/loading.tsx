import { ProjectCardSkeleton } from "@/components/ProjectCardSkeleton";

export default function Loading() {
  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden min-h-screen">
      <section className="relative flex flex-col px-5 sm:px-10 xl:px-16 pt-12 pb-16 md:py-24 border-b border-border">
        <div className="flex items-center justify-between pt-4 pb-6 border-b border-border mb-12">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-4 w-24" />
        </div>
        <div className="flex flex-col justify-center py-12 md:py-16 max-w-4xl space-y-6">
          <div className="skeleton h-16 md:h-24 w-3/4" />
          <div className="skeleton h-6 md:h-8 w-2/3 mt-6" />
        </div>
      </section>

      <section className="w-full border-t border-border px-5 sm:px-10 xl:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mb-12 space-y-3">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-10 w-64" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
