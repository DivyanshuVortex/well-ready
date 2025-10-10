"use client";

import React, { useState } from "react";
import {
  Terminal,
  CloudLightning,
  CheckSquare,
  Sparkles,
  Zap,
  Copy,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
}

const features: FeatureCardProps[] = [
  {
    title: "Instant Next.js Setup",
    icon: Terminal,
    description:
      "Initializes a fresh Next.js project with the latest stable version.",
  },
  {
    title: "Tailwind CSS & Variants",
    icon: CloudLightning,
    description:
      "Fully configured Tailwind CSS, ready for rapid UI development.",
  },
  {
    title: "ESLint Code Quality",
    icon: CheckSquare,
    description:
      "Enforces code quality with standard ESLint rules and recommended plugins.",
  },
  {
    title: "Prettier Formatting",
    icon: Sparkles,
    description:
      "Automatic code formatting for consistent style across your entire project.",
  },
  {
    title: "Blazing Fast Start",
    icon: Zap,
    description:
      "One-command setup to get coding faster without any manual configurations.",
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon: Icon, description }) => (
  <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/50 rounded-3xl p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/30">
    <Icon className="w-12 h-12 text-indigo-400 mb-4 transition-transform duration-300" />
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-base">{description}</p>
  </div>
);

const Page: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx well-ready");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased relative overflow-hidden px-4 sm:px-10 py-10">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-900 opacity-10 filter blur-3xl rounded-full"></div>

      <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-24 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            The modern Next.js CLI
          </p>
          <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-6 leading-tight">
            well-ready <span className="text-indigo-400">🚀</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Bootstrap your <strong>Next.js</strong> project instantly. Pre-configured with{" "}
            <strong>Tailwind CSS, ESLint, and Prettier</strong> for a seamless,
            opinionated, and highly productive developer experience.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://www.npmjs.com/package/well-ready"
              className="group bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center text-lg transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Terminal className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-6" />
              npx well-ready
            </a>
          </div>

          {/* Badges */}
          <div className="flex justify-center flex-wrap gap-4 mt-6">
            <div className="flex flex-wrap justify-center gap-4 bg-gray-800/50 p-4 rounded-2xl shadow-lg">
              <img
                src="https://img.shields.io/npm/v/well-ready.svg?style=flat-square"
                alt="npm version"
                className="w-[100px] h-[20px] sm:w-[120px]"
              />
              <img
                src="https://img.shields.io/npm/dm/well-ready.svg?style=flat-square"
                alt="npm downloads"
                className="w-[150px] h-[20px] sm:w-[160px]"
              />
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="w-full max-w-6xl mb-24">
          <h2 className="text-4xl font-extrabold text-white text-center mb-12">
            Packed with Essential Tools
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, idx) => (
              <FeatureCard key={idx} {...f} />
            ))}
          </div>
        </section>

        {/* Terminal Section */}
        <section className="w-full max-w-3xl mb-24 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Get Started in Seconds
          </h2>
          <p className="text-lg text-gray-400 mb-6">
            Execute the command below and follow the interactive prompts to
            scaffold your new project.
          </p>

          <div className="relative bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-2xl flex items-start justify-between">
            <span className="absolute top-2 left-4 text-xs font-mono text-gray-500">
              Terminal
            </span>
            <pre className="text-emerald-300 font-mono text-base overflow-auto text-left pt-3">
              <code className="whitespace-pre-wrap">
                $ npx well-ready{" "}
                <span className="text-gray-500"># or yarn dlx well-ready</span>
              </code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-gray-800/70 hover:bg-indigo-600 text-white p-2 rounded-lg transition-all duration-300 flex items-center gap-1 text-sm"
            >
              <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-gray-500 text-center text-sm max-w-4xl pt-10 border-t border-gray-800">
          <p className="mb-2">
            Copyright &copy; {new Date().getFullYear()} Divyanshu Chandra. All
            rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Page;
