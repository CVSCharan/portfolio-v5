export default function Loading() {
  return (
    <div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden min-h-screen">
      {/* ════════════════════════════════════════════════════
          HERO SECTION SKELETON
      ════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col px-5 sm:px-10 xl:px-16 pt-8 pb-16 md:py-24 border-b border-border">
        <div className="w-full max-w-6xl mx-auto mb-12">
          {/* Meta Bar */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-12">
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-4 w-6" />
          </div>

          <div className="max-w-3xl">
            {/* Category */}
            <div className="skeleton h-3 w-20 mb-4" />

            {/* Title */}
            <div className="skeleton h-12 md:h-16 w-3/4 mb-6" />

            {/* Hook / Description */}
            <div className="space-y-3">
              <div className="skeleton h-5 w-full max-w-2xl" />
              <div className="skeleton h-5 w-5/6 max-w-2xl" />
              <div className="skeleton h-5 w-4/6 max-w-2xl" />
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-border">
              <div className="skeleton h-8 w-24 rounded-full" />
              <div className="skeleton h-8 w-28 rounded-full" />
              <div className="skeleton h-8 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FULL-BLEED IMAGE SKELETON
      ════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-5 sm:px-10 xl:px-16 py-12 md:py-24">
        <div className="skeleton w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl" />
      </section>

      {/* ════════════════════════════════════════════════════
          PROBLEM & SOLUTION SKELETON
      ════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-5 sm:px-10 xl:px-16 pb-16 md:pb-24 border-t border-border pt-16 md:pt-24">
        <div className="max-w-2xl">
          <div className="skeleton h-10 w-48 mb-8" />
          <div className="space-y-4">
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-5/6" />
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-3/4" />
          </div>
        </div>
      </section>
    </div>
  );
}
