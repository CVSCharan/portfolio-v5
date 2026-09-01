"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Database, Globe, Smartphone, 
  Cloud, LineChart, Code2, Wrench, Search
} from "lucide-react";
import * as SimpleIcons from "simple-icons";
import React from "react";

const CATEGORY_META: Record<string, { icon: any; label: string }> = {
  All: { icon: Globe, label: "All Skills" },
  Frontend: { icon: Globe, label: "Frontend" },
  Backend: { icon: Terminal, label: "Backend" },
  Mobile: { icon: Smartphone, label: "Mobile" },
  Database: { icon: Database, label: "Database" },
  CloudDevOps: { icon: Cloud, label: "Cloud & DevOps" },
  DataAnalyticsML: { icon: LineChart, label: "Data & ML" },
  Languages: { icon: Code2, label: "Languages" },
  Tools: { icon: Wrench, label: "Tools" },
};

const SKILL_SLUGS: Record<string, string> = {
  "HTML5": "html5", "CSS3": "css3", "React JS": "react", "Next JS": "nextdotjs",
  "Redux": "redux", "Bootstrap": "bootstrap", "Tailwind CSS": "tailwindcss",
  "Node JS": "nodedotjs", "Express.js": "express", "Django": "django",
  "Flask": "flask", "FastAPI": "fastapi", "GraphQL": "graphql",
  "React Native": "react", "Flutter": "flutter", "Expo": "expo",
  "MongoDB": "mongodb", "MySQL": "mysql", "PostgreSQL": "postgresql",
  "SQLite": "sqlite", "Oracle": "oracle", "Redis": "redis",
  "Azure": "microsoftazure", "AWS": "amazonaws", "Google Cloud": "googlecloud",
  "Docker": "docker", "Kubernetes": "kubernetes", "Heroku": "heroku",
  "Vercel": "vercel", "GitHub Actions": "githubactions", "ArgoCD": "argocd",
  "Pandas": "pandas", "Numpy": "numpy", "Scikit Learn": "scikitlearn",
  "Tensorflow": "tensorflow", "OpenAI API": "openai", "Hugging Face": "huggingface",
  "JavaScript": "javascript", "TypeScript": "typescript", "Python": "python",
  "C++": "cplusplus", "Java": "java", "Git": "git", "Github": "github",
  "VS Code": "visualstudiocode", "Figma": "figma", "Postman": "postman",
};

export default function SkillsClient({ skills }: { skills: any[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || (skill.categories && skill.categories.includes(activeTab));
    return matchesSearch && matchesTab;
  }).sort((a, b) => b.level - a.level);

  const getIcon = (name: string) => {
    const slug = SKILL_SLUGS[name];
    if (!slug) return null;
    
    const IconObj = Object.values(SimpleIcons).find(
      (icon: any) => icon.slug === slug
    ) as any;
    
    if (!IconObj) return null;
    
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        fill={`#${IconObj.hex}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={IconObj.path} />
      </svg>
    );
  };

  const categories = Object.keys(CATEGORY_META);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mt-4">
      
      {/* Sidebar (Sticky) */}
      <div className="w-full md:w-64 shrink-0 md:sticky md:top-24 self-start space-y-6 z-10">
        
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground shadow-sm"
          />
        </div>

        {/* Categories Menu */}
        <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            const CatIcon = CATEGORY_META[cat].icon;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 border whitespace-nowrap md:whitespace-normal text-left ${
                  isActive 
                    ? "bg-foreground text-background border-foreground shadow-sm font-medium" 
                    : "bg-background text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:border-border"
                }`}
              >
                <CatIcon className={`w-4 h-4 ${isActive ? 'text-background' : 'text-muted-foreground group-hover:text-foreground'}`} />
                {CATEGORY_META[cat].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 min-w-0">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={skill.id}
                className="group flex items-center gap-4 p-4 bg-background border border-border rounded-xl hover:border-foreground/30 hover:shadow-sm transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-muted/30 rounded-lg shadow-sm border border-border/50 group-hover:bg-muted transition-colors">
                  {getIcon(skill.name) || <Code2 className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-foreground truncate">{skill.name}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider truncate">
                    {skill.categories?.[0] || 'Skill'}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center text-muted-foreground border border-dashed border-border rounded-2xl bg-muted/10 mt-2">
            <Search className="w-8 h-8 mb-3 text-muted-foreground/30" />
            <p className="font-medium text-foreground">No skills found</p>
            <p className="text-sm mt-1">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

    </div>
  );
}
