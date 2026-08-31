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
  TrendingUp,
  Layers,
  Zap,
  Star,
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
  { icon: LucideIcon; hex: string }
> = {
  Frontend:              { icon: Monitor,      hex: "#3b82f6" },
  Backend:               { icon: Server,       hex: "#8b5cf6" },
  Database:              { icon: Database,     hex: "#f59e0b" },
  "Cloud & DevOps":      { icon: Cloud,        hex: "#06b6d4" },
  "Data Analytics & ML": { icon: TrendingUp,   hex: "#10b981" },
  Mobile:                { icon: Smartphone,   hex: "#f43f5e" },
  Languages:             { icon: Code2,        hex: "#eab308" },
  Tools:                 { icon: Wrench,       hex: "#64748b" },
};

const SKILL_SLUGS: Record<string, string> = {
  // Web & Languages
  "HTML": "html5", "HTML5": "html5", "CSS": "css3", "CSS3": "css3", "JavaScript": "javascript",
  "TypeScript": "typescript", "Python": "python", "C": "c", "C++": "cplusplus", "Java": "java",
  "Matlab": "mathworks",
  // Frontend
  "React JS": "react", "Next JS": "nextdotjs", "Tailwind CSS": "tailwindcss",
  "Redux": "redux", "Bootstrap": "bootstrap",
  // Backend
  "Node JS": "nodedotjs", "GraphQL": "graphql", "Express.js": "express",
  "Django": "django", "Flask": "flask", "FastAPI": "fastapi",
  // Mobile
  "React Native": "react", "Flutter": "flutter", "Expo": "expo",
  // Databases
  "PostgreSQL": "postgresql", "MySQL": "mysql", "MongoDB": "mongodb",
  "SQLite": "sqlite", "Snowflake": "snowflake", "Databricks": "databricks",
  "Oracle": "oracle", "Redis": "redis",
  // Cloud & Infra
  "Vercel": "vercel", "Docker": "docker", "Kubernetes": "kubernetes",
  "Git": "git", "AWS": "amazonaws", "Amazon AWS": "amazonaws", "Azure": "microsoftazure", "Microsoft Azure": "microsoftazure", "GCP": "googlecloud", "Google Cloud": "googlecloud",
  "GitHub Actions": "githubactions", "ArgoCD": "argo", "Heroku": "heroku", "Hostinger": "hostinger",
  // AI & ML
  "OpenAI API": "openai", "LangChain": "langchain",
  "Pinecone": "pinecone", "Hugging Face": "huggingface",
  "Pandas": "pandas", "Numpy": "numpy", "Scikit Learn": "scikitlearn", "Tensorflow": "tensorflow",
  // Tools
  "n8n": "n8n", "Power BI": "powerbi", "Tableau": "tableau",
  "Github": "github", "VS Code": "visualstudiocode", "Unity": "unity", "Postman": "postman", "Figma": "figma", "Slack": "slack"
};

// Only for skills with NO simpleicons equivalent
const SKILL_LUCIDE: Record<string, LucideIcon> = {
  "ElysiaJS": Server,
  "RAG Architecture": Code2,
  "Excloud": Cloud,
  "OpenRouter": BrainCircuit,
  "Matplotlib": TrendingUp,
};

const SkillImgIcon = ({ name, className }: { name: string; className?: string }) => {
  const [err, setErr] = React.useState(false);
  const slug = SKILL_SLUGS[name];
  const Fallback = SKILL_LUCIDE[name];
  if (Fallback) return <Fallback className={className} />;
  if (!slug || err) return <Code2 className={className} />;
  return <img src={`https://cdn.simpleicons.org/${slug}`} alt={name} className={className} onError={() => setErr(true)} />;
};

function levelInfo(lvl: number): { label: string; dots: number } {
  if (lvl >= 90) return { label: "Expert",     dots: 4 };
  if (lvl >= 75) return { label: "Advanced",   dots: 3 };
  if (lvl >= 55) return { label: "Proficient", dots: 2 };
  return               { label: "Learning",    dots: 1 };
}

/* ─── Single skill row ─── */
function SkillRow({ skill, hex, index, catIndex }: { skill: Skill; hex: string; index: number; catIndex: number }) {
  const { label, dots } = levelInfo(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: catIndex * 0.04 + index * 0.04 }}
      className="group relative flex items-center gap-4 p-4 rounded-2xl bg-background border border-border/70 hover:border-transparent transition-all duration-300 overflow-hidden cursor-default"
      whileHover={{ y: -2, boxShadow: `0 0 0 1.5px ${hex}55, 0 8px 24px ${hex}14` }}
    >


      {/* Hover wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `linear-gradient(100deg, ${hex}0c 0%, transparent 70%)` }}
      />

      {/* Icon bubble */}
      <div
        className="relative z-10 w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: hex + "18" }}
      >
        <SkillImgIcon name={skill.name} className="w-5 h-5" />
      </div>

      {/* Name + bar */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-sm font-bold text-foreground leading-none">{skill.name}</span>
          {/* Dot rating */}
          <div className="flex items-center gap-0.5 shrink-0">
            {[1,2,3,4].map(d => (
              <div
                key={d}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: d <= dots ? hex : hex + "30" }}
              />
            ))}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 w-full bg-border/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: hex }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1.1, delay: catIndex * 0.04 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Level + pct */}
      <div className="relative z-10 shrink-0 text-right">
        <span className="block text-xs font-black font-mono" style={{ color: hex }}>{skill.level}%</span>
        <span className="block text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mt-0.5">{label}</span>
      </div>
    </motion.div>
  );
}

/* ─── Category card ─── */
function CategoryCard({ cat, skills, meta, index }: {
  cat: string;
  skills: Skill[];
  meta: { icon: LucideIcon; hex: string };
  index: number;
}) {
  const Icon = meta.icon;
  const avg = Math.round(skills.reduce((s, sk) => s + sk.level, 0) / skills.length);
  const circ = 2 * Math.PI * 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl border border-border bg-card overflow-hidden break-inside-avoid mb-5 sm:mb-6"
    >

      {/* Ambient glow (subtle) */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(600px circle at 50% -20%, ${meta.hex}0b, transparent 55%)` }}
      />

      {/* Card Header */}
      <div className="relative z-10 flex items-center justify-between p-5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: meta.hex + "18" }}
          >
            <Icon className="w-5 h-5" style={{ color: meta.hex }} />
          </div>
          <div>
            <h3 className="text-base font-bold leading-tight">{cat}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{skills.length} {skills.length === 1 ? "technology" : "technologies"}</p>
          </div>
        </div>

        {/* Circular avg */}
        <div className="relative w-12 h-12">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
            <motion.circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke={meta.hex}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - (avg / 100) * circ }}
              transition={{ duration: 1.4, delay: index * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black leading-none" style={{ color: meta.hex }}>{avg}</span>
            <span className="text-[7px] text-muted-foreground font-medium leading-none mt-0.5">avg</span>
          </div>
        </div>
      </div>

      {/* Skill rows */}
      <div className="relative z-10 p-4 space-y-2">
        {skills.map((skill, idx) => (
          <SkillRow key={skill.id} skill={skill} hex={meta.hex} index={idx} catIndex={index} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Stat card ─── */
function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: LucideIcon; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex items-center gap-4 p-5 rounded-2xl bg-card border border-border overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(200px circle at 20% 50%, ${color}0c, transparent 60%)` }}
      />
      <div
        className="relative z-10 w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color + "18" }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="relative z-10 min-w-0">
        <p className="text-xs text-muted-foreground font-medium leading-none mb-1.5">{label}</p>
        <p className="text-2xl font-black tracking-tight leading-none">{value}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function SkillsClient({ skills }: { skills: Skill[] }) {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "core" | "learning">("all");

  const filtered = useMemo(() => skills.filter(sk => {
    if (search && !sk.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "core"     && sk.level < 80) return false;
    if (filter === "learning" && sk.level >= 80) return false;
    return true;
  }), [skills, search, filter]);

  const grouped = useMemo(() =>
    filtered.reduce<Record<string, Skill[]>>((acc, s) => {
      const c = s.category || "Other";
      (acc[c] = acc[c] || []).push(s);
      return acc;
    }, {}), [filtered]);

  const allGrouped = useMemo(() =>
    skills.reduce<Record<string, Skill[]>>((acc, s) => {
      const c = s.category || "Other";
      (acc[c] = acc[c] || []).push(s);
      return acc;
    }, {}), [skills]);

  const order = ["Frontend", "Backend", "Database", "AI & ML", "Cloud", "Mobile", "Tools"];
  const cats = Object.keys(grouped).sort((a, b) =>
    (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) - (order.indexOf(b) !== -1 ? order.indexOf(b) : 99)
  );

  const overallAvg = Math.round(skills.reduce((s, sk) => s + sk.level, 0) / (skills.length || 1));
  const expertCount = skills.filter(s => s.level >= 90).length;

  const filters: { key: typeof filter; label: string; count: number }[] = [
    { key: "all",      label: "All",        count: skills.length },
    { key: "core",     label: "Core Stack", count: skills.filter(s => s.level >= 80).length },
    { key: "learning", label: "Learning",   count: skills.filter(s => s.level < 80).length },
  ];

  return (
    <div>
      <PageHeader
        label="Skill Matrix"
        title="Technical Arsenal"
        description="A comprehensive, data-driven map of the tools, frameworks, and technologies I work with every day."
      />

      <div className="space-y-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total Technologies"  value={skills.length}      icon={Layers}     color="#3b82f6" />
          <StatCard label="Expert (90%+)"       value={expertCount}        icon={Star}       color="#10b981" />
          <StatCard label="Avg Proficiency"     value={`${overallAvg}%`}   icon={TrendingUp} color="#8b5cf6" />
          <StatCard label="Top Domain"          value="Full Stack"          icon={Zap}        color="#f59e0b" />
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search technologies..."
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all placeholder:text-muted-foreground/60"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-0 overflow-x-auto">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                  filter === f.key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
                <span className={`ml-1.5 text-xs font-black ${filter === f.key ? "text-blue-500" : "opacity-40"}`}>{f.count}</span>
                {filter === f.key && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        {cats.length === 0 && (
          <div className="py-24 text-center text-muted-foreground">No technologies match your search.</div>
        )}
        {cats.length > 0 && (
          <React.Fragment key={filter + "|" + search}>
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-5 sm:gap-6">
              {cats.map((cat, i) => {
                const meta = CATEGORY_META[cat] ?? CATEGORY_META["Tools"];
                return (
                  <CategoryCard key={cat} cat={cat} skills={grouped[cat]} meta={meta} index={i} />
                );
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
