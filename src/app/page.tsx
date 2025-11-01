"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FolderTree, Database, Code2, Globe, Terminal } from "lucide-react";

// Template Metadata
const templates = [
  {
    name: "Next.js + Prisma Starter",
    description: "Modern Next.js 14 stack with Prisma, Tailwind CSS, and optimized developer workflow.",
    icon: Globe,
    structure: [
      "project-root/",
      " ├── app/",
      " ├── prisma/schema.prisma",
      " ├── next.config.js",
      " └── package.json",
    ],
  },
  {
    name: "MERN Stack (TypeSafe)",
    description: "End-to-end typed setup using MongoDB, Express, React, and Node.js with TypeScript.",
    icon: Database,
    structure: [
      "mern-ts-stack/",
      " ├── client/src/",
      " ├── server/src/",
      " ├── tsconfig.json",
      " └── .env",
    ],
  },
  {
    name: "T3 Stack (Monorepo)",
    description: "Turbo monorepo including Next.js, tRPC, Prisma, and Tailwind — production ready.",
    icon: Code2,
    structure: [
      "t3-monorepo/",
      " ├── apps/web/",
      " ├── packages/api/",
      " ├── packages/db/",
      " └── turbo.json",
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
      className={`flex items-center px-6 py-3 rounded-lg border font-mono text-sm tracking-tight transition-all
        ${
          copied
            ? "border-cyan-400/80 bg-cyan-500/10 text-cyan-300"
            : "border-gray-700 bg-gray-800/60 text-gray-200 hover:border-cyan-400/50 hover:bg-gray-800/80"
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
    <main className="min-h-screen bg-[#0a0a0b] text-white font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        .tilt { transform: perspective(1000px) rotateX(var(--rX, 0)) rotateY(var(--rY, 0)); will-change: transform; }
      `}</style>

      {/* Hero */}
      <section className="text-center pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Stack Precision
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Generate, configure, and launch type-safe Next.js stacks instantly.
          </p>
          <div className="mt-10">
            <CommandChip text="npx @stack-precision/cli create latest" />
          </div>
        </motion.div>
      </section>

      {/* Template Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t, i) => {
          const ref = useTilt();

          return (
            <motion.div
              key={i}
              ref={ref}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`tilt relative rounded-xl border bg-gray-900/40 backdrop-blur-sm overflow-hidden
                transition-all duration-300 ${
                  hovered === i
                    ? "border-cyan-400/50 shadow-[0_0_16px_rgba(0,255,255,0.15)]"
                    : "border-gray-800"
                }`}
            >
              {/* Card Base */}
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <t.icon className="w-10 h-10 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
                  <p className="text-sm text-gray-400 leading-snug">{t.description}</p>
                </div>
              </div>

              {/* Overlay — File Structure */}
              <motion.div
                className="absolute inset-0 bg-[#0b0b0c]/95 p-6 overflow-hidden"
                initial={{ opacity: 0, y: 8 }}
                animate={
                  hovered === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-center text-cyan-400 text-sm font-medium mb-3">
                  <FolderTree className="w-4 h-4 mr-2" /> FILE STRUCTURE
                </div>
                <pre className="text-gray-300 text-xs font-mono leading-tight">
                  {t.structure.map((line, idx) => (
                    <motion.span
                      key={idx}
                      custom={idx}
                      variants={lineVariants}
                      initial="hidden"
                      animate={hovered === i ? "visible" : "hidden"}
                      className="block whitespace-pre"
                    >
                      {line}
                    </motion.span>
                  ))}
                </pre>
              </motion.div>
            </motion.div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900/80 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Stack Precision. All rights reserved.
      </footer>
    </main>
  );
}
