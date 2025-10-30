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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 text-white px-4 py-10">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-center">
        Well-Ready <span className="text-blue-400">Next</span> Basic App
      </h1>

      {/* Next.js Explanation Section */}
      <section className="max-w-5xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          How <span className="text-blue-400">Next.js</span> Works 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "1️⃣ App Directory",
              color: "text-blue-300",
              desc: "The 'app/' folder is where pages, routes, layouts, and API endpoints live. Each folder inside can represent a route.",
            },
            {
              title: "2️⃣ Server & Client Components",
              color: "text-cyan-300",
              desc: "By default, components run on the server. Add 'use client' to make them interactive (using hooks like useState or useEffect).",
            },
            {
              title: "3️⃣ API Routes (Backend)",
              color: "text-green-300",
              desc: "You can create backend routes right inside 'app/api/'. Each file like 'route.js' acts as a serverless function.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-white/10 rounded-xl text-center border border-white/10 hover:bg-white/20 transition duration-300"
            >
              <h3 className={`text-2xl font-semibold mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white/5 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold text-blue-300 mb-3">
            🔁 Data Flow in Next.js
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            <code className="bg-white/10 px-3 py-1 rounded-md">
              Client Component → API Route → Server → Response → Rendered UI
            </code>
          </p>
          <p className="mt-3 text-gray-400 text-xs">
            (No need for a separate Express backend — Next.js handles both
            frontend and backend seamlessly.)
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg p-5 text-center">
            <h4 className="text-xl text-yellow-300 font-semibold mb-2">
              🌍 Server-Side Rendering (SSR)
            </h4>
            <p className="text-gray-300 text-sm">
              Pages are rendered on the server for faster initial load and
              better SEO.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-5 text-center">
            <h4 className="text-xl text-pink-300 font-semibold mb-2">
              ⚡ Client Components
            </h4>
            <p className="text-gray-300 text-sm">
              Add interactivity with React hooks, event handlers, and dynamic UI
              updates.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-auto">
        <p>
          Well-Ready — <span className="text-blue-400">Next</span> Stack
        </p>
        <p>
          Made by{" "}
          <span className="text-white font-semibold">Divyanshu Chandra</span> |{" "}
          <a
            href="https://www.linkedin.com/in/divyanshu-chandra-66074926b/"
            className="text-blue-300 hover:text-blue-400"
            target="_blank"
          >
            LinkedIn
          </a>{" "}
          ||{" "}
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
