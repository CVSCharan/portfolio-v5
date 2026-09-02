export function ProjectCardSkeleton() {
  return (
    <div className="card overflow-hidden border border-border">
      {/* image area */}
      <div className="skeleton aspect-video w-full rounded-none border-b border-border/50" />
      {/* Content Area */}
      <div className="p-5 md:p-6 space-y-5">
        <div className="space-y-3">
          <div className="skeleton h-6 w-2/3" />
          <div className="space-y-2 mt-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
          </div>
        </div>
        <div className="flex gap-2 pt-1 mt-auto">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-14 rounded-full" />
        </div>
        <div className="flex gap-2 pt-4 border-t border-border mt-1">
          <div className="skeleton h-9 flex-1 rounded-md" />
          <div className="skeleton h-9 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}
