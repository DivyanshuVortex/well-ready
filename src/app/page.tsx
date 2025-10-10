"use client";
import React, { useState } from 'react';
// Importing icons from 'lucide-react' for a professional touch.
// If you don't have lucide-react installed, you can replace these with
// simpler characters or install the package: `npm install lucide-react`
import { Clipboard, Check, Code } from 'lucide-react';

interface CommandItem {
  title: string;
  description: string;
  command: string;
}

const commands: CommandItem[] = [
  {
    title: "Install React",
    description: "Installs React and ReactDOM dependencies.",
    command: "npm install react react-dom",
  },
  {
    title: "Start Development Server",
    description: "Runs the project in development mode with hot-reloading.",
    command: "npm run dev",
  },
  {
    title: "Build Production Bundle",
    description: "Creates the optimized production build artifacts.",
    command: "npm run build",
  },
  {
    title: "Run Tests",
    description: "Executes all configured project unit and integration tests.",
    command: "npm test",
  },
];

const Page = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (command: string) => {
    // Check if the clipboard API is available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(command);
      setCopiedCommand(command);

      setTimeout(() => setCopiedCommand(null), 1500); // Shorter duration for quick feedback
    } else {
      // Fallback for environments without clipboard access (less common now)
      console.error("Clipboard access not supported or blocked.");
      // You might show a temporary error message in a production app
    }
  };

  return (
    // Clean, deep slate gray background
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8 sm:p-12">
      
      {/* --- Header Section --- */}
      <header className="text-center mb-12 w-full max-w-4xl">
        {/* Title: Sleek and modern font, non-blinking */}
        <h1 className="text-5xl font-extrabold tracking-tight text-indigo-400 mb-2">
          Developer Command Cheatsheet
        </h1>
        {/* Subtitle for context */}
        <p className="text-lg text-gray-400">
          Quickly access and copy essential project terminal commands.
        </p>
      </header>
      
      {/* --- Commands Grid Section --- */}
      <div className="w-full max-w-4xl grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {commands.map((cmd, index) => (
          // Card: Darker but professional background, subtle border, no heavy transform on hover
          <div
            key={index}
            className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-6 flex flex-col justify-between shadow-lg transition-all duration-200 hover:border-indigo-500/50 hover:bg-gray-800"
          >
            <div className="flex flex-col gap-3 mb-5">
              {/* Title: Clear, slightly larger font */}
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Code className="w-5 h-5 text-indigo-400 mr-2" />
                {cmd.title}
              </h2>
              {/* Description: Subdued but readable */}
              <p className="text-sm text-gray-400 leading-relaxed">{cmd.description}</p>
              
              {/* Command Code Block: Clean, distinct, and easily selectable */}
              <div className="mt-3 bg-gray-900 border border-gray-700 p-3 rounded-lg text-sm text-emerald-300 font-mono overflow-auto whitespace-nowrap">
                {cmd.command}
              </div>
            </div>

            {/* Copy Button: Primary action, clear feedback, consistent style */}
            <button
              onClick={() => handleCopy(cmd.command)}
              className={`flex items-center justify-center w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-150 active:scale-[0.98] mt-auto 
                ${copiedCommand === cmd.command
                  ? 'bg-green-600 hover:bg-green-700' // Success state
                  : 'bg-indigo-600 hover:bg-indigo-500' // Default state
                }`}
            >
              {copiedCommand === cmd.command ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Copied!
                </>
              ) : (
                <>
                  <Clipboard className="w-5 h-5 mr-2" /> Copy Command
                </>
              )}
            </button>
          </div>
        ))}
      </div>
      
      {/* --- Footer Section --- */}
      <footer className="mt-16 text-gray-500 text-center text-xs">
        <p>Built with React, TypeScript, and Tailwind CSS for a modern development workflow.</p>
        <p className="mt-1">© {new Date().getFullYear()} Command Cheatsheet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;