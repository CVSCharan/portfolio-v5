"use client";

import { motion } from "framer-motion";
import { PageHeader } from "./PageHeader";

const LEVEL_LABELS: Record<number, string> = {
  1: "Learning",
  2: "Familiar",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

interface Skill {
  id: number;
  name: string;
  level: number; // 0-100
  category: string | null;
}

export function SkillsClient({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category || "Other";
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div className="w-full pb-24">
      <PageHeader
        label="Expertise"
        title="Skills"
        description="Technologies and tools I use to design, build, and ship products."
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-5 md:px-8">
        {categories.map((cat, i) => (
          <motion.div 
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="card p-6 md:p-8 space-y-6 card-hover backdrop-blur-md bg-card/80 border border-border/50 rounded-2xl"
          >
            <h2
              className="text-lg font-bold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {cat}
            </h2>
            <div className="space-y-4">
              {grouped[cat].map((skill) => {
                // Map 0-100 scale from DB to a 1-5 scale for the dots
                const dotCount = 5;
                const activeDots = Math.max(1, Math.min(5, Math.ceil(skill.level / 20)));
                
                return (
                  <div key={skill.id} className="group/skill flex items-center justify-between cursor-default">
                    <span className="text-sm font-medium text-muted-foreground group-hover/skill:text-foreground transition-colors duration-300">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-transparent group-hover/skill:text-muted-foreground transition-colors duration-300 font-mono hidden sm:inline-block w-16 text-right mr-2">
                        {LEVEL_LABELS[activeDots]}
                      </span>
                      <div className="flex gap-1 items-center">
                        {Array.from({ length: dotCount }).map((_, idx) => (
                          <div 
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx < activeDots 
                                ? "w-3 bg-primary/70 group-hover/skill:bg-secondary group-hover/skill:shadow-[0_0_10px_rgba(var(--secondary),0.8)]" 
                                : "w-1.5 bg-muted/50 group-hover/skill:bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
