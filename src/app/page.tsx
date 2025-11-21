"use client";

import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { useState } from "react";
import {
  FolderTree,
  Database,
  Globe,
  Server,
  Zap,
  Terminal,
  Github,
  ArrowRight
} from "lucide-react";

// ---------------------------
// Types & Data
// ---------------------------
interface Template {
  name: string;
  description: string;
  icon: any;
  structure: string[];
}

const templates: Template[] = [
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

// ---------------------------
// Components
// ---------------------------

const CommandChip = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.button
      onClick={copy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group flex items-center px-6 py-3 rounded-lg border font-mono text-sm tracking-tight
      transition-all cursor-pointer overflow-hidden ${
        copied
          ? "border-cyan-400/80 bg-cyan-500/10 text-cyan-300"
          : "border-slate-700 bg-slate-800/60 text-slate-200 hover:border-cyan-400/50 hover:bg-slate-800/80"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <Terminal className="w-4 h-4 mr-2 opacity-80" />
      {copied ? "Copied to clipboard!" : text}
    </motion.button>
  );
};

const TemplateCard = ({
  data,
  index,
  hovered,
  setHovered,
}: {
  data: Template;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) => {
  // 3D Tilt Logic using Framer Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(null);
  };

  const active = hovered === index;

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border bg-slate-900/50 backdrop-blur-sm overflow-hidden h-full group
        transition-colors duration-300 ${
          active
            ? "border-cyan-400/50 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]"
            : "border-slate-800 hover:border-slate-700"
        }`}
    >
      {/* Base Content */}
      <div className="p-6 h-full flex flex-col relative z-10">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 ${
            active ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800 text-slate-400"
          }`}
        >
          <data.icon className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
          {data.name}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed flex-grow">
          {data.description}
        </p>
      </div>

      {/* Code Overlay */}
      <motion.div
        className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col justify-center z-20"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1, backdropFilter: "blur(4px)" } : { opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center text-cyan-400 text-xs font-bold tracking-wider mb-4 uppercase">
          <FolderTree className="w-3 h-3 mr-2" /> Project Structure
        </div>

        <div className="pl-2 border-l border-slate-800">
          <pre className="text-slate-300 text-xs font-mono leading-loose">
            {data.structure.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
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
};

// ---------------------------
// Main Application
// ---------------------------
export default function App() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30 relative">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-20" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      {/* Hero Section */}
      <section className="text-center pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge Container */}
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium">
              <Zap className="w-3 h-3 mr-1.5" />
              v0.1.6
            </div>
            <a
              href="https://github.com/DivyanshuVortex/well-ready"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <Github className="w-3 h-3 mr-1.5" />
              Open Source
            </a>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Build Faster with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Well-Ready CLI
              </span>
            </h1>
          </div>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Instant project scaffolding for modern web stacks.
            <br className="hidden md:block" />
            Pre-configured, type-safe templates for Next.js, MERN, Vite, and Express.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CommandChip text="npx well-ready" />
            <a 
              href="https://github.com/DivyanshuVortex/well-ready/blob/master/TEMPLATES.md"
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center group"
            >
              Documentation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Template Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center mb-12">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mr-4">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-200">
              Available Stacks
            </h2>
            <p className="text-slate-500 text-sm">Select a template to view structure</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 perspective-1000">
          {templates.map((t, i) => (
            <div key={i} className="h-[320px]"> {/* Fixed height container for uniformity */}
              <TemplateCard
                data={t}
                index={i}
                hovered={hovered}
                setHovered={setHovered}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo + Title */}
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3 shadow-lg shadow-cyan-500/20">
              W
            </div>
            <span className="text-slate-300 font-semibold tracking-wide">Well-Ready CLI</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-8 mb-6 md:mb-0">
            <a
              href="https://github.com/DivyanshuVortex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/divyanshu-chandra-66074926b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Well-Ready. Open Source.
          </div>
        </div>
      </footer>
    </main>
  );
}