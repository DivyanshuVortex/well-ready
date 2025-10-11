import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="app">

      {/* Title */}
      <h1 className="title">Well-Ready <span className="specials">MERN</span> Basic App</h1>

      {/* MERN Explanation */}
      <section className="mern-info">
        <h2>What is <span className="specials">MERN</span> Stack?</h2>
        <div className="mern-cards">
          <div className="mern-card mongo">
            <h3><span className="specials">MongoDB</span></h3>
            <p>Database to store data in JSON-like format.</p>
          </div>
          <div className="mern-card express">
            <h3><span className="specials">Express</span></h3>
            <p>Node.js framework to create backend APIs.</p>
          </div>
          <div className="mern-card react">
            <h3><span className="specials">React</span></h3>
            <p>Frontend library to build interactive UI.</p>
          </div>
          <div className="mern-card node">
            <h3><span className="specials">Node.js</span></h3>
            <p>JavaScript runtime for backend logic.</p>
          </div>
        </div>
        <p className="flow">
          Flow: <code><span className="specials">React</span> (UI) → <span className="specials">Express</span>/<span className="specials">Node</span> (API) → <span className="specials">MongoDB</span> (Database)</code>
        </p>
      </section>
      {/* Data Display */}
      <section className="data-section">
        <h2>Data from Backend:</h2>
        {data ? (
          <pre className="data-display">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </section>
      {/* Footer */}
      <footer className="footer">
        <p>Well-Ready - <span className="specials">MERN</span> Stack</p>
        <p>
          Made by Divyanshu Chandra |{" "}
          <a href="https://www.linkedin.com/in/divyanshu-chandra-66074926b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>{" "}
          ||{" "}
          <a href="https://github.com/DivyanshuVortex" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
