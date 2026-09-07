export function AuthorBio() {
  return (
    <div className="flex items-center gap-4">
      {/* Monogram Avatar */}
      <div className="text-subtitle w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center tracking-tighter shrink-0" >
        CVS
      </div>
      
      {/* Bio Info */}
      <div className="space-y-0.5">
        <h3 className="text-subtitle leading-tight" >
          CVS Charan
        </h3>
        <p className="text-sm text-muted-foreground leading-tight">
          Full Stack Developer
        </p>
      </div>
    </div>
  );
}
