"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import {
  FolderTree,
  Database,
  Globe,
  Server,
  Zap,
  Terminal,
  Github,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";

// ---------------------------
// Types & Data (Added gradient per template)
// ---------------------------
interface Template {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  structure: string[];
  gradient: string;
}

const templates: Template[] = [
  {
    name: "Next.js + Prisma",
    description:
      "Full-stack Next.js App Router with Prisma ORM and Tailwind CSS v4.",
    icon: Globe,
    gradient: "from-cyan-400 via-cyan-500 to-blue-600",
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
    description:
      "Production-ready MERN stack with TypeScript, Tailwind v4, and JWT auth.",
    icon: Database,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
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
    description:
      "Blazing fast Vite + React setup with TypeScript and Tailwind v4.",
    icon: Zap,
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
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
    description:
      "Robust Express.js backend with TypeScript, MongoDB, and security best practices.",
    icon: Server,
    gradient: "from-orange-400 via-amber-500 to-red-600",
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
// Theme Toggle
// ---------------------------
const ThemeToggle = ({
  isDark,
  toggle,
}: {
  isDark: boolean;
  toggle: () => void;
}) => (
  <motion.button
    onClick={toggle}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`relative p-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300
      ${
        isDark
          ? "bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20"
          : "bg-black/10 border-black/20 text-orange-600 hover:bg-black/20"
      }`}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={isDark ? "moon" : "sun"}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

// ---------------------------
// Components (Updated for dual theme)
// ---------------------------

const CommandChip = ({ text, isDark }: { text: string; isDark: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.button
      onClick={copy}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative group flex items-center px-7 py-4 rounded-xl border font-mono text-base tracking-tight
        overflow-hidden transition-all duration-300 shadow-lg
        ${
          copied
            ? "border-emerald-400 bg-emerald-500/10"
            : isDark
            ? "border-slate-700 bg-slate-800/70 hover:border-cyan-400/60 hover:bg-slate-800/90"
            : "border-gray-300 bg-white/80 hover:border-blue-400 hover:bg-white/90"
        }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <Terminal
        className={`w-5 h-5 mr-3 ${
          copied
            ? "text-emerald-400"
            : isDark
            ? "text-cyan-400"
            : "text-blue-600"
        }`}
      />
      <span
        className={
          copied
            ? "text-emerald-300"
            : isDark
            ? "text-slate-100"
            : "text-gray-800"
        }
      >
        {copied ? "Copied!" : text}
      </span>
    </motion.button>
  );
};

const TemplateCard = ({
  data,
  index,
  hovered,
  setHovered,
  isDark,
}: {
  data: Template;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  isDark: boolean;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden h-full group transition-all duration-500
        ${active ? "shadow-2xl" : "shadow-lg"}`}
    >
      {/* Gradient Border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${data.gradient} p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      >
        <div
          className={`h-full w-full rounded-2xl ${
            isDark ? "bg-slate-950/95" : "bg-white/95"
          } backdrop-blur-sm`}
        />
      </div>

      {/* Card Content */}
      <div
        className={`relative h-full rounded-2xl p-6 flex flex-col transition-all duration-500
        ${
          isDark
            ? "bg-slate-900/70 border border-slate-800"
            : "bg-white/80 border border-gray-200 shadow-xl"
        }`}
      >
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
          ${
            active
              ? isDark
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-blue-500/20 text-blue-600"
              : isDark
              ? "bg-slate-800 text-slate-400"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <data.icon className="w-8 h-8" />
        </div>

        <h3
          className={`text-xl font-bold mb-3 transition-colors ${
            isDark
              ? "text-white group-hover:text-cyan-300"
              : "text-gray-900 group-hover:text-blue-600"
          }`}
        >
          {data.name}
        </h3>

        <p
          className={`text-sm leading-relaxed flex-grow transition-colors ${
            isDark ? "text-slate-400" : "text-gray-600"
          }`}
        >
          {data.description}
        </p>

        {/* Overlay on Hover */}
        <motion.div
          className={`absolute inset-0 ${
            isDark ? "bg-slate-950/95" : "bg-white/95"
          } p-6 flex flex-col justify-center backdrop-blur-sm`}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`flex items-center ${
              isDark ? "text-cyan-400" : "text-blue-600"
            } text-xs font-bold tracking-wider mb-4 uppercase`}
          >
            <FolderTree className="w-4 h-4 mr-2" /> Project Structure
          </div>
          <div className="pl-3 border-l border-slate-700 dark:border-slate-700 border-gray-300">
            <pre
              className={`text-xs font-mono leading-loose ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {data.structure.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={active ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="whitespace-pre"
                >
                  {line}
                </motion.div>
              ))}
            </pre>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ---------------------------
// Main App
// ---------------------------
export default function App() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        isDark ? "dark bg-slate-950" : "bg-gray-50"
      } text-white dark:text-white`}
    >
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-3xl transition-all duration-1000
          ${isDark ? "bg-cyan-500/10" : "bg-blue-400/20"}`}
        />
        <div
          className={`absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl transition-all duration-1000
          ${isDark ? "bg-purple-500/10" : "bg-indigo-400/20"}`}
        />
      </div>

      {/* Modern Glass Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-700
        ${
          isDark
            ? "bg-slate-950/70 border-b border-slate-800/50"
            : "bg-white/70 border-b border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-10"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl backdrop-blur-xl border ${
                  isDark
                    ? "bg-white/10 border-white/20"
                    : "bg-black/10 border-black/20"
                }`}
              >
                <Terminal
                  className={`w-6 h-6 ${
                    isDark ? "text-cyan-400" : "text-blue-600"
                  }`}
                />
              </div>
              <span
                className={`text-2xl font-black bg-gradient-to-r ${
                  isDark
                    ? "from-cyan-400 to-indigo-400"
                    : "from-blue-600 to-indigo-600"
                } bg-clip-text text-transparent`}
              >
                well-ready
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
            <a
              href="https://github.com/DivyanshuVortex/well-ready"
              target="_blank"
              className={`px-5 py-2.5 rounded-xl backdrop-blur-xl border font-medium text-sm flex items-center gap-2 transition-all
                ${
                  isDark
                    ? "bg-black/10 border-white/20 hover:bg-white/20"
                    : "bg-black/25 border-black/20 hover:bg-black"
                }`}
            >
              <Github className="w-4 h-4" /> Star on GitHub
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Version + License */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className={`px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2
        ${
          isDark
            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
            : "bg-blue-500/10 border-blue-500/30 text-blue-700"
        }`}
            >
              <Zap className="w-3.5 h-3.5" />
              v0.1.6
            </div>

            <span
              className={`${
                isDark ? "text-slate-400" : "text-gray-600"
              } text-sm`}
            >
              Open Source • MIT
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Build Faster with <br />
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-cyan-400 via-blue-400 to-indigo-400"
                  : "from-blue-600 via-indigo-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Well-Ready CLI
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${
              isDark ? "text-slate-400" : "text-gray-700"
            }`}
          >
            Instant project scaffolding for modern web stacks — Next.js, MERN,
            Vite, Express.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <CommandChip text="npx well-ready" isDark={isDark} />

            <a
              href="https://github.com/DivyanshuVortex/well-ready/blob/master/TEMPLATES.md"
              target="_blank"
              className={`px-8 py-4 rounded-xl font-medium flex items-center gap-3 transition-all
        ${
          isDark
            ? "text-slate-300 hover:text-white"
            : "text-gray-700 hover:text-gray-900"
        }`}
            >
              Documentation{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* First-Time Guide */}
      <section className="max-w-4xl mx-auto px-6 pb-28">
        <div
          className={`rounded-2xl p-10 backdrop-blur-xl border transition-all duration-500
    ${
      isDark
        ? "bg-slate-900/60 border-slate-800"
        : "bg-white/80 border-gray-200 shadow-xl"
    }`}
        >
          {/* Guide Header */}
          <h2
            className={`text-3xl font-black mb-4 bg-gradient-to-r
      ${isDark ? "from-cyan-400 to-blue-400" : "from-blue-600 to-indigo-600"}
      bg-clip-text text-transparent`}
          >
            First Time Using{" "}
            <span className="font-extrabold">npx well-ready</span>?
          </h2>

          <p
            className={`${
              isDark ? "text-slate-400" : "text-gray-700"
            } leading-relaxed mb-8`}
          >
            <span className="font-semibold">well-ready</span> is a CLI that
            generates fully-structured, production-ready starter templates for
            your project. Skip the boilerplate setup and start building
            instantly.
          </p>

          {/* Requirements */}
          <div className="mb-10">
            <h3
              className={`text-xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Requirements
            </h3>

            <ul
              className={`pl-5 list-disc space-y-2 ${
                isDark ? "text-slate-400" : "text-gray-700"
              }`}
            >
              <li>
                Node.js <strong>v18+</strong> (recommended <strong>v20+</strong>
                )
              </li>
              <li>npm or yarn installed</li>
            </ul>
          </div>

          {/* How to use */}
          <div className="mb-10">
            <h3
              className={`text-xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              How to Use
            </h3>

            <p
              className={`${isDark ? "text-slate-400" : "text-gray-700"} mb-4`}
            >
              Run this command anywhere:
            </p>

            <CommandChip text="npx well-ready" isDark={isDark} />

            <p
              className={`${
                isDark ? "text-slate-400" : "text-gray-700"
              } mt-6 leading-relaxed`}
            >
              Select your preferred stack → enter project name → your full
              boilerplate is generated automatically. Jump in and start coding.
            </p>
          </div>

          {/* What happens next */}
          <div>
            <h3
              className={`text-xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              What Happens Next?
            </h3>

            <ul
              className={`pl-5 list-disc space-y-2 ${
                isDark ? "text-slate-400" : "text-gray-700"
              }`}
            >
              <li>A complete project folder is created</li>
              <li>All dependencies are automatically installed</li>
              <li>Best-practice project structure + config files included</li>
              <li>Your own env variables setup is needed</li>
              <li>
                Start development:
                <pre
                  className={`mt-2 p-3 rounded-lg text-sm font-mono ${
                    isDark
                      ? "bg-slate-800 text-slate-200"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  npm run dev
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </section>


      {/* Templates */}
      <section id="templates" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-black mb-4 bg-gradient-to-r ${
              isDark
                ? "from-cyan-400 to-indigo-400"
                : "from-blue-600 to-indigo-600"
            } bg-clip-text text-transparent`}
          >
            Some of the Available Stacks
          </h2>
          <p className={`${isDark ? "text-slate-500" : "text-gray-700"}`}>
            Hover cards to reveal project structure
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 perspective-1000">
          {templates.map((t, i) => (
            <div key={i} className="h-80">
              <TemplateCard
                data={t}
                index={i}
                hovered={hovered}
                setHovered={setHovered}
                isDark={isDark}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-12 ${
          isDark
            ? "border-slate-800 bg-slate-950/50"
            : "border-gray-200 bg-gray-50/50"
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={`${isDark ? "text-slate-500" : "text-gray-600"}`}>
            © {new Date().getFullYear()} Well-Ready • Made by{" "}
            <a
              href="https://www.linkedin.com/in/divyanshu-chandra-66074926b/"
              className={`${
                isDark ? "text-cyan-400" : "text-blue-600"
              } font-bold hover:underline`}
            >
              Divyanshu Chandra
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
