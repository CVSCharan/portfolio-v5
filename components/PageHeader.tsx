import * as React from "react";

interface PageHeaderProps {
  label?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  label,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
      <div className="space-y-2 max-w-2xl">
        {label && <p className="text-label text-muted-foreground">{label}</p>}
        <h1
          className="text-headline text-foreground"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">{actions}</div>
      )}
    </div>
  );
}
