export function TechMarqueeSkeleton() {
  return (
    <div className="w-full overflow-hidden flex gap-4 py-8 pointer-events-none select-none">
      {/* Simulate a marquee row of badges */}
      <div className="flex gap-4 shrink-0 min-w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-12 w-32 rounded-full"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
