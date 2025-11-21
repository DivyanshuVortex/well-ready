"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Terminal, Database, Layers, ArrowRight, Copy, Check, Globe, Server } from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText("npm run dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6">
            <Globe className="w-3 h-3 mr-1.5" /> Next.js 16 App Router
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Full-Stack <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Next.js Development
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A production-ready template with App Router, React Server Components, and Tailwind CSS v4. 
            Type-safe and performant by default.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://nextjs.org/docs" 
              target="_blank"
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all flex items-center"
            >
              Documentation <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <button 
              onClick={copyCommand}
              className="px-8 py-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-900/50 text-slate-300 font-mono text-sm flex items-center transition-all group"
            >
              <Terminal className="w-4 h-4 mr-2 text-slate-500 group-hover:text-blue-400" />
              npm run dev
              {copied ? <Check className="w-4 h-4 ml-2 text-green-400" /> : <Copy className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "App Router",
              desc: "Leverage React Server Components, nested layouts, and streaming.",
              icon: Layers,
              color: "text-blue-400",
              bg: "bg-blue-500/10"
            },
            {
              title: "Server Components",
              desc: "Built-in server-side rendering for better performance and SEO.",
              icon: Database,
              color: "text-cyan-400",
              bg: "bg-cyan-500/10"
            },
            {
              title: "API Routes",
              desc: "Build backend endpoints directly in app/api/ with standard Request/Response.",
              icon: Server,
              color: "text-indigo-400",
              bg: "bg-indigo-500/10"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Structure */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-900/50">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="text-xs font-mono text-slate-500">project-structure</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
{`.
├── app/
│   ├── api/             # Backend API routes
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # This page
├── public/              # Static assets
├── next.config.ts       # Next.js config
└── package.json         # Dependencies`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
