import { useState, useEffect } from "react";
import { Zap, Code2, Palette, ArrowRight, Terminal, Check, Copy } from "lucide-react";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText("npm run dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate backend fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be your API endpoint
        // const res = await fetch("http://localhost:3000/api/data");
        // const resData = await res.json();
        
        // Simulating delay for demo purposes
        setTimeout(() => {
          setData({ message: "Backend connected successfully!", status: "active" });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-6">
            <Zap className="w-3 h-3 mr-1.5" /> Vite + React 19 + Tailwind v4
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Modern React <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Development Stack
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A blazing fast starter template with Vite, React 19, TypeScript, and Tailwind CSS v4. 
            Pre-configured for performance and developer experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://vitejs.dev/guide/" 
              target="_blank"
              className="px-8 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all flex items-center"
            >
              Read Docs <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <button 
              onClick={copyCommand}
              className="px-8 py-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-900/50 text-slate-300 font-mono text-sm flex items-center transition-all group cursor-pointer"
            >
              <Terminal className="w-4 h-4 mr-2 text-slate-500 group-hover:text-cyan-400" />
              npm run dev
              {copied ? <Check className="w-4 h-4 ml-2 text-green-400" /> : <Copy className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Vite Powered",
              desc: "Instant server start and lightning fast HMR.",
              icon: Zap,
              color: "text-yellow-400",
              bg: "bg-yellow-500/10"
            },
            {
              title: "TypeScript Ready",
              desc: "Strict type checking for robust and scalable code.",
              icon: Code2,
              color: "text-blue-400",
              bg: "bg-blue-500/10"
            },
            {
              title: "Tailwind CSS v4",
              desc: "Utility-first CSS framework for rapid UI development.",
              icon: Palette,
              color: "text-cyan-400",
              bg: "bg-cyan-500/10"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* API Status Demo */}
      <section className="max-w-2xl mx-auto px-6 pb-32">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Backend Connection Status</h3>
          
          {loading ? (
            <div className="flex items-center justify-center space-x-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              <span className="ml-2 text-sm">Checking connection...</span>
            </div>
          ) : (
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="font-mono text-sm">
                {data ? JSON.stringify(data) : "System Ready"}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
