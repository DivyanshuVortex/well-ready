"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FolderTree, Database, Code2, Globe, Terminal, Server, Layers, Zap } from "lucide-react";

// Template Metadata
const templates = [
  {
    name: "Next.js + Prisma",
    description: "Full-stack Next.js 15 App Router with Prisma ORM and Tailwind CSS v4.",
    icon: Globe,
    structure: [
      "nextjs-prisma/",
      " ├── app/",
      " ├── prisma/schema.prisma",
      " ├── next.config.ts",
      " └── package.json",
    ],
  },
  {
    name: "MERN Stack (TS)",
    description: "Production-ready MERN stack with TypeScript, Tailwind v4, and JWT auth.",
    icon: Database,
    structure: [
      "mern-ts/",
      " ├── client/src/",
      " ├── server/src/",
      " ├── tsconfig.json",
      " └── .env",
    ],
  },
  {
    name: "Vite + React (TS)",
    description: "Blazing fast Vite + React 19 setup with TypeScript and Tailwind v4.",
    icon: Zap,
    structure: [
      "react-vite-ts/",
      " ├── src/",
      " ├── vite.config.ts",
      " ├── tailwind.config.js",
      " └── package.json",
    ],
  },
  {
    name: "Express API (TS)",
    description: "Robust Express.js backend with TypeScript, MongoDB, and security best practices.",
    icon: Server,
    structure: [
      "express-ts/",
      " ├── src/",
      " │   ├── controllers/",
      " │   ├── models/",
      " │   └── routes/",
      " └── package.json",
    ],
  },
];

// Motion variants for staggered file reveal
const lineVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.12, ease: "easeOut" },
  }),
};

// Subtle tilt micro-interaction
const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--rX", `${y * -4}deg`);
      el.style.setProperty("--rY", `${x * 4}deg`);
    };

    const reset = () => {
      el.style.setProperty("--rX", "0deg");
      el.style.setProperty("--rY", "0deg");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return ref;
};

// Copy Command Chip
const CommandChip = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <motion.button
      onClick={copy}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex items-center px-6 py-3 rounded-lg border font-mono text-sm tracking-tight transition-all cursor-pointer
        ${
          copied
            ? "border-cyan-400/80 bg-cyan-500/10 text-cyan-300"
            : "border-slate-700 bg-slate-800/60 text-slate-200 hover:border-cyan-400/50 hover:bg-slate-800/80"
        }`}
    >
      <Terminal className="w-4 h-4 mr-2 opacity-80" />
      {copied ? "Copied!" : text}
    </motion.button>
  );
};

// Main UI
export default function App() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        .tilt { transform: perspective(1000px) rotateX(var(--rX, 0)) rotateY(var(--rY, 0)); will-change: transform; }
      `}</style>

      {/* Hero */}
      <section className="text-center pt-32 pb-20 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-6">
            <Zap className="w-3 h-3 mr-1.5" /> v0.1.15 Now Available
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Build Faster with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Well-Ready CLI
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Instant project scaffolding for modern web stacks. <br className="hidden md:block" />
            Next.js, MERN, Vite, and Express templates — pre-configured and type-safe.
          </p>
          <div className="flex justify-center">
            <CommandChip text="npm run cli" />
          </div>
        </motion.div>
      </section>

      {/* Template Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center mb-12">
          <Layers className="w-6 h-6 text-cyan-400 mr-3" />
          <h2 className="text-2xl font-bold text-slate-200">Available Stacks</h2>
          <div className="h-px bg-slate-800 flex-grow ml-6" />
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t, i) => {
            const ref = useTilt();

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`tilt relative rounded-2xl border bg-slate-900/50 backdrop-blur-sm overflow-hidden
                  transition-all duration-300 h-full group ${
                    hovered === i
                      ? "border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
              >
                {/* Card Base */}
                <div className="p-6 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 ${
                    hovered === i ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800 text-slate-400"
                  }`}>
                    <t.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-grow">
                    {t.description}
                  </p>
                </div>

                {/* Overlay — File Structure */}
                <motion.div
                  className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col justify-center"
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={
                    hovered === i 
                      ? { opacity: 1, backdropFilter: "blur(4px)" } 
                      : { opacity: 0, backdropFilter: "blur(0px)" }
                  }
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center text-cyan-400 text-xs font-bold tracking-wider mb-4 uppercase">
                    <FolderTree className="w-3 h-3 mr-2" /> Project Structure
                  </div>
                  <div className="pl-2 border-l border-slate-800">
                    <pre className="text-slate-300 text-xs font-mono leading-loose">
                      {t.structure.map((line, idx) => (
                        <motion.div
                          key={idx}
                          custom={idx}
                          variants={lineVariants}
                          initial="hidden"
                          animate={hovered === i ? "visible" : "hidden"}
                          className="whitespace-pre"
                        >
                          {line}
                        </motion.div>
                      ))}
                    </pre>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
              W
            </div>
            <span className="text-slate-300 font-semibold">Well-Ready CLI</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Well-Ready. Open Source.
          </div>
        </div>
      </footer>
    </main>
  );
}
