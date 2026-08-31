"use client";

import { motion } from "framer-motion";
import { PageHeader } from "./PageHeader";
import {
  Search,
  Monitor,
  Server,
  Database,
  Cloud,
  BrainCircuit,
  Smartphone,
  Wrench,
  LucideIcon,
  Code2,
} from "lucide-react";
import React, { useMemo } from "react";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string | null;
}

const CATEGORY_META: Record<
  string,
  { icon: LucideIcon; color: string; hex: string }
> = {
  Frontend: { icon: Monitor, color: "text-blue-500", hex: "#3b82f6" },
  Backend: { icon: Server, color: "text-purple-500", hex: "#a855f7" },
  Database: { icon: Database, color: "text-amber-500", hex: "#f59e0b" },
  Cloud: { icon: Cloud, color: "text-cyan-500", hex: "#06b6d4" },
  "AI & ML": { icon: BrainCircuit, color: "text-emerald-500", hex: "#10b981" },
  Mobile: { icon: Smartphone, color: "text-rose-500", hex: "#f43f5e" },
  Tools: { icon: Wrench, color: "text-slate-500", hex: "#64748b" },
};

const SKILL_SLUGS: Record<string, string> = {
  "HTML": "html5",
  "CSS": "css3",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "Python": "python",
  "React JS": "react",
  "Next JS": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  "Node JS": "nodedotjs",
  "GraphQL": "graphql",
  "React Native": "react",
  "PostgreSQL": "postgresql",
  "MySQL": "mysql",
  "MongoDB": "mongodb",
  "SQLite": "sqlite",
  "Snowflake": "snowflake",
  "Vercel": "vercel",
  "Docker": "docker",
  "Kubernetes": "kubernetes",
  "Git": "git",
  "n8n": "n8n",
};

const SKILL_LUCIDE: Record<string, LucideIcon> = {
  "ElysiaJS": Server,
  "OpenAI API": BrainCircuit,
  "LangChain": BrainCircuit,
  "Pinecone": Database,
  "Hugging Face": BrainCircuit,
  "Azure": Cloud,
  "AWS": Cloud,
  "GCP": Cloud,
  "Power BI": Monitor,
  "Databricks": Database,
};

const SkillImgIcon = ({ name, className }: { name: string; className?: string }) => {
  const [hasError, setHasError] = React.useState(false);
  const slug = SKILL_SLUGS[name];
  const FallbackIcon = SKILL_LUCIDE[name];
  
  if (FallbackIcon) {
    return <FallbackIcon className={className} />;
  }

  if (!slug || hasError) return <Code2 className={className} />;
  
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={name}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

function RadarChart({
  categories,
  data,
  hoveredCategory,
  onHoverCategory,
}: {
  categories: string[];
  data: number[];
  hoveredCategory: string | null;
  onHoverCategory: (cat: string | null) => void;
}) {
  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleStep = (Math.PI * 2) / categories.length;

  const points = data
    .map((value, i) => {
      const r = (value / 100) * radius;
      const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(" ");

  const bgPolygons = [20, 40, 60, 80, 100].map((level) => {
    return categories
      .map((_, i) => {
        const r = (level / 100) * radius;
        const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
      })
      .join(" ");
  });

  return (
    <div className="relative flex items-center justify-center w-full max-w-[400px] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Web */}
        {bgPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted/20"
          />
        ))}
        {categories.map((_, i) => {
          const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted/20"
            />
          );
        })}

        {/* Data Polygon */}
        <motion.polygon
          points={points}
          fill="url(#radarGlow)"
          stroke="var(--secondary)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          style={{ transformOrigin: "center" }}
        />

        {/* Data Points & Labels */}
        {categories.map((cat, i) => {
          const val = data[i];
          const r = (val / 100) * radius;
          const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + r * Math.sin(i * angleStep - Math.PI / 2);

          const labelR = radius + 25;
          const labelX =
            center + labelR * Math.cos(i * angleStep - Math.PI / 2);
          const labelY =
            center + labelR * Math.sin(i * angleStep - Math.PI / 2);
            
          const isHovered = hoveredCategory === cat;
          const opacity = hoveredCategory ? (isHovered ? 1 : 0.2) : 1;

          return (
            <g 
              key={cat}
              onMouseEnter={() => onHoverCategory(cat)}
              onMouseLeave={() => onHoverCategory(null)}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity }}
            >
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? "6" : "4"}
                fill="var(--secondary)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="transition-all duration-300"
              />
              <motion.text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isHovered ? 'fill-secondary' : 'fill-muted-foreground'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {cat}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function SkillsClient({ skills }: { skills: Skill[] }) {
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterLevel, setFilterLevel] = React.useState<"all" | "core" | "learning">("all");

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      if (searchQuery && !skill.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filterLevel === "core" && skill.level < 80) return false;
      if (filterLevel === "learning" && skill.level >= 80) return false;
      return true;
    });
  }, [skills, searchQuery, filterLevel]);

  // Base grouping for Radar Chart (always show all categories)
  const baseGrouped = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, s) => {
      const cat = s.category || "Other";
      (acc[cat] = acc[cat] || []).push(s);
      return acc;
    }, {});
  }, [skills]);

  // Filtered grouping for Bento Grid
  const grouped = useMemo(() => {
    return filteredSkills.reduce<Record<string, Skill[]>>((acc, s) => {
      const cat = s.category || "Other";
      (acc[cat] = acc[cat] || []).push(s);
      return acc;
    }, {});
  }, [filteredSkills]);

  const order = [
    "Frontend",
    "Backend",
    "Database",
    "AI & ML",
    "Cloud",
    "Mobile",
    "Tools",
  ];
  
  const baseCategories = Object.keys(baseGrouped).sort((a, b) => {
    return (
      (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) -
      (order.indexOf(b) !== -1 ? order.indexOf(b) : 99)
    );
  });

  const categoryAverages = useMemo(() => {
    return baseCategories.map((cat) => {
      const catSkills = baseGrouped[cat];
      if (!catSkills || catSkills.length === 0) return 0;
      return Math.round(
        catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length,
      );
    });
  }, [baseCategories, baseGrouped]);

  const gridCategories = Object.keys(grouped).sort((a, b) => {
    return (
      (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) -
      (order.indexOf(b) !== -1 ? order.indexOf(b) : 99)
    );
  });
  
  const topCategory = baseCategories[categoryAverages.indexOf(Math.max(...categoryAverages))] || "Data & AI";

  return (
    <div className="w-full pb-32">
      <PageHeader
        label="Analytics"
        title="Skill Matrix"
        description="A data-driven breakdown of my technical capabilities and domain expertise."
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-12">
        {/* Top Section: Radar Chart & Top Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center card p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50">
          <div className="flex flex-col space-y-6">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight mb-2"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Competency Distribution
              </h2>
              <p className="text-muted-foreground">
                An aggregate analysis of my proficiency across major
                technological domains, reflecting a strong emphasis on Data, AI,
                and Full-Stack Engineering.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background/50 border border-border/50">
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Total Technologies
                </p>
                <p className="text-3xl font-black">{skills.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-background/50 border border-border/50">
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Primary Domain
                </p>
                <p className="text-xl font-black text-secondary">{topCategory}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center p-4">
            <RadarChart 
              categories={baseCategories} 
              data={categoryAverages} 
              hoveredCategory={hoveredCategory}
              onHoverCategory={setHoveredCategory}
            />
          </div>
        </div>

        {/* Dashboard Controls Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card/40 backdrop-blur-md border border-border/40">
           {/* Search */}
           <div className="relative w-full md:w-72">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search technologies..." 
               className="w-full bg-background/50 border border-border/50 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           
           {/* Filters */}
           <div className="flex items-center w-full md:w-auto p-1 bg-background/50 rounded-lg border border-border/50 overflow-x-auto">
             <button 
               onClick={() => setFilterLevel("all")} 
               className={`px-4 py-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${filterLevel === "all" ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
             >
               All ({skills.length})
             </button>
             <button 
               onClick={() => setFilterLevel("core")} 
               className={`px-4 py-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${filterLevel === "core" ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
             >
               Core Stack ({skills.filter(s => s.level >= 80).length})
             </button>
             <button 
               onClick={() => setFilterLevel("learning")} 
               className={`px-4 py-2 text-xs font-bold rounded-md transition-all whitespace-nowrap ${filterLevel === "learning" ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
             >
               Learning ({skills.filter(s => s.level < 80).length})
             </button>
           </div>
        </div>

        {/* Bottom Section: Data Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {gridCategories.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No skills match your search criteria.
            </div>
          )}
          {gridCategories.map((cat, i) => {
            const meta = CATEGORY_META[cat] || CATEGORY_META["Tools"];
            const Icon = meta.icon;
            
            // Cross-filtering visual dimming
            const isHovered = hoveredCategory === cat;
            const isDimmed = hoveredCategory !== null && !isHovered;
            
            // Calculate real average for the displayed items
            const catSkills = grouped[cat];
            const avg = Math.round(catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length);

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card p-6 rounded-3xl bg-card/30 backdrop-blur-md border border-border/30 transition-all duration-300 ${isDimmed ? 'opacity-40 scale-[0.98]' : 'hover:bg-card/60'} ${isHovered ? 'ring-2 ring-secondary/50 shadow-lg shadow-secondary/10' : ''}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl bg-background/80 ${meta.color} shadow-sm border border-border/50`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">{cat}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-muted text-muted-foreground">
                    AVG {avg}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {catSkills.map((skill, idx) => {
                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                        className="relative flex items-center gap-2 px-3 py-2 bg-background/40 border border-border/50 rounded-xl hover:bg-card hover:border-border transition-all duration-300 group/skillcard shadow-sm hover:shadow-md cursor-default"
                      >
                        <SkillImgIcon
                          name={skill.name}
                          className="w-4 h-4 transition-transform duration-300 group-hover/skillcard:scale-110 drop-shadow-sm"
                        />
                        <span className="text-sm font-medium text-foreground/80 group-hover/skillcard:text-foreground transition-colors">
                          {skill.name}
                        </span>
                        
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/skillcard:opacity-100 transition-all duration-300 pointer-events-none z-10 flex flex-col items-center translate-y-2 group-hover/skillcard:translate-y-0">
                          <div className="bg-popover text-popover-foreground text-xs px-2.5 py-1.5 rounded-lg shadow-xl border border-border flex items-center gap-2 whitespace-nowrap">
                            <span className="font-bold">{skill.level}%</span>
                            <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full" style={{ width: `${skill.level}%`, backgroundColor: meta.hex }} />
                            </div>
                          </div>
                          <div className="w-2 h-2 bg-popover border-b border-r border-border rotate-45 -mt-1.5" />
                        </div>

                        {/* Subtle proficiency line at bottom */}
                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-muted-foreground/10 rounded-b-xl overflow-hidden">
                           <div 
                             className="h-full opacity-60 group-hover/skillcard:opacity-100 transition-opacity" 
                             style={{ width: `${skill.level}%`, backgroundColor: meta.hex }} 
                           />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
