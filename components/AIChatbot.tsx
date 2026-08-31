"use client"

import { useState } from "react"
import { MessageSquare, X, Send, Bot, User } from "lucide-react"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "Hi! I'm an AI assistant trained on Charan's resume. Ask me about his experience, skills, or projects!" }
  ])
  const [input, setInput] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setInput("")

    // Simulate AI thinking and response
    setTimeout(() => {
      const lower = userMessage.toLowerCase()
      let botResponse = "I'm still learning! You can ask me about his experience with AI, React, databases, or where he worked previously."
      
      if (lower.includes("ai") || lower.includes("llm") || lower.includes("prompt")) {
        botResponse = "Charan specializes in AI-Augmented apps! He has built NLP resume evaluation tools, RAG-based chatbots using LangChain, and orchestrated workflows with n8n and Pinecone."
      } else if (lower.includes("experience") || lower.includes("work")) {
        botResponse = "He's currently a Senior Data Analyst (acting as a Full Stack Engineer) at Ninex Corp. Previously, he was a Project Lead at Senexxel, and spent nearly 2 years as a Data Analytics Engineer at Providence Global."
      } else if (lower.includes("skills") || lower.includes("tech") || lower.includes("stack")) {
        botResponse = "His core stack revolves around Next.js, React, Node.js, and TypeScript, backed by PostgreSQL or Snowflake. He's also highly proficient in OpenAI API integrations and Python."
      }

      setMessages(prev => [...prev, { role: "bot", content: botResponse }])
    }, 800)
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-xl hover:opacity-90 hover:scale-105 transition-all z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[350px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-medium font-bricolage tracking-tight">Chat with Resume</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-[300px] overflow-y-auto flex flex-col gap-4 bg-muted/30">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-muted text-foreground" : "bg-primary/10 text-primary"}`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border rounded-tl-sm text-card-foreground shadow-sm"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-card border-t border-border flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about my experience..." 
            className="flex-1 bg-muted/50 border border-transparent focus:border-border rounded-full px-4 py-2 text-sm focus:outline-none transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  )
}
