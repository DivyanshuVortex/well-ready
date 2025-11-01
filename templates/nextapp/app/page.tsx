"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-950 via-blue-950 to-blue-800 text-white px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-center tracking-tight">
        Well-Ready <span className="text-blue-400">Next</span> App
      </h1>

      {/* --- Next.js Overview --- */}
      <section className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-10 mb-12 border border-white/10">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300">
          Understanding the Next.js Structure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "App Directory",
              color: "text-blue-300",
              desc: "The app/ folder defines your routes, pages, layouts, and API endpoints. Each subfolder corresponds to a route.",
            },
            {
              title: "Server & Client Components",
              color: "text-cyan-300",
              desc: "By default, components are server-rendered. Add 'use client' to enable React interactivity and hooks.",
            },
            {
              title: "API Routes",
              color: "text-green-300",
              desc: "Create backend logic directly under app/api/. Each route file acts as a lightweight serverless function.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-white/10 rounded-xl text-center border border-white/10 hover:bg-white/20 transition duration-300"
            >
              <h3 className={`text-2xl font-semibold mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white/5 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-blue-300 mb-3">
            Data Flow in Next.js
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            <code className="bg-black/40 px-3 py-1 rounded-md">
              Client Component → API Route → Server → Response → UI
            </code>
          </p>
          <p className="mt-3 text-gray-400 text-xs">
            Next.js integrates both frontend and backend layers without needing a separate server setup.
          </p>
        </div>
      </section>

      {/* --- Project Structure --- */}
      <section className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-10 mb-12 border border-white/10">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300">
          Project Structure Overview
        </h2>

        <p className="text-gray-200 text-sm mb-6 leading-relaxed">
          A concise view of your project layout and its key directories:
        </p>

        <pre className="bg-black/30 text-gray-200 text-xs rounded-lg p-4 overflow-x-auto mb-6">
{`. 
├── app/
│   ├── api/             → Backend API routes
│   ├── globals.css      → Global styles
│   ├── layout.tsx       → Root layout
│   └── page.tsx         → Main landing page
├── prisma/
│   └── schema.prisma    → Database schema
├── public/              → Static assets (icons, images)
├── package.json         → Project dependencies and scripts
├── tsconfig.json        → TypeScript configuration
├── postcss.config.mjs   → Tailwind/PostCSS settings
├── eslint.config.mjs    → Linting rules
├── next.config.ts       → Next.js configuration
└── README.md            → Project documentation`}
        </pre>

        <p className="text-gray-400 text-sm leading-relaxed">
          The <code>app/</code> folder manages routes and rendering.  
          <code>prisma/</code> defines database structure.  
          <code>public/</code> holds static assets.  
          Core config files ensure consistent development setup.
        </p>
      </section>

      {/* --- Prisma & CLI Setup --- */}
      <section className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-10 mb-12 border border-blue-400/20">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-300">
          Prisma & CLI Setup
        </h2>

        <p className="text-gray-200 text-sm leading-relaxed mb-6">
          When generating a new app via CLI, Prisma setup can be partly automated. Below outlines what’s handled automatically and what requires manual input.
        </p>

        <div className="bg-white/5 rounded-lg p-5 mb-4">
          <h3 className="text-xl text-blue-300 font-semibold mb-2">
            Automatically Done by CLI:
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Create a Next.js app (<code>npx create-next-app</code>)</li>
            <li>Install Prisma and client libraries</li>
            <li>Run <code>npx prisma init</code> (creates <code>schema.prisma</code> & <code>.env</code>)</li>
            <li>Add a base <code>User</code> model in schema</li>
          </ul>
        </div>

        <div className="bg-white/5 rounded-lg p-5 mb-4">
          <h3 className="text-xl text-yellow-300 font-semibold mb-2">
            Manual Steps Required:
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Set a valid <code>DATABASE_URL</code> inside <code>.env</code></li>
            <li>Run <code>npx prisma generate</code></li>
            <li>Run <code>npx prisma migrate dev --name init</code></li>
          </ul>
        </div>

        <div className="bg-white/5 rounded-lg p-5">
          <h3 className="text-xl text-green-300 font-semibold mb-2">
            Example CLI Output:
          </h3>
          <pre className="bg-black/30 text-gray-200 text-xs rounded-lg p-4 mt-2">
{`Project created successfully.

Next steps:
  1. Update .env with a valid DATABASE_URL
  2. Run:
     npx prisma generate
     npx prisma migrate dev --name init
  3. Start your app:
     npm run dev`}
          </pre>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="text-center text-gray-400 text-sm mt-auto border-t border-white/10 pt-6">
        <p>
          Well-Ready <span className="text-blue-400">Next</span> Stack
        </p>
        <p className="mt-1">
          Built by{" "}
          <span className="text-white font-semibold">Divyanshu Chandra</span> ·{" "}
          <a
            href="https://www.linkedin.com/in/divyanshu-chandra-66074926b/"
            className="text-blue-300 hover:text-blue-400"
            target="_blank"
          >
            LinkedIn
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/DivyanshuVortex"
            className="text-blue-300 hover:text-blue-400"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Page;
