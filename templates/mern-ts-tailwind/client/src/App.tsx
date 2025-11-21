import { useState, useEffect } from "react";
import { Database, ArrowRight, Terminal, Copy, Check } from "lucide-react";

const App = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText("npm run dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/data");
        setData(await res.json());
      } catch (e) {
        console.error("API error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white relative overflow-hidden font-sans">

      {/* Global background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[140vw] h-[140vh] bg-green-500/10 blur-[180px] rounded-full" />
      </div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">

        {/* Tag */}
        <div className="flex items-center gap-2 px-3 py-1 mb-6 
                        text-xs font-medium text-green-300 
                        border border-green-500/30 bg-green-500/10 
                        rounded-full">
          <Database className="w-3 h-3" />
          MERN + TypeScript + Tailwind
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Full-Stack Boilerplate
          <span className="block text-transparent bg-clip-text 
                          bg-gradient-to-r from-green-400 to-cyan-400">
            Ready to Build
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          A modern MERN starter with TypeScript, TailwindCSS, API-ready backend,
          and optimized project structure.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://react.dev"
            target="_blank"
            className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-500 
                       transition font-semibold flex items-center"
          >
            Read Docs <ArrowRight className="w-4 h-4 ml-2" />
          </a>

          <button
            onClick={copyCommand}
            className="px-8 py-3 rounded-lg bg-slate-900/40 border 
                       border-slate-700 hover:border-slate-600 
                       font-mono text-sm text-slate-300 
                       flex items-center transition group"
          >
            <Terminal className="w-4 h-4 mr-2 text-slate-500 group-hover:text-green-400" />
            npm run dev
            {copied ? (
              <Check className="w-4 h-4 ml-2 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      </section>

      {/* API Response */}
      <section className="w-full flex justify-center px-6 pb-32 mt-10">
        <div className="w-full max-w-2xl p-6 rounded-xl 
                        bg-slate-900/50 border border-slate-800">

          <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">
            API Response
          </h3>

          {loading ? (
            <div className="flex justify-center items-center gap-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: ".15s" }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: ".3s" }} />
              <span className="text-sm ml-2">Fetching data...</span>
            </div>
          ) : (
            <pre className="bg-slate-900 border border-slate-800 p-4 rounded-lg 
                            text-green-400 text-sm overflow-x-auto max-h-[380px]">
              {data ? JSON.stringify(data, null, 2) : "No data returned"}
            </pre>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;