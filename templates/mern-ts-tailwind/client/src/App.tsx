import { useState, useEffect, useCallback } from "react";
import { Database, ArrowRight, Terminal, Copy, Check } from "lucide-react";

type ApiResponse = Record<string, unknown>;

const API_URL = "http://localhost:3000/api/data";

const App = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCommand = useCallback(async () => {
    await navigator.clipboard.writeText("npm run dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, []);

  const fetchApi = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("API error:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <div className="min-h-screen w-full bg-[#0d0c1d] text-white relative overflow-hidden font-sans">

      {/* Gradient Glow Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[120vw] h-[120vw] top-[-30%] left-[-10%] 
                        bg-fuchsia-600/20 blur-[200px] rounded-full" />
        <div className="absolute w-[100vw] h-[100vw] bottom-[-40%] right-[-20%] 
                        bg-indigo-500/20 blur-[200px] rounded-full" />
      </div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">

        {/* Tag Chip */}
        <div className="flex items-center gap-2 px-4 py-1.5 mb-6 
                        text-xs font-medium text-fuchsia-300 
                        border border-fuchsia-500/40 bg-fuchsia-500/10 
                        rounded-full shadow-md shadow-fuchsia-900/20">
          <Database className="w-3 h-3" />
          MERN + TypeScript + Tailwind
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Full-Stack Boilerplate
          <span className="block text-transparent bg-clip-text 
                           bg-gradient-to-r from-fuchsia-400 to-indigo-400">
            Ready to Build
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          A modern MERN starter with TypeScript, TailwindCSS, and a clean,
          production-ready structure for rapid development.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Docs Button */}
          <a
            href="https://react.dev"
            target="_blank"
            className="px-8 py-3 rounded-lg 
                       bg-fuchsia-600/90 hover:bg-fuchsia-500 
                       transition font-semibold flex items-center 
                       shadow-lg shadow-fuchsia-900/30"
          >
            Read Docs <ArrowRight className="w-4 h-4 ml-2" />
          </a>

          {/* Copy Command Button */}
          <button
            onClick={copyCommand}
            className="px-8 py-3 rounded-lg 
                       bg-white/5 backdrop-blur border border-white/10 
                       hover:border-fuchsia-400 hover:bg-fuchsia-400/10 
                       transition font-mono text-sm text-slate-200 
                       flex items-center group"
          >
            <Terminal className="w-4 h-4 mr-2 text-indigo-300 group-hover:text-fuchsia-300" />
            npm run dev

            {copied ? (
              <Check className="w-4 h-4 ml-2 text-fuchsia-400" />
            ) : (
              <Copy className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

        </div>
      </section>

      {/* API Response  */}
      <section className="w-full flex justify-center px-6 pb-32 mt-10">
        <div className="w-full max-w-2xl p-6 rounded-xl 
                        bg-white/5 backdrop-blur-xl border border-white/10 
                        shadow-xl shadow-indigo-900/20">

          <h3 className="text-lg font-semibold text-indigo-300 mb-4 text-center">
            API Response
          </h3>

          {loading ? (
            <div className="flex justify-center items-center gap-2 text-indigo-300">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce delay-150" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300" />
              <span className="text-sm ml-2">Fetching data...</span>
            </div>
          ) : (
            <pre className="bg-black/30 border border-white/10 p-4 rounded-lg 
                            text-fuchsia-300 text-sm overflow-x-auto max-h-[380px] whitespace-pre-wrap shadow-inner">
              {data ? JSON.stringify(data, null, 2) : "No data returned"}
            </pre>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
