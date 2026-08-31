import { db } from "@/src/prisma/db"
import Link from "next/link"
import { ArrowLeft, Download, TerminalSquare, Cpu, Briefcase, GraduationCap } from "lucide-react"
import { AIChatbot } from "@/components/AIChatbot"

export default async function ResumePage() {
  const experiences = await db.orm.public.Experience.all()
  const skills = await db.orm.public.Skill.all()

  // Sort experiences by a basic descending order assumption if order isn't in schema
  // For now we will just reverse them assuming they were seeded oldest-to-newest, or display as-is.
  // Actually, we can just display them as-is since the seed script has them ordered newest first.
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-6 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-emerald-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 px-4 py-2 rounded-full hover:scale-105 transition-transform">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-16">
        
        {/* Header */}
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            CVS Charan
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            AI-Augmented Full-Stack Developer blending Data Analytics with intelligent, scalable architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-2 space-y-16">
            
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-semibold">Experience</h2>
              </div>
              
              <div className="space-y-12 border-l border-zinc-200 dark:border-zinc-800 pl-6 ml-3 relative">
                {experiences.map((exp: any, index: number) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline Node */}
                    <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-950 border-2 border-emerald-500" />
                    
                    <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h3 className="text-xl font-medium">{exp.title}</h3>
                      <span className="text-sm font-mono text-zinc-500">{exp.period}</span>
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                      {exp.company}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Skills */}
          <div className="space-y-16">
            
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Cpu className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-semibold">Technical Arsenal</h2>
              </div>
              
              <div className="space-y-8">
                {/* Group skills by category */}
                {Array.from(new Set(skills.map((s: any) => s.category))).map(category => (
                  <div key={category as string}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">{category as string}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter((s: any) => s.category === category).map((skill: any) => (
                        <span 
                          key={skill.id}
                          className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-semibold">Education</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">Mahindra University</h3>
                  <p className="text-sm text-zinc-500 mt-1">Research Fellowship (Physics) &bull; 2022</p>
                </div>
                <div>
                  <h3 className="font-medium">VIT University</h3>
                  <p className="text-sm text-zinc-500 mt-1">MS/MSc (Physics) - 7.2 &bull; 2021</p>
                </div>
                <div>
                  <h3 className="font-medium">NxtWave</h3>
                  <p className="text-sm text-zinc-500 mt-1">CCBP 4.0 Intensive - Full Stack Web Dev</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Floating AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
