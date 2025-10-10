import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend (BE)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/data"); // 👈 your BE endpoint
        const resData = await res.json();
        setData(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center text-white p-4">
      <h1 className="text-4xl font-bold text-amber-400 mb-6">
        MERN with TS and TailwindCSS
      </h1>

      {loading ? (
        <p className="text-blue-300 text-xl animate-pulse">Loading...</p>
      ) : (
        <pre className="bg-gray-800 p-4 rounded-lg text-green-400 text-left w-full max-w-md overflow-x-auto">
          { data ? JSON.stringify(data, null, 2) : "No data available" }
        </pre>
      )}
    </div>
  );
};

export default App;
